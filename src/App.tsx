/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  ArrowRight, 
  Check, 
  Layers, 
  Plus, 
  Play, 
  FileCode, 
  Database, 
  Share2, 
  Download, 
  Copy, 
  Trash2, 
  Folder, 
  FolderPlus, 
  Smartphone, 
  Tablet as TabletIcon, 
  Monitor, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Clock, 
  Shield, 
  AlertCircle, 
  TrendingUp, 
  ChevronRight, 
  Heart, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Pocket, 
  Sliders, 
  Info,
  Edit2,
  FileText,
  HelpCircle,
  ExternalLink,
  Code
} from 'lucide-react';
import { initialProjects } from './templates';
import { Project, ChatMessage } from './types';

export default function App() {
  // Application State
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('nextcome_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });
  
  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    return projects[0]?.id || "finvibe-analytics";
  });
  
  const [selectedHeaderTab, setSelectedHeaderTab] = useState<'editor' | 'database' | 'deploy' | 'analytics'>('editor');
  const [activeFilePath, setActiveFilePath] = useState<string>('App.tsx');
  const [editorView, setEditorView] = useState<'preview' | 'code'>('preview');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [userPrompt, setUserPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Custom file creation states
  const [newFileName, setNewFileName] = useState('');
  const [showAddFileDialog, setShowAddFileDialog] = useState(false);
  
  // Project creation/rename states
  const [newProjectName, setNewProjectName] = useState('');
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  
  // Interactive Live Render values for project execution simulation
  const [finvibeBalance, setFinvibeBalance] = useState(142384.50);
  const [finvibeTimeline, setFinvibeTimeline] = useState<'overview' | 'assets' | 'transactions'>('overview');
  const [finvibeDepositAmount, setFinvibeDepositAmount] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(false);
  
  const [auraSubscribed, setAuraSubscribed] = useState(false);
  const [auraEmail, setAuraEmail] = useState('');
  const [auraBillingPeriod, setAuraBillingPeriod] = useState<'monthly' | 'annually'>('annually');

  // Terminal Logs State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SYSTEM INIT // COGNITIVE CORE STABLE',
    'NEXTCOME COMPILER WORKSPACE LOADED SUCCESFULLY.',
    'Port: 3000 Active. Standard Sandbox Enclave Virtual Routing Enabled.'
  ]);

  // Save projects to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem('nextcome_projects', JSON.stringify(projects));
  }, [projects]);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  // If active file path is not in the project files list, fallback to something that is
  useEffect(() => {
    if (activeProject && !activeProject.files[activeFilePath]) {
      const paths = Object.keys(activeProject.files);
      if (paths.length > 0) {
        setActiveFilePath(paths[0]);
      }
    }
  }, [activeProjectId, activeProject]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const addTerminalLog = (log: string) => {
    setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`].slice(-30));
  };

  // 7-Step AI Orchestration sequence definitions
  const pipelineSteps = [
    { label: 'Prompt Analyzer', desc: 'Decoding semantic nouns, context guidelines & tech stack dependencies.' },
    { label: 'Intent Extractor', desc: 'Extracting modular views, DB visual schema design, and controllers.' },
    { label: 'UI Planning Agent', desc: 'Validating optimal Tailwind CSS theme weights and visual metrics.' },
    { label: 'Backend Planning Agent', desc: 'Structuring REST API controllers and security middleware rules.' },
    { label: 'Code Generator', desc: 'Drafting high-contrast fully executable micro-bundle in Sandbox.' },
    { label: 'Formatter', desc: 'Executing syntax-perfect alignment & imports integrity checks.' },
    { label: 'Preview Renderer', desc: 'Publishing real-time workspace client view for instant live run.' }
  ];

  // Pipeline execution orchestration
  const handleVibeGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    setGenerationStep(0);
    setEditorView('preview');
    addTerminalLog(`USER INTENT RECEIVED: "${userPrompt}"`);
    addTerminalLog(`Initiating multi-agent orchestration pipeline...`);

    // Simulate stepping through the system logs to illustrate the real-time AI orchestration
    const timer = setInterval(() => {
      setGenerationStep(prev => {
        if (prev < pipelineSteps.length - 1) {
          const next = prev + 1;
          addTerminalLog(`[AGENT STAGE ${next}] Completed: ${pipelineSteps[prev].label}`);
          return next;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1200);

    try {
      // Connect to the actual local backend to ask Gemini for a tailored code generation
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          currentFiles: activeProject?.files || {},
          techStack: activeProject?.techStack || {}
        })
      });

      const resJson = await response.json();
      
      // Cleanup timer
      clearInterval(timer);
      
      if (resJson.success && resJson.data) {
        const generated = resJson.data;
        
        // Add simulated API-generated file content to the active project
        const updatedFiles = { ...activeProject.files, ...generated.files };
        
        // Update state
        setProjects(prev => prev.map(p => {
          if (p.id === activeProjectId) {
            return {
              ...p,
              name: generated.appName || p.name,
              description: generated.description || p.description,
              updatedAt: new Date().toISOString(),
              files: updatedFiles,
              techStack: {
                frontend: generated.techChoices?.frontend || p.techStack.frontend,
                backend: generated.techChoices?.backend || p.techStack.backend,
                database: generated.techChoices?.database || p.techStack.database,
                auth: generated.techChoices?.auth || p.techStack.auth,
              },
              chatHistory: [
                ...p.chatHistory,
                { id: Date.now().toString(), role: 'user', content: userPrompt, timestamp: new Date().toLocaleTimeString() },
                { id: (Date.now() + 1).toString(), role: 'assistant', content: generated.explanation || `Successfully generated files incorporating: ${generated.appName}`, timestamp: new Date().toLocaleTimeString() }
              ]
            };
          }
          return p;
        }));

        setGenerationStep(6);
        addTerminalLog(`GEN STACK COMPLETED SUCCESSFULLY. Simulated environment synced.`);
        triggerNotification(`Enriched "${generated.appName}" with real architectural code!`);
      } else {
        // Fallback simulation if GEMINI_API_KEY is not configured OR standard query is bypassed
        setTimeout(() => {
          setGenerationStep(6);
          
          let fallbackFiles = { ...activeProject.files };
          let fallbackName = activeProject.name;
          let fallbackDescription = activeProject.description;
          let matchedExplanation = "";

          // Simple local parser to give highly customizable client feedback!
          const inputNorm = userPrompt.toLowerCase();
          if (inputNorm.includes('fintech') || inputNorm.includes('wallet') || inputNorm.includes('crypto') || inputNorm.includes('vault')) {
            fallbackName = "Apex Capital Ledger";
            fallbackDescription = "Customized professional multi-chain secure asset matrix dashboard built via natural guidelines.";
            fallbackFiles["App.tsx"] = activeProject.files["App.tsx"] || "";
            matchedExplanation = "I have successfully analyzed the asset requirements. Scaffolded real-time Ledger index cards and customized visual yields.";
          } else if (inputNorm.includes('portfolio') || inputNorm.includes('creators') || inputNorm.includes('studio')) {
            fallbackName = "Omnis Creative Lab";
            fallbackDescription = "Premium high-contrast grid workspace optimized for vector artists and immersive designers.";
            matchedExplanation = "Configured dark-mode graphic displays, custom typography tracks, and responsive sidebar tabs.";
          } else {
            fallbackName = `${activeProject.name}+ Optimized`;
            fallbackDescription = `Enhanced edition with customized layout properties: ${userPrompt.substring(0, 80)}`;
            matchedExplanation = `Applied advanced responsive margins, clean flex modules, and generated proper structure for: "${userPrompt}"`;
          }

          // Let's modify the current App.tsx slightly by injecting customizable user parameters to make it feel extremely alive
          if (fallbackFiles["App.tsx"]) {
            fallbackFiles["App.tsx"] = fallbackFiles["App.tsx"].replace(
              `WORKSPACE_ID // ACC_9942`,
              `WORKSPACE_ID // ${userPrompt.toUpperCase().slice(0, 12)}_SYNC`
            );
          }

          setProjects(prev => prev.map(p => {
            if (p.id === activeProjectId) {
              return {
                ...p,
                name: fallbackName,
                description: fallbackDescription,
                updatedAt: new Date().toISOString(),
                files: fallbackFiles,
                chatHistory: [
                  ...p.chatHistory,
                  { id: Date.now().toString(), role: 'user', content: userPrompt, timestamp: new Date().toLocaleTimeString() },
                  { id: (Date.now()+1).toString(), role: 'assistant', content: `${matchedExplanation}\n\n*Note: To unlock live full-stack synthesis with real API outputs, make sure to add a valid GEMINI_API_KEY inside the Secrets panel.*`, timestamp: new Date().toLocaleTimeString() }
                ]
              };
            }
            return p;
          }));

          addTerminalLog(`GENERATION COMPLETE. Mock preview container successfully constructed.`);
          triggerNotification(`Synthesized code edits based on natural prompt query`);
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      addTerminalLog(`ERROR: Generation failure - ${err.message}`);
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setUserPrompt('');
      }, 3000);
    }
  };

  // Create customized user files
  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    
    // Ensure accurate file ending
    let path = newFileName.trim();
    if (!path.includes('.')) {
      path += '.tsx';
    }

    if (activeProject.files[path]) {
      triggerNotification(`File path '${path}' already exists!`);
      return;
    }

    setProjects(prev => prev.map(p => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          updatedAt: new Date().toISOString(),
          files: {
            ...p.files,
            [path]: `// ${path} - Dynamic component element\nimport React from 'react';\n\nexport default function CustomElement() {\n  return (\n    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-xs">\n      <span>Generated element from workspace: ${path}</span>\n    </div>\n  );\n}`
          }
        };
      }
      return p;
    }));

    setActiveFilePath(path);
    setShowAddFileDialog(false);
    setNewFileName('');
    addTerminalLog(`Created new file path: ${path}`);
    triggerNotification(`Created ${path}`);
  };

  // Delete files in codebase
  const handleDeleteFile = (pathToDelete: string) => {
    if (Object.keys(activeProject.files).length <= 1) {
      triggerNotification("Cannot delete the last remaining workspace file.");
      return;
    }

    const updatedFiles = { ...activeProject.files };
    delete updatedFiles[pathToDelete];

    setProjects(prev => prev.map(p => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          updatedAt: new Date().toISOString(),
          files: updatedFiles
        };
      }
      return p;
    }));

    if (activeFilePath === pathToDelete) {
      setActiveFilePath(Object.keys(updatedFiles)[0]);
    }
    addTerminalLog(`Deleted file path: ${pathToDelete}`);
    triggerNotification(`Deleted ${pathToDelete}`);
  };

  // Project management actions
  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newId = newProjectName.toLowerCase().replace(/\s+/g, '-');
    
    const newProj: Project = {
      id: newId,
      name: newProjectName.trim(),
      description: "Custom sandboxed application workspace created via local code generator templates.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      techStack: {
        frontend: "React 19, Tailwind CSS",
        backend: "Node.js Express",
        database: "PostgreSQL Prisma",
        auth: "Mock Authenticator"
      },
      files: {
        "App.tsx": `// App.tsx entrypoint for ${newProjectName}\nimport React from "react";\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-[#06060c] text-slate-100 p-8 flex flex-col justify-center items-center text-center">\n      <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2">${newProjectName}</h1>\n      <p className="text-slate-400 max-w-md text-xs leading-relaxed mb-6">Fully integrated NextCome workspace template complete. Customize via natural prompts.</p>\n      <button className="bg-white text-black font-semibold text-xs px-6 py-2 rounded-full hover:scale-105 transition">Explore Assets</button>\n    </div>\n  );\n}`
      },
      chatHistory: [
        { id: "1", role: 'assistant', content: `Created clean custom workspace initialized with default project code ${newProjectName}.`, timestamp: new Date().toLocaleTimeString() }
      ]
    };

    setProjects(prev => [...prev, newProj]);
    setActiveProjectId(newId);
    setActiveFilePath("App.tsx");
    setShowNewProjectDialog(false);
    setNewProjectName('');
    addTerminalLog(`Created new project workspace: ${newProjectName}`);
    triggerNotification(`Active Project set to ${newProjectName}`);
  };

  const handleDeleteProject = (id: string, name: string) => {
    if (projects.length <= 1) {
      triggerNotification("Cannot delete the final remaining active workspace.");
      return;
    }
    const filtered = projects.filter(p => p.id !== id);
    setProjects(filtered);
    setActiveProjectId(filtered[0].id);
    addTerminalLog(`Deleted project workspace '${name}'`);
    triggerNotification(`Successfully deleted ${name}`);
  };

  // ZIP / Raw Source Code Exports Support
  const handleZipExport = async () => {
    try {
      const response = await fetch('/api/export/zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: activeProject.name,
          files: activeProject.files
        })
      });
      const data = await response.json();
      if (data.success) {
        addTerminalLog(`EXPORTED SOURCE CODE: Simulated ZIP prepared named ${data.fileName}`);
        triggerNotification(`Source ZIP generated successfully! Download simulated.`);
      }
    } catch (e) {
      triggerNotification("Failed to contact backend API. Simulating download inside local sandbox...");
    }
  };

  // Copy current active file code to clipboard
  const [hasCopied, setHasCopied] = useState(false);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeProject.files[activeFilePath] || "");
    setHasCopied(true);
    addTerminalLog(`Copied active code of ${activeFilePath} to clipboard`);
    setTimeout(() => setHasCopied(false), 2000);
  };

  // Direct edit changes to current active file code via textarea
  const handleFileContentChange = (newVal: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === activeProjectId) {
        return {
          ...p,
          updatedAt: new Date().toISOString(),
          files: {
            ...p.files,
            [activeFilePath]: newVal
          }
        };
      }
      return p;
    }));
  };

  // Core interactive workspace actions for FinVibe Analytics Demo
  const handleFinvibeDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(finvibeDepositAmount);
    if (!isNaN(parsed) && parsed > 0) {
      setFinvibeBalance(prev => prev + parsed);
      setFinvibeDepositAmount('');
      setShowDepositModal(false);
      addTerminalLog(`[FinVibe Oracle] DB Transaction Committed: Deposited $${parsed.toLocaleString()} USDC.`);
      triggerNotification(`Successfully deposited $${parsed.toLocaleString()}`);
    }
  };

  // Core waitlist form actions for Aura Creative Demo
  const handleAuraSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (auraEmail.trim()) {
      setAuraSubscribed(true);
      addTerminalLog(`[Aura Service] Subscribed email "${auraEmail}" onto waitlist.`);
      triggerNotification(`Waitlist saved to cognitive database!`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#EDEDED] font-sans flex flex-col overflow-x-hidden selection:bg-white selection:text-black">
      {/* Absolute top glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full"></div>
      </div>

      {/* Floating alert/notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-[99] flex items-center gap-3 bg-white text-black font-semibold text-xs px-5 py-3 rounded-2xl shadow-2xl transition duration-500 transform translate-y-0 select-none animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-black shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER: Dynamic, bold sticky menu */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg shadow-white/5 shrink-0">
            <div className="w-4 h-4 bg-black rounded-sm transform rotate-45"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tighter text-xl">NextCome</span>
              <span className="text-[10px] bg-white/10 text-white font-mono px-1.5 py-0.2 rounded-full uppercase">SaaS</span>
            </div>
            <p className="hidden xs:block text-[9px] text-white/40 tracking-widest font-mono uppercase">VIBE_SYSTEM.v1.0</p>
          </div>
        </div>

        {/* Floating Capsule Switch Links: Editor/Database/Deploy/Analytics */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <div className="bg-white/5 border border-white/10 rounded-full p-1 flex items-center gap-1">
            {[
              { id: 'editor', label: 'Workspace Editor', icon: FileCode },
              { id: 'database', label: 'Prisma DB Schemas', icon: Database },
              { id: 'deploy', label: 'Cloud Container Deploy', icon: Zap },
              { id: 'analytics', label: 'Platform Metrics', icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon;
              const active = selectedHeaderTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedHeaderTab(tab.id as any)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 transition ${
                    active ? 'bg-white text-black font-semibold shadow' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side Info Stack */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold font-mono">WORKSPACE REGION</p>
            <p className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5 justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              EU-WEST-RUN
            </p>
          </div>
          <div className="h-10 w-10 rounded-full border border-white/15 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-400 p-[1.5px] shadow-lg">
            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center font-bold text-[10px] text-indigo-300">
              AI
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER WORKSPACE */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        
        {/* VIEW 1: PRESET/ACTIVE WORKSPACE EDITOR (Standard Core view) */}
        {selectedHeaderTab === 'editor' && (
          <>
            {/* LEFT COLUMN: Sidebar with prompt layout, big bold typography header */}
            <aside className="w-full md:w-[380px] border-r border-white/5 bg-[#080808] flex flex-col p-6 space-y-6 shrink-0 z-10">
              
              {/* Massive Impact Typography Header */}
              <div className="pb-3 border-b border-white/5">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white my-1">
                  Vibe<br/>
                  <span className="text-white/30 italic font-serif font-extrabold">Coding.</span>
                </h1>
                <p className="text-white/40 text-[11px] leading-relaxed mt-3 uppercase tracking-wider font-mono">
                  Natural language is the compiler. Say it, run it instantly.
                </p>
              </div>

              {/* Saved projects picker & configuration */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest font-mono">Active Projects</span>
                  <button 
                    onClick={() => setShowNewProjectDialog(true)}
                    className="p-1 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition flex items-center gap-1 text-[10px] font-sans uppercase font-bold"
                  >
                    <Plus className="h-3 w-3" /> New
                  </button>
                </div>

                <div className="space-y-1">
                  {projects.map(proj => {
                    const active = proj.id === activeProjectId;
                    return (
                      <div key={proj.id} className="flex items-center justify-between group">
                        <button
                          onClick={() => {
                            setActiveProjectId(proj.id);
                            const fps = Object.keys(proj.files);
                            if (fps.length > 0) setActiveFilePath(fps[0]);
                          }}
                          className={`flex-1 text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                            active 
                              ? 'bg-white text-black font-extrabold shadow' 
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <FileCode className={`h-3.5 w-3.5 ${active ? 'text-black' : 'text-white/40'}`} />
                          <span className="truncate">{proj.name}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.name)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 text-white/40 hover:text-red-400 rounded-lg transition shrink-0 ml-1"
                          title="Delete Project"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Assistant Chat Context Node with step-progress visualizer */}
              <div className="space-y-4 flex-1">
                {isGenerating ? (
                  <div className="bg-white/[0.03] border border-white/15 rounded-2xl p-4 space-y-4 animate-pulse">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <LoaderIcon className="h-3.5 w-3.5 text-indigo-400 rotate-animation" />
                        <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">AI Pipeline Active</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/40">{generationStep + 1}/7</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-white block mt-1">
                        Running: {pipelineSteps[generationStep].label}
                      </span>
                      <p className="text-[11px] text-white/60 leading-normal">
                        {pipelineSteps[generationStep].desc}
                      </p>
                    </div>

                    {/* Step Bar Pipeline Visualizer */}
                    <div className="flex items-center gap-1 bg-black/40 p-2 rounded-xl border border-white/5">
                      {pipelineSteps.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            idx <= generationStep 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-xl pointer-events-none rounded-full"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-mono font-bold text-white/30 tracking-widest">Active Assistant</span>
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                    </div>
                    <div className="max-h-[160px] overflow-y-auto text-xs text-white/80 space-y-2 leading-relaxed pr-1">
                      <p>
                        Selected <span className="font-mono text-white font-semibold">/App.tsx</span>. State controls mapped to interactive UI rendering on screen.
                      </p>
                      {activeProject.chatHistory.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/5 flex flex-col gap-1.5">
                          <span className="text-[9px] text-white/30 uppercase font-mono">Last Prompt Impact:</span>
                          <p className="text-[11px] text-white/60 italic">
                            "{activeProject.chatHistory[activeProject.chatHistory.length - 1].content}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Simulated Conversation Memory Box */}
                {!isGenerating && (
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                    <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1 font-mono">WORKSPACE TECH STACK</p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] mt-2">
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="text-white/40 block font-mono">CLIENT</span>
                        <span className="text-white font-medium truncate">{activeProject.techStack.frontend}</span>
                      </div>
                      <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                        <span className="text-white/40 block font-mono">SERVER API</span>
                        <span className="text-white font-medium truncate">{activeProject.techStack.backend}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* INPUT FORM: describe layouts and trigger generation */}
              <div className="pt-2">
                <form onSubmit={handleVibeGenerate} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-25 transition"></div>
                  <div className="relative">
                    <textarea 
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="Build custom SaaS analytics, glassmorphic sidebar, checkout widget..."
                      disabled={isGenerating}
                      rows={2}
                      className="w-full bg-[#111] border border-white/10 rounded-2xl pl-4 pr-12 py-3.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition resize-none font-sans"
                    />
                    <button 
                      type="submit"
                      disabled={isGenerating || !userPrompt.trim()}
                      className={`absolute right-3 bottom-4 w-7 h-7 rounded-xl flex items-center justify-center transition ${
                        userPrompt.trim() && !isGenerating
                          ? 'bg-white text-black hover:scale-105'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              </div>
            </aside>

            {/* RIGHT COLUMN: Code View and Live Interactive Sandbox Emulator */}
            <section className="flex-1 bg-[#050505] relative flex flex-col min-w-0 z-0">
              
              {/* TOP SANDBOX COMPILER STATUS BAR */}
              <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-[#090909]">
                <div className="flex items-center gap-4 min-w-0">
                  {/* Browser circles */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                  </div>
                  <div className="h-5 w-[1px] bg-white/10 shrink-0"></div>
                  <span className="text-[11px] font-mono text-white/40 truncate select-none">
                    nextcome-cloud/{activeProject.id}/src/{activeFilePath}
                  </span>
                </div>

                {/* Toggles for Code vs Interactive Preview */}
                <div className="flex items-center gap-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-0.5 flex">
                    <button 
                      onClick={() => setEditorView('preview')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight transition ${
                        editorView === 'preview' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      Live preview
                    </button>
                    <button 
                      onClick={() => setEditorView('code')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight transition ${
                        editorView === 'code' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      Source Code
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTION TOOLBAR: File explorers & size controls */}
              <div className="border-b border-white/5 bg-[#070707] px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mr-1">Workspace Assets:</span>
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                    {Object.keys(activeProject.files).map(path => {
                      const active = activeFilePath === path;
                      return (
                        <div key={path} className="flex items-center shrink-0">
                          <button
                            onClick={() => setActiveFilePath(path)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition flex items-center gap-1 border ${
                              active
                                ? 'bg-white/5 border-white/15 text-white'
                                : 'bg-transparent border-transparent text-white/40 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <FileCode className="h-3 w-3" />
                            <span>{path}</span>
                          </button>
                          {active && (
                            <button 
                              onClick={() => handleDeleteFile(path)}
                              className="text-white/20 hover:text-red-400 p-0.5 ml-0.5 transition"
                              title="Delete File"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <button 
                      onClick={() => setShowAddFileDialog(true)}
                      className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-white/60 hover:text-white select-none transition"
                    >
                      + File
                    </button>
                  </div>
                </div>

                {/* Device dimension simulator toggles (active when looking at preview) */}
                {editorView === 'preview' && (
                  <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/15">
                    {[
                      { id: 'desktop', icon: Monitor, label: 'Desktop (100%)' },
                      { id: 'tablet', icon: TabletIcon, label: 'Tablet (768px)' },
                      { id: 'mobile', icon: Smartphone, label: 'Mobile (425px)' }
                    ].map(device => {
                      const Icon = device.icon;
                      return (
                        <button
                          key={device.id}
                          onClick={() => setPreviewDevice(device.id as any)}
                          title={device.label}
                          className={`p-1 rounded transition ${
                            previewDevice === device.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* File export actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition text-[10px] font-semibold flex items-center gap-1"
                    title="Copy Active File Code"
                  >
                    {hasCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={handleZipExport}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-indigo-400 hover:text-indigo-300 rounded-lg transition text-[10px] font-semibold flex items-center gap-1"
                    title="Export ZIP project package"
                  >
                    <Download className="h-3 w-3" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* CORE EDITOR AND PLAYGROUND AREA */}
              <div className="flex-1 min-h-0 bg-[#050505] p-6 overflow-y-auto flex flex-col items-center justify-start bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.01),transparent)] relative">
                
                {editorView === 'code' ? (
                  /* CODE TEXTAREA EDITOR PANEL */
                  <div className="w-full h-full max-w-5xl bg-[#09090e] rounded-2xl border border-white/10 p-4 flex flex-col shadow-2xl overflow-hidden min-h-[400px]">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5 text-[10px] font-mono text-white/40 mb-3">
                      <span>EDIT MODE // SELECT INSIDE TEXTAREA AND TYPE CODE DIRECTLY</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Autosave configured
                      </span>
                    </div>
                    <textarea
                      value={activeProject.files[activeFilePath] || ""}
                      onChange={(e) => handleFileContentChange(e.target.value)}
                      className="w-full flex-1 bg-transparent text-slate-200 font-mono text-[11px] leading-relaxed focus:outline-none resize-none overflow-y-auto h-full min-h-[300px]"
                      placeholder="// Type code here..."
                      spellCheck={false}
                    />
                  </div>
                ) : (
                  /* REPLIT / Lovable INTERACTIVE PREVIEW IFRAME SIMULATION */
                  <div 
                    className={`w-full bg-[#0a0a0f] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 min-h-[460px] max-w-5xl mx-auto ${
                      previewDevice === 'mobile' ? 'max-w-[390px]' : previewDevice === 'tablet' ? 'max-w-[768px]' : 'max-w-full'
                    }`}
                  >
                    {/* Interactive Sandbox Embedded Content */}
                    <div className="flex-1 relative overflow-y-auto bg-slate-950">
                      
                      {/* CASE A: RENDER FINVIBE ANALYTICS PREVIEW */}
                      {activeProject.id === 'finvibe-analytics' && (
                        <div className="min-h-full bg-[#090a0f] text-slate-100 font-sans p-5 relative select-none">
                          
                          {/* Top floating demo header */}
                          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-indigo-500 p-0.5 flex items-center justify-center">
                                <Sparkles className="h-3.5 w-3.5 text-white" />
                              </div>
                              <div>
                                <h1 className="text-xs font-bold leading-none">FinVibe Luxury</h1>
                                <span className="text-[8px] font-mono text-slate-400">WORKSPACE // ACC_9942</span>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => setShowDepositModal(true)}
                              className="bg-violet-600 hover:bg-violet-700 transition px-3 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1"
                            >
                              <Plus className="h-3 w-3" /> Deposit
                            </button>
                          </div>

                          {/* Quick statistics row */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                            <div className="bg-[#10121d]/70 border border-[#1e223c] p-3.5 rounded-xl">
                              <span className="text-[10px] font-mono text-slate-400">VALUATION EXCEL</span>
                              <div className="text-sm font-bold mt-1 text-white">${finvibeBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                              <span className="text-[9px] text-emerald-400 font-mono">+12.4% compound</span>
                            </div>

                            <div className="bg-[#10121d]/70 border border-[#1e223c] p-3.5 rounded-xl">
                              <span className="text-[10px] font-mono text-slate-400">YIELD CORE APY</span>
                              <div className="text-sm font-bold mt-1 text-slate-200">12.45% Yield</div>
                              <span className="text-[9px] text-slate-400 font-mono">Synced real-time</span>
                            </div>

                            <div className="bg-[#10121d]/70 border border-[#1e223c] p-3.5 rounded-xl">
                              <span className="text-[10px] font-mono text-slate-400">ACTIVE NODES</span>
                              <div className="text-sm font-bold mt-1 text-emerald-400 font-mono">ACTIVE (09)</div>
                              <span className="text-[9px] text-slate-500 font-mono">Isolated HSM keys</span>
                            </div>
                          </div>

                          {/* Render view tabs */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            
                            {/* Inner portfolio selector */}
                            <div className="sm:col-span-4 flex flex-col gap-2">
                              {['overview', 'assets', 'transactions'].map(v => (
                                <button
                                  key={v}
                                  onClick={() => setFinvibeTimeline(v as any)}
                                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                                    finvibeTimeline === v 
                                      ? 'bg-violet-600/25 text-violet-300 border border-violet-500/30' 
                                      : 'text-slate-400 hover:text-white bg-slate-900/40 border border-transparent'
                                  }`}
                                >
                                  {v === 'overview' ? 'Valuation Vectors' : v === 'assets' ? 'Token weights' : 'Ledger Journal'}
                                </button>
                              ))}

                              {/* Additional security advisor */}
                              <div className="bg-[#121422] border border-[#1b203a] p-3 rounded-xl mt-2 text-[10px] leading-relaxed text-slate-400">
                                <span className="font-bold text-slate-200 block mb-1">Enclave Status</span>
                                Secure cryptographic signatures syncing on standard Postgres structures.
                              </div>
                            </div>

                            {/* Inner graph/weights/transactions display */}
                            <div className="sm:col-span-8 bg-[#10121d]/70 border border-[#1e223c] p-4 rounded-xl flex flex-col justify-between">
                              {finvibeTimeline === 'overview' && (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-slate-300">Valuation Yield Line</h4>
                                    <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-1.5 py-0.2 rounded font-mono font-bold">LIVE STATE</span>
                                  </div>
                                  <div className="h-28 w-full bg-[#0a0b12] border border-[#151722] rounded-xl relative overflow-hidden flex flex-col justify-between p-3">
                                    <span className="text-[9px] text-slate-500 font-mono">$150,000</span>
                                    {/* SVG path */}
                                    <svg className="absolute inset-x-0 bottom-4 h-16 w-full text-violet-500/20 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
                                      <path d="M0,80 Q25,30 50,60 T100,20 L100,100 L0,100 Z" />
                                    </svg>
                                    <svg className="absolute inset-0 w-full h-[80px] text-violet-500 stroke-current stroke-2" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                      <path d="M0,80 Q25,30 50,60 T100,20" />
                                    </svg>
                                    <div className="flex justify-between items-center text-[8px] text-slate-500 font-mono [z-index:2]">
                                      <span>01 May</span>
                                      <span>15 May</span>
                                      <span>Today</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {finvibeTimeline === 'assets' && (
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-slate-300 mb-2">Portfolio Weights Allocation</h4>
                                  {[
                                    { name: "Liquid APY Yield", weight: "55%", color: "bg-violet-500" },
                                    { name: "USD Collateral Stable", weight: "25%", color: "bg-indigo-500" },
                                    { name: "Staked Nodes Reserve", weight: "20%", color: "bg-fuchsia-500" }
                                  ].map((itm, i) => (
                                    <div key={i} className="space-y-1">
                                      <div className="flex justify-between text-[10px]">
                                        <span className="text-slate-400">{itm.name}</span>
                                        <span className="text-white font-mono font-bold">{itm.weight}</span>
                                      </div>
                                      <div className="w-full bg-[#0a0b12] h-1.5 rounded-full overflow-hidden">
                                        <div className={`h-full ${itm.color}`} style={{ width: itm.weight }}></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {finvibeTimeline === 'transactions' && (
                                <div className="space-y-2">
                                  <h4 className="text-xs font-bold text-slate-300 mb-2">Access Ledger Book</h4>
                                  {[
                                    { desc: "Deposited USDC Capital Vault", amount: "+$15,000.00", isUp: true },
                                    { desc: "Yield Aggregation Compound", amount: "+$480.25", isUp: true },
                                    { desc: "Platform Vault Verification Fee", amount: "-$12.50", isUp: false }
                                  ].map((txn, i) => (
                                    <div key={i} className="flex justify-between items-center bg-[#07070c] p-2 rounded border border-white/5 text-[10px]">
                                      <span className="text-slate-400 truncate">{txn.desc}</span>
                                      <span className={`font-mono font-bold ${txn.isUp ? 'text-emerald-400' : 'text-slate-300'}`}>{txn.amount}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                          </div>

                          {/* Interactive Deposit Popup within preview */}
                          {showDepositModal && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 rounded-3xl z-30">
                              <form onSubmit={handleFinvibeDeposit} className="bg-[#121422] border border-white/10 p-5 rounded-2xl w-full max-w-xs space-y-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-xs font-bold">Deposit simulated USDC</h3>
                                  <button type="button" onClick={() => setShowDepositModal(false)} className="text-white/40 hover:text-white">✕</button>
                                </div>
                                <div className="space-y-1 text-left">
                                  <label className="text-[9px] text-slate-400 font-mono block">AMOUNT (USD)</label>
                                  <input 
                                    type="number"
                                    value={finvibeDepositAmount}
                                    onChange={(e) => setFinvibeDepositAmount(e.target.value)}
                                    placeholder="e.g. 2500" 
                                    required 
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                                  />
                                </div>
                                <button type="submit" className="w-full bg-violet-600 py-1.5 rounded-xl text-xs font-bold text-white hover:bg-violet-700 transition">
                                  Execute Ledger Write
                                </button>
                              </form>
                            </div>
                          )}

                        </div>
                      )}

                      {/* CASE B: RENDER AURA CREATIVE AI LANDING PREVIEW */}
                      {activeProject.id === 'aura-ai' && (
                        <div className="min-h-full bg-[#040406] text-slate-100 font-sans p-6 relative select-none text-left">
                          
                          {/* Inner glowing halo orb helper */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] pointer-events-none overflow-hidden z-0">
                            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-indigo-600/10 blur-[80px] rounded-full"></div>
                          </div>

                          <div className="relative z-10 space-y-8">
                            
                            {/* Logo Row */}
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                              <div className="flex items-center gap-1.5">
                                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center">
                                  <Cpu className="h-3.5 w-3.5 text-black" />
                                </div>
                                <span className="text-xs font-bold tracking-tight">AURA.AI</span>
                              </div>
                              <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase tracking-widest bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/40">ONLINE // v09</span>
                            </div>

                            {/* Hero presentation text */}
                            <div className="space-y-3 text-center max-w-md mx-auto">
                              <span className="inline-block bg-[#12121a] border border-[#21212f] rounded-full px-3 py-1 text-[9px] text-indigo-300 font-mono font-medium">
                                COGNITIVE CODESYNTH ENGINES READY
                              </span>
                              <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">
                                Build cohesive systems with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">Pure Intent.</span>
                              </h1>
                              <p className="text-[10px] text-slate-400 leading-relaxed">
                                Aura intercepts natural user prompts to construct standard REST nodes and reactive glassmorphic widgets.
                              </p>
                            </div>

                            {/* Plan interval selection trigger */}
                            <div className="bg-[#0b0c13] border border-white/5 p-[3px] rounded-full w-40 mx-auto flex">
                              <button 
                                onClick={() => setAuraBillingPeriod('monthly')}
                                className={`flex-1 py-1 rounded-full text-[9px] font-bold uppercase transition ${
                                  auraBillingPeriod === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                                }`}
                              >
                                Monthly
                              </button>
                              <button 
                                onClick={() => setAuraBillingPeriod('annually')}
                                className={`flex-1 py-1 rounded-full text-[9px] font-bold uppercase transition flex items-center justify-center gap-1 ${
                                  auraBillingPeriod === 'annually' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                                }`}
                              >
                                Annual <span className="text-[7px] text-emerald-400 font-mono">-20%</span>
                              </button>
                            </div>

                            {/* Standard Grid cards with interactive price estimates */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="border border-white/5 bg-white/[0.02] p-4 rounded-2xl flex flex-col justify-between">
                                <div>
                                  <h3 className="text-xs font-bold text-slate-300">Cognitive Pro</h3>
                                  <p className="text-[9px] text-slate-500 mt-1 mb-3">Optimize workspaces and secure infinite container run slots.</p>
                                  <div className="text-lg font-black text-white font-mono">${auraBillingPeriod === 'annually' ? '19.00' : '24.00'}<span className="text-[10px] font-normal text-slate-400">/mo</span></div>
                                </div>
                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold text-[9px] py-1.5 rounded-xl uppercase transition mt-4">Join waitlist</button>
                              </div>

                              <div className="border border-white/5 bg-white/[0.02] p-4 rounded-2xl flex flex-col justify-between">
                                <div>
                                  <h3 className="text-xs font-bold text-slate-300">Enterprise Core</h3>
                                  <p className="text-[9px] text-slate-500 mt-1 mb-3">Dedicated PostgreSQL nodes, custom schemas, and high-frequency runs.</p>
                                  <div className="text-lg font-black text-white font-mono">${auraBillingPeriod === 'annually' ? '89.00' : '99.00'}<span className="text-[10px] font-normal text-slate-400">/mo</span></div>
                                </div>
                                <button className="w-full bg-slate-800 hover:bg-slate-700 font-bold text-[9px] py-1.5 rounded-xl uppercase transition mt-4">Contact Sales</button>
                              </div>
                            </div>

                            {/* Simulated waitlist subscribe box */}
                            <div className="bg-[#0b0c13] border border-white/10 rounded-2xl p-4 text-center space-y-3">
                              <h4 className="text-xs font-bold text-slate-200">Aura Waiting Gate</h4>
                              
                              {auraSubscribed ? (
                                <div className="text-[10px] text-emerald-400 font-bold bg-emerald-950/45 p-2 rounded-xl border border-emerald-900/30 flex items-center justify-center gap-2">
                                  <CheckCircle2 className="h-4 w-4" /> Ready! Account verified.
                                </div>
                              ) : (
                                <form onSubmit={handleAuraSubscribe} className="flex gap-1 max-w-xs mx-auto">
                                  <input 
                                    type="email" 
                                    value={auraEmail}
                                    onChange={(e) => setAuraEmail(e.target.value)}
                                    placeholder="Enter waitlist email..." 
                                    required 
                                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                                  />
                                  <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded-xl text-xs font-bold shrink-0">Join</button>
                                </form>
                              )}
                            </div>

                          </div>
                        </div>
                      )}

                      {/* CASE C: GENERATED APP PREVIEW AND DESCRIPTION */}
                      {activeProject.id !== 'finvibe-analytics' && activeProject.id !== 'aura-ai' && (
                        <div className="min-h-full bg-[#050508] p-6 text-slate-100 font-sans text-left space-y-6 select-none">
                          <div className="flex items-center justify-between pb-3 border-b border-white/5">
                            <div className="flex items-center gap-2">
                              <Cpu className="h-4 w-4 text-indigo-400 shrink-0" />
                              <h2 className="text-xs font-extrabold tracking-tight uppercase">{activeProject.name}</h2>
                            </div>
                            <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/40">COMPILER RUNTIME OPERATIONAL</span>
                          </div>

                          <div className="space-y-3">
                            <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[9px] text-white/60 font-mono tracking-wider">
                              ACTIVE VIBE CODE EMBEDDED IN App.tsx
                            </span>
                            <div className="text-sm font-semibold text-white">Intense AI Synthesis Completed!</div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {activeProject.description}
                            </p>
                          </div>

                          {/* Quick features block representation of user custom prompt */}
                          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-3">
                            <h3 className="text-[10px] uppercase tracking-wider font-bold text-white/40">Synthesized Core Assets</h3>
                            <div className="space-y-2">
                              {Object.keys(activeProject.files).map(filePath => (
                                <div key={filePath} className="flex items-center justify-between bg-[#0b0c13] p-2.5 rounded border border-white/5 text-[11px] font-mono">
                                  <div className="flex items-center gap-2">
                                    <FileCode className="h-3.5 w-3.5 text-indigo-400" />
                                    <span className="text-indigo-200">{filePath}</span>
                                  </div>
                                  <span className="text-white/40">{activeProject.files[filePath] ? `${activeProject.files[filePath].length} bytes` : 'Empty'}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="text-[10px] text-white/40 text-center leading-normal max-w-md mx-auto">
                            To view the generated workspace interface structure, select <span className="text-white font-mono bg-white/10 px-1 rounded">Source Code</span> at the top to modify or read the complete TypeScript.
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>

              {/* TERMINAL LOGS MODULE BAR */}
              <div className="h-44 bg-[#050505] border-t border-white/5 p-4 flex flex-col font-mono text-[10px] shrink-0 z-10 w-full overflow-hidden">
                <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-2 h-6">
                  <span className="text-white/40 tracking-widest uppercase flex items-center gap-1">
                    <Terminal className="h-3 w-3" /> nextcome-emulator ~ simulated console output
                  </span>
                  <button onClick={() => setTerminalLogs([])} className="text-white/30 hover:text-white transition uppercase text-[9px]">
                    Clear Consoles
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1 text-slate-300 select-all font-mono leading-relaxed pr-2">
                  {terminalLogs.map((log, index) => (
                    <p key={index} className="truncate">
                      <span className="text-white/30 mr-2 select-none">&gt;</span>{log}
                    </p>
                  ))}
                </div>
              </div>

            </section>
          </>
        )}

        {/* VIEW 2: DATABASE VIEW (Shows generated schema visualization) */}
        {selectedHeaderTab === 'database' && (
          <div className="flex-1 bg-[#050505] p-6 space-y-6 flex flex-col select-none">
            <div className="pb-4 border-b border-white/10">
              <h1 className="text-4xl font-extrabold tracking-tighter leading-none mb-2">Relational Schemas</h1>
              <p className="text-white/50 text-xs">Simulated active relational structure mapped based on active code components.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 items-start">
              
              {/* Prisma Code Preview */}
              <div className="md:col-span-6 bg-[#0a0a0f] border border-white/10 rounded-2xl p-4 flex flex-col h-[400px]">
                <span className="text-[10px] font-mono uppercase text-white/30 mb-2">schema.prisma ORM Definitions</span>
                <div className="flex-1 overflow-y-auto bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-[11px] text-slate-300 leading-relaxed">
                  <pre className="whitespace-pre-wrap">
{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Workspace {
  id        String   @id @default(uuid())
  name      String
  files     File[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model File {
  id          String    @id @default(uuid())
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  path        String
  content     String
}`}
                  </pre>
                </div>
              </div>

              {/* Graphical Table Relational visual model */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-[10px] font-mono uppercase text-white/30">Schema Database Entity Map</span>
                
                <div className="border border-white/10 bg-white/[0.02] p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                    <span>[Table] Workspace</span>
                    <span className="text-[9px] font-mono text-white/40">UUID PK</span>
                  </div>
                  <div className="h-[1px] bg-slate-800"></div>
                  <div className="space-y-1.5 text-[11px] font-mono leading-none">
                    <div className="flex justify-between"><span>id *</span> <span className="text-slate-500">String (PK)</span></div>
                    <div className="flex justify-between"><span>name</span> <span className="text-slate-500">String</span></div>
                    <div className="flex justify-between"><span>createdAt</span> <span className="text-slate-500">DateTime</span></div>
                  </div>
                </div>

                <div className="border border-white/10 bg-white/[0.02] p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-fuchsia-400">
                    <span>[Table] File</span>
                    <span className="text-[9px] font-mono text-white/40">UUID PK, FK</span>
                  </div>
                  <div className="h-[1px] bg-slate-800"></div>
                  <div className="space-y-1.5 text-[11px] font-mono leading-none">
                    <div className="flex justify-between"><span>id *</span> <span className="text-slate-500">String (PK)</span></div>
                    <div className="flex justify-between"><span>workspaceId</span> <span className="text-indigo-400 font-bold">Workspace.id (FK)</span></div>
                    <div className="flex justify-between"><span>path</span> <span className="text-slate-500">String</span></div>
                    <div className="flex justify-between"><span>content</span> <span className="text-slate-500">Text</span></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: DEPLOYS VIEW (Cloud logs and server specifications) */}
        {selectedHeaderTab === 'deploy' && (
          <div className="flex-1 bg-[#050505] p-6 space-y-6 flex flex-col select-none">
            <div className="pb-4 border-b border-white/10">
              <h1 className="text-4xl font-extrabold tracking-tighter leading-none mb-2">Cloud Container Deploy</h1>
              <p className="text-white/50 text-xs">Simulated live container mapping logs and routing parameters configured inside Google Cloud Run.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="border border-white/10 p-5 rounded-2xl bg-white/[0.01] space-y-3">
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block">Container Slots</span>
                <p className="text-2xl font-mono text-white">09 Active</p>
                <div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-indigo-500 h-full w-[80%]"></div></div>
                <p className="text-[10px] text-slate-400 font-mono leading-tight">CPU limits and bandwidth allocations calibrated inside Google infrastructure securely.</p>
              </div>

              <div className="border border-white/10 p-5 rounded-2xl bg-white/[0.01] space-y-3">
                <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-wider font-bold block">SSL Certificates</span>
                <p className="text-2xl font-mono text-emerald-400">SECURED</p>
                <div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-emerald-500 h-full w-full"></div></div>
                <p className="text-[10px] text-slate-400 font-mono leading-tight">Automated renewals completed. Routing configured via Cloud Run proxy endpoints.</p>
              </div>

              <div className="border border-white/10 p-5 rounded-2xl bg-white/[0.01] space-y-3">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold block">Build Pipeline</span>
                <p className="text-2xl font-mono text-white">V9 Stable</p>
                <div className="w-full bg-slate-800 h-1 rounded-full"><div className="bg-purple-500 h-full w-[45%]"></div></div>
                <p className="text-[10px] text-slate-400 font-mono leading-tight">Syncing continuous integration. Push directly to launch active build bundles.</p>
              </div>

            </div>

            <div className="bg-[#0b0c13] border border-white/10 p-4 rounded-xl flex-1 flex flex-col h-[200px]">
              <span className="text-[10px] font-mono uppercase text-white/30 b-2">Real-time Deployment Output Stream Console</span>
              <div className="flex-1 bg-black/50 rounded-lg p-3 font-mono text-[11px] text-slate-300 leading-relaxed overflow-y-auto mt-2">
                <p>&gt; [NextCome CD] Initializing secure build pipeline protocol...</p>
                <p>&gt; [NextCome CD] Compiling React bundle components using Esbuild...</p>
                <p>&gt; [NextCome CD] Generating static asset routes at /dist/index.html...</p>
                <p>&gt; [NextCome CD] Deploying Docker image snapshot to Google Artifact Registry...</p>
                <p className="text-emerald-400 font-bold">&gt; [NextCome CD] Build SUCCESS. Operational server running continuously on port 3000.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PLATFORM ANALYTICS VIEW */}
        {selectedHeaderTab === 'analytics' && (
          <div className="flex-1 bg-[#050505] p-6 space-y-6 flex flex-col select-none">
            <div className="pb-4 border-b border-white/10">
              <h1 className="text-4xl font-extrabold tracking-tighter leading-none mb-2">Platform Metrics</h1>
              <p className="text-white/50 text-xs">A comprehensive overview of operational billing thresholds, consumption bounds, and API quotas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Active Prompts Run", val: "142 runs", sub: "+24% week margin" },
                { label: "Compiler Synthesizer Load", val: "0.22s delay", sub: "Cached on Edge CDN" },
                { label: "Database Transactions", val: "2,492 commits", sub: "Prisma performance optimal" },
                { label: "SaaS Session Health", val: "99.98% runtime", sub: "Cloud Run scalable container" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.01] border border-white/5 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{stat.label}</span>
                  <div className="text-xl font-bold font-mono">{stat.val}</div>
                  <span className="text-[9px] text-emerald-400 block">{stat.sub}</span>
                </div>
              ))}
            </div>

            {/* Simulated interactive plan table */}
            <div className="border border-white/5 bg-white/[0.02] p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-white">SaaS Future Subscription Valuations Summary</h3>
              <div className="overflow-x-auto text-xs leading-normal">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 text-[10px]">
                      <th className="py-2.5">TIER PLAN</th>
                      <th>SIMULATED ALLOCATIONS</th>
                      <th>USAGE BOUNDS</th>
                      <th>PRICING MAPPING</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr>
                      <td className="py-3 font-sans font-bold text-white">Standard Base</td>
                      <td>1 Active Workspace</td>
                      <td>Standard VM Sandboxing</td>
                      <td>$0.00 / month</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-sans font-bold text-white">Cognitive Pro</td>
                      <td className="text-indigo-400">Infinite active workspaces</td>
                      <td>Full integration pipeline APIs</td>
                      <td>$24.00 / month</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-sans font-bold text-white">Sovereign Enterprise</td>
                      <td>Unlimited workspaces, Live VM</td>
                      <td>Dedicated HSM database clusters</td>
                      <td>$99.00 / month</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER: Minimal styling matching developer requirements */}
      <footer className="h-12 bg-black border-t border-white/5 px-6 flex items-center justify-between select-none text-[10px] text-white/40 shrink-0 font-mono">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <span className="text-white/20 font-bold tracking-widest">BRANCH</span>
            <span>feature/vibe-ui-main</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-white/20 font-bold tracking-widest">ENCLAVE</span>
            <span>standard-secure-gcp</span>
          </div>
        </div>
        <div className="text-right">
          Generated in 4.2s — Powered by Gemini-3.5-flash AI Engine
        </div>
      </footer>

      {/* MODAL: Creation dialog for adding custom relative files */}
      {showAddFileDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121422] border border-white/10 p-6 rounded-2xl w-full max-w-sm flex flex-col gap-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Scaffold New Workspace File</h3>
              <button onClick={() => setShowAddFileDialog(false)} className="text-xs text-white/40 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleCreateFile} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase">FILE PATH RELATIVE</label>
                <input 
                  type="text" 
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="e.g. src/components/NavBar.tsx"
                  required
                  className="w-full bg-[#0b0c13] border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-200"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-white hover:bg-slate-200 text-black py-2 rounded-xl text-xs font-bold transition"
              >
                Create File
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Creation dialog for adding custom projects */}
      {showNewProjectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121422] border border-white/10 p-6 rounded-2xl w-full max-w-sm flex flex-col gap-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Scaffold New Workspace Project</h3>
              <button onClick={() => setShowNewProjectDialog(false)} className="text-xs text-white/40 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleCreateNewProject} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase">PROJECT NAME</label>
                <input 
                  type="text" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Smart Wallet Web3"
                  required
                  className="w-full bg-[#0b0c13] border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-200"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-white hover:bg-slate-200 text-black py-2 rounded-xl text-xs font-bold transition"
              >
                Create Workspace Project
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline helper component for spins
function LoaderIcon({ className, ...props }: { className?: string; [key: string]: any }) {
  return (
    <svg 
      className={`animate-spin ${className}`} 
      fill="none" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
