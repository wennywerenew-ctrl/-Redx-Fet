import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';

let dirname = '.';
try {
  const filename = fileURLToPath(import.meta.url);
  dirname = path.dirname(filename);
} catch (e) {
  dirname = __dirname;
}

const app = express();
app.use(express.json({ limit: '10mb' }));

// Lazy Gemini client to avoid crashing when key is missing on start
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in backend environment. Please configure it in Settings > Secrets in the Google AI Studio UI.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ZIP EXPORT BACKEND API
app.post('/api/export/zip', (req, res) => {
  const { projectName } = req.body;
  return res.json({
    success: true,
    message: `Ready for download! Simulated custom package zip generated successfully inside preview browser.`,
    fileName: `${projectName.toLowerCase().replace(/\s+/g, '-')}-workspace.zip`
  });
});

// CORE INTERACTION ENDPOINT FOR MAIN VIBE PIPELINE
app.post('/api/generate', async (req, res) => {
  const { prompt, currentFiles, techStack } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: "Please enter a coding prompt." });
  }

  // Gracefully handle missing API key to allow the offline simulation sandbox mode without terminal error spikes
  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      success: false,
      error: "GEMINI_API_KEY is missing in backend environment. Please configure it in Settings > Secrets in the Google AI Studio UI.",
      needsApiKey: true
    });
  }

  try {
    const ai = getGeminiClient();

    const systemPrompt = `You are "NextCome AI", their premium, elite AI-powered vibe coding platform.
Analyze the user's software description prompt and synthesize a fully operational set of files.
The output MUST strictly match this structured JSON schema:

{
  "appName": "Name of the generated application",
  "description": "Short explanation of the solution",
  "designVibe": "Summary of visual styling choices under the Bold Typography theme",
  "techChoices": {
    "frontend": "Frontend engine stack used",
    "backend": "Backend layout used",
    "database": "Prisma relationship scheme status",
    "auth": "Authentication middleware utilized"
  },
  "keyFeatures": ["Key highlight feature 1", "Key highlight feature 2"],
  "filesToUpdate": ["App.tsx", "src/components/MetricCard.tsx", "prisma/schema.prisma"],
  "files": {
    "App.tsx": "Full, beautifully executable React component using lucide-react, responsive grids, and stunning details.",
    "src/components/MyCustomWidget.tsx": "Optional helper component or subfile code"
  },
  "explanation": "A concise explanation of the design patterns, code structure, and compilation parameters."
}

CRITICAL RULES:
1. Always construct a gorgeous, responsive, completely functional client-side mockup in the "App.tsx" file. Inside App.tsx, write complete code with state fields, interactive sliders/switches or mockup charts so they can play around with it!
2. Do not include any text before or after the JSON. Return standard pure JSON format.
3. The design theme to apply is "Bold Typography" with pure charcoal black background (#050505), crisp borders (border-white/5), beautiful glass containers, and gorgeous modern display fonts (italicized accents, strong headlines). Use standard Tailwind CSS classes.
4. Keep helper components simple or defined in the same files so imports never fail.`;

    const userMsg = `User request: ${prompt}
Current simulated project files:
${JSON.stringify(currentFiles || {}, null, 2)}
Desired tech choices: ${JSON.stringify(techStack || {}, null, 2)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userMsg,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["appName", "description", "designVibe", "techChoices", "keyFeatures", "filesToUpdate", "files", "explanation"],
          properties: {
            appName: { type: Type.STRING },
            description: { type: Type.STRING },
            designVibe: { type: Type.STRING },
            techChoices: {
              type: Type.OBJECT,
              required: ["frontend", "backend", "database", "auth"],
              properties: {
                frontend: { type: Type.STRING },
                backend: { type: Type.STRING },
                database: { type: Type.STRING },
                auth: { type: Type.STRING },
              }
            },
            keyFeatures: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            filesToUpdate: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            files: {
              type: Type.OBJECT,
              description: "Mapping of simulated files. E.g. {'App.tsx': 'import React ...'}"
            },
            explanation: {
              type: Type.STRING,
              description: "Explanation of prompt extraction and intent compilation step logs"
            }
          }
        }
      }
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);
    return res.json({ success: true, data: parsedData });
  } catch (err: any) {
    console.error("Pipeline failure:", err);
    return res.status(500).json({ 
      success: false, 
      error: err.message || "An unexpected issue occurred inside the AI orchestration system.",
      needsApiKey: !process.env.GEMINI_API_KEY
    });
  }
});

const isProd = process.env.NODE_ENV === 'production' || fs.existsSync(path.resolve(dirname, 'dist'));
const PORT = 3000;

if (!isProd) {
  import('vite').then((viteModule) => {
    viteModule.createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    }).then((viteServer) => {
      app.use(viteServer.middlewares);
      
      app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
          let template = fs.readFileSync(path.resolve(dirname, 'index.html'), 'utf-8');
          template = await viteServer.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } catch (e) {
          viteServer.ssrFixStacktrace(e as Error);
          next(e);
        }
      });

      app.listen(PORT, '0.0.0.0', () => {
        console.log(`[NextCome Server] DEV server running on http://127.0.0.1:${PORT}`);
      });
    });
  }).catch((err) => {
    console.log("[NextCome Server] Failed to load Vite dynamically, falling back to static serve.", err);
    // fallback
    app.use(express.static(path.resolve(dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(dirname, 'dist', 'index.html'));
    });
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[NextCome Server] Fallback server running on PORT ${PORT}`);
    });
  });
} else {
  app.use(express.static(path.resolve(dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, 'dist', 'index.html'));
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NextCome Server] PRODUCTION server running on http://127.0.0.1:${PORT}`);
  });
}
