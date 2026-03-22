export interface IReport {
  id: string;
  title: string;
  description: string;
  meta: Record<string, unknown>;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  generatedBy?: string;
}
