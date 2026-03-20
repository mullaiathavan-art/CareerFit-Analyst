import React, { useState, useRef } from "react";
import { Search, Briefcase, User, Upload, FileText, X, Plus, Trash2 } from "lucide-react";
import { Dropdown } from "./Dropdown";

interface Skill {
  name: string;
  level: string;
}

interface AnalysisFormProps {
  onSubmit: (skills: Skill[], company: string, resume?: { data: string; mimeType: string }) => void;
  isSubmitting: boolean;
}

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function AnalysisForm({ onSubmit, isSubmitting }: AnalysisFormProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Intermediate");
  const [company, setCompany] = useState("");
  const [resume, setResume] = useState<{ name: string; data: string; mimeType: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((skills.length > 0 || resume) && company.trim()) {
      onSubmit(skills, company, resume ? { data: resume.data, mimeType: resume.mimeType } : undefined);
    }
  };

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      setSkills([...skills, { name: newSkillName.trim(), level: newSkillLevel }]);
      setNewSkillName("");
      setNewSkillLevel("Intermediate");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        setResume({
          name: file.name,
          data: base64String,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeResume = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-4 md:p-8">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white">Career Fit Analyst</h2>
        <p className="text-sm md:text-base text-gray-400 mt-2">
          Enter your skills or upload a resume to get a detailed compatibility report.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-teal-400" />
            Target Company
          </label>
          <div className="relative">
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google, Microsoft, Startup Inc."
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400" />
            Resume (PDF)
          </label>
          
          {!resume ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-gray-800/50 transition-all group"
            >
              <Upload className="w-8 h-8 text-gray-500 group-hover:text-teal-400 mb-2 transition-colors" />
              <p className="text-sm text-gray-400 group-hover:text-gray-300">Click to upload PDF resume</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-teal-900/20 border border-teal-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/20 rounded-lg">
                  <FileText className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-sm font-medium text-gray-200 truncate max-w-[200px]">{resume.name}</span>
              </div>
              <button 
                type="button"
                onClick={removeResume}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
        </div>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink-0 mx-4 text-gray-600 text-xs font-medium tracking-wider uppercase">OR ENTER MANUALLY</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            <User className="w-4 h-4 text-teal-400" />
            Your Skills & Proficiency
          </label>
          
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-stretch">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g. React"
              className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            
            <div className="w-full sm:w-48">
              <Dropdown
                options={SKILL_LEVELS}
                value={newSkillLevel}
                onChange={setNewSkillLevel}
                className="w-full"
              />
            </div>

            <button
              type="button"
              onClick={handleAddSkill}
              disabled={!newSkillName.trim()}
              className="p-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex items-center justify-center shadow-lg shadow-teal-900/20"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {skills.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 border border-gray-700 rounded-lg group hover:border-teal-500/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-xs text-teal-400">{skill.level}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="p-1 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || (skills.length === 0 && !resume) || !company.trim()}
          className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99]"
        >
          {isSubmitting ? (
            "Analyzing..."
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze Suitability
            </>
          )}
        </button>
      </form>
    </div>
  );
}
