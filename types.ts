
export enum GenerationMode {
  CONTENT = 'CONTENT',
  STRATEGY = 'STRATEGY',
  SALES = 'SALES',
  DIAGNOSTIC = 'DIAGNOSTIC',
  DATA_ANALYSIS = 'DATA_ANALYSIS'
}

export interface AIResponse {
  text: string;
  error?: string;
}

export interface MBMContext {
  channel?: string;
  targetAudience?: string;
  objective?: string;
  funnelStage?: 'TOFU' | 'MOFU' | 'BOFU';
  dataType?: string;
  salesSegment?: string; // New: For ABM/Sales segmentation
  decisionMakerRole?: string; // New: C-Level, Manager, etc.
}
