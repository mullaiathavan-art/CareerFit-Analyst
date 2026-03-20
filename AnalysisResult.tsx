import React, { useState } from "react";
import { CareerAnalysisResult } from "../types";
import { ScoreGauge } from "./ScoreGauge";
import { Dropdown } from "./Dropdown";
import { 
  Building2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Lightbulb, 
  MessageSquare, 
  Briefcase, 
  Globe, 
  ExternalLink,
  Activity,
  Menu,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnalysisResultProps {
  result: CareerAnalysisResult;
  companyName: string;
}

type SectionId = 
  | "culture" 
  | "requiredSkills" 
  | "gapAnalysis" 
  | "recommendedActions" 
  | "interviewAdvice" 
  | "similarCompanies" 
  | "socialMedia";

interface SectionConfig {
  id: SectionId;
  title: string;
  icon: React.ElementType;
  iconColorClass: string;
}

const SECTIONS: SectionConfig[] = [
  { id: "culture", title: "Culture & Hiring Focus", icon: Lightbulb, iconColorClass: "text-amber-400" },
  { id: "requiredSkills", title: "Required Skills", icon: CheckCircle2, iconColorClass: "text-teal-400" },
  { id: "gapAnalysis", title: "Skill Gap Analysis", icon: Activity, iconColorClass: "text-blue-400" },
  { id: "recommendedActions", title: "Recommended Actions", icon: Lightbulb, iconColorClass: "text-emerald-400" },
  { id: "interviewAdvice", title: "Interview Advice", icon: MessageSquare, iconColorClass: "text-cyan-400" },
  { id: "similarCompanies", title: "Similar Companies to Explore", icon: Briefcase, iconColorClass: "text-indigo-400" },
  { id: "socialMedia", title: "Connect & Follow", icon: Globe, iconColorClass: "text-pink-400" },
];

export function AnalysisResult({ result, companyName }: AnalysisResultProps) {
  const [selectedSection, setSelectedSection] = useState<SectionId>("culture");

  const renderContent = () => {
    switch (selectedSection) {
      case "culture":
        return (
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Culture</span>
              <p className="text-gray-300 mt-1">{result.companyOverview.culture}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Hiring Focus</span>
              <p className="text-gray-300 mt-1">{result.companyOverview.hiringFocus}</p>
            </div>
          </div>
        );
      case "requiredSkills":
        return (
          <div className="space-y-6">
            <div>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider block mb-3">Technical Skills</span>
              <div className="flex flex-wrap gap-2">
                {result.requiredSkills.technical.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-800 text-gray-200 rounded-lg text-sm font-medium border border-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider block mb-3">Soft Skills</span>
              <div className="flex flex-wrap gap-2">
                {result.requiredSkills.soft.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-teal-900/30 text-teal-300 rounded-lg text-sm font-medium border border-teal-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case "gapAnalysis":
        return (
          <div className="space-y-6">
            {/* Detailed Skill Analysis Table */}
            {result.candidateAnalysis.skillAnalysis && result.candidateAnalysis.skillAnalysis.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-gray-700 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700 bg-gray-800/50">
                    <thead>
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-900/50">Skill</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-900/50">Your Level</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-900/50">Required</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-900/50">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {result.candidateAnalysis.skillAnalysis.map((item, i) => (
                        <tr key={i} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.skill}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {item.candidateLevel && item.candidateLevel !== "Unknown" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-700 text-gray-200 border border-gray-600">
                                {item.candidateLevel}
                              </span>
                            ) : (
                              <span className="text-gray-500 italic">Not specified</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.requiredLevel}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              item.status === "Match" || item.status === "Exceeds" 
                                ? "bg-emerald-900/30 text-emerald-400 border-emerald-500/30" 
                                : item.status === "Gap" || item.status === "Missing" 
                                ? "bg-red-900/30 text-red-400 border-red-500/30" 
                                : "bg-gray-700 text-gray-300 border-gray-600"
                            }`}>
                              {item.status === "Match" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                              {item.status === "Exceeds" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                              {(item.status === "Gap" || item.status === "Missing") && <XCircle className="w-3 h-3 mr-1" />}
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 text-center text-gray-400 italic">
                Detailed skill analysis not available.
              </div>
            )}

            {/* Additional Skills */}
            {result.candidateAnalysis.additionalSkills && result.candidateAnalysis.additionalSkills.length > 0 && (
              <div className="p-5 bg-blue-900/10 rounded-xl border border-blue-500/20">
                <h4 className="flex items-center gap-2 font-medium text-blue-400 mb-4">
                  <AlertCircle className="w-4 h-4" /> Bonus Skills Identified
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.candidateAnalysis.additionalSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-900/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case "recommendedActions":
        return (
          <ul className="space-y-3">
            {result.recommendedSkills.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        );
      case "interviewAdvice":
        return (
          <ul className="space-y-3">
            {result.interviewAdvice.map((advice, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-cyan-900/10 border border-cyan-500/20 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">{advice}</span>
              </li>
            ))}
          </ul>
        );
      case "similarCompanies":
        if (!result.similarCompanies || result.similarCompanies.length === 0) {
          return <p className="text-gray-400 italic">No similar companies found.</p>;
        }
        return (
          <div className="flex flex-wrap gap-3">
            {result.similarCompanies.map((company, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg text-sm font-medium border border-gray-700 hover:bg-gray-700 transition-colors cursor-default"
              >
                {company}
              </span>
            ))}
          </div>
        );
      case "socialMedia":
        if (!result.socialMedia || result.socialMedia.length === 0) {
          return <p className="text-gray-400 italic">No social media links found.</p>;
        }
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {result.socialMedia.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl transition-all group"
              >
                <span className="font-medium text-gray-200">{social.platform}</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const currentSection = SECTIONS.find(s => s.id === selectedSection) || SECTIONS[0];
  const Icon = currentSection.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto space-y-6"
    >
      {/* Header Section */}
      <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-900/30 rounded-xl">
              <Building2 className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{companyName}</h2>
              <p className="text-gray-400">{result.companyOverview.industry}</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed max-w-2xl text-sm md:text-base">
            {result.companyOverview.background}
          </p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          <ScoreGauge score={result.suitabilityScore} size={160} strokeWidth={12} />
          <div className="text-center max-w-[200px]">
             <p className="text-xs text-gray-400 italic">{result.scoreReasoning}</p>
          </div>
        </div>
      </div>

      {/* Navigation & Content Area */}
      <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
        {/* Dropdown Navigation */}
        <div className="p-4 md:p-6 border-b border-gray-800 bg-gray-900/50">
          <div className="max-w-xs">
            <Dropdown
              label="View Analysis For"
              options={SECTIONS.map(s => ({ label: s.title, value: s.id }))}
              value={selectedSection}
              onChange={(val) => setSelectedSection(val as SectionId)}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6 min-h-[400px]">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg bg-gray-800/50`}>
              <Icon className={`w-6 h-6 ${currentSection.iconColorClass}`} />
            </div>
            <h3 className="text-xl font-semibold text-white">{currentSection.title}</h3>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
