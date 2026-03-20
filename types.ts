export interface CareerAnalysisResult {
  companyOverview: {
    background: string;
    industry: string;
    productsServices: string[];
    culture: string;
    hiringFocus: string;
  };
  requiredSkills: {
    technical: string[];
    soft: string[];
  };
  candidateAnalysis: {
    matchingSkills: string[];
    missingSkills: string[];
    additionalSkills: string[];
    skillAnalysis: {
      skill: string;
      candidateLevel: string;
      requiredLevel: string;
      status: "Match" | "Gap" | "Exceeds" | "Missing";
    }[];
  };
  suitabilityScore: number;
  scoreReasoning: string;
  recommendedSkills: string[];
  interviewAdvice: string[];
  similarCompanies: string[];
  socialMedia: {
    platform: string;
    url: string;
  }[];
}
