export interface AnalyzedClause {
  id: string;
  clauseTitle: string;
  originalText: string;
  documentReference: string;
  riskPercentage: number;
  riskCategory: 'HIGH' | 'MODERATE' | 'OK';
  suggestion: string;
}

export interface ContractAnalysisResponse {
  summary: {
    totalClauses: number;
    highRiskCount: number;
    moderateRiskCount: number;
    okCount: number;
  };
  clauses: AnalyzedClause[];
}
