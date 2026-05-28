export interface ProjectFile {
  path: string;
  content: string;
  language: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  generatingPipeline?: {
    analyzer?: string;
    intent?: string;
    uiPlan?: string;
    backendPlan?: string;
    codeGen?: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  files: Record<string, string>; // path -> content
  chatHistory: ChatMessage[];
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
  };
}

export interface PipelineStep {
  id: string;
  label: string;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  details?: string;
}

export interface AIAgentAnalysis {
  appName: string;
  description: string;
  designVibe: string;
  techChoices: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
  };
  keyFeatures: string[];
  filesToUpdate: string[];
}
