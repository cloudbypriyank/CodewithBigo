import React, { useState, useEffect } from "react";
import { Search, ExternalLink, Check, Filter, Tag, BookOpen, AlertCircle, Sparkles, Briefcase, Code2 } from "lucide-react";
import { leetCodeData, LeetCodeQuestion } from "../data/leetcodeQuestions";

// Domain map for Clearbit Logo API
const domainMap: Record<string, string> = {
  "Google": "google.com",
  "Amazon": "amazon.com",
  "Microsoft": "microsoft.com",
  "Meta": "meta.com",
  "Facebook": "meta.com",
  "Netflix": "netflix.com",
  "Uber": "uber.com",
  "Apple": "apple.com",
  "Goldman Sachs": "goldmansachs.com",
  "Morgan Stanley": "morganstanley.com",
  "Flipkart": "flipkart.com",
  "Walmart": "walmart.com",
  "Adobe": "adobe.com",
  "Salesforce": "salesforce.com",
  "Paytm": "paytm.com",
  "Dunzo": "dunzo.com",
  "Ola Cabs": "olacabs.com",
  "Oracle": "oracle.com",
  "Samsung": "samsung.com",
  "Zoho": "zoho.com",
  "Snapdeal": "snapdeal.com",
  "LinkedIn": "linkedin.com",
  "Infosys": "infosys.com",
  "TCS": "tcs.com",
  "Accenture": "accenture.com",
  "Deloitte": "deloitte.com",
  "PayPal": "paypal.com",
  "Nvidia": "nvidia.com",
  "Directi": "directi.com",
  "PhonePe": "phonepe.com",
  "Blinkit": "blinkit.com",
  "Hike": "hike.in",
  "Intuit": "intuit.com",
  "MakeMyTrip": "makemytrip.com",
  "Cisco": "cisco.com",
  "IBM": "ibm.com",
  "Visa": "visa.com",
  "Swiggy": "swiggy.com",
  "Myntra": "myntra.com",
  "Qualcomm": "qualcomm.com",
  "Codenation": "codenation.co.in",
  "Amdocs": "amdocs.com",
  "Brocade": "broadcom.com",
  "Juniper": "juniper.net",
  "Juniper Networks": "juniper.net",
  "Linkedin": "linkedin.com",
  "Quikr": "quikr.com",
  "Synopsys": "synopsys.com",
  "D-E-Shaw": "deshaw.com",
  "DEShaw": "deshaw.com",
  "FactSet": "factset.com",
  "BankBazaar": "bankbazaar.com"
};

// Colors for fallback initials badges based on company name
const getCompanyBadgeColor = (name: string): string => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    "bg-red-500/20 text-red-300 border-red-500/30",
    "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "bg-teal-500/20 text-teal-300 border-teal-500/30",
    "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
    "bg-pink-500/20 text-pink-300 border-pink-500/30"
  ];
  return colors[hash % colors.length];
};

interface LeetCodeQuestionsProps {
  onSelectQuestion?: (question: any) => void;
}

export default function LeetCodeQuestions({ onSelectQuestion }: LeetCodeQuestionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [completedList, setCompletedList] = useState<Record<string, boolean>>({});
  const [tooltipCompany, setTooltipCompany] = useState<{ id: string; name: string } | null>(null);

  // Load completed questions state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("leetcode_completed_questions");
      if (saved) {
        setCompletedList(JSON.parse(saved));
      } else {
        // Fallback: load defaults from CSV representation
        const initialCompleted: Record<string, boolean> = {};
        leetCodeData.forEach(cat => {
          cat.questions.forEach(q => {
            if (q.done) {
              initialCompleted[q.id] = true;
            }
          });
        });
        setCompletedList(initialCompleted);
      }
    } catch (e) {
      console.error("Failed to load completed questions:", e);
    }
  }, []);

  // Save completed questions list to localStorage when changed
  const toggleCompleted = (questionId: string) => {
    const updated = { ...completedList, [questionId]: !completedList[questionId] };
    setCompletedList(updated);
    try {
      localStorage.setItem("leetcode_completed_questions", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save completed state:", e);
    }
  };

  // Get list of all categories
  const categories = ["ALL", ...leetCodeData.map(c => c.category)];

  // Flatten questions with category reference for filtering
  // "remove the checked one" - filters out the pre-completed questions that came from the spreadsheet
  const allQuestions = leetCodeData.flatMap(cat => 
    cat.questions
      .filter(q => !q.done)
      .map(q => ({
        ...q,
        category: cat.category
      }))
  );

  // Filter logic
  const filteredQuestions = allQuestions.filter(q => {
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.preRequisite && q.preRequisite.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "ALL" || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "ALL" || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getCompanyLogo = (companyName: string) => {
    const domain = domainMap[companyName];
    if (domain) {
      return `https://logo.clearbit.com/${domain}`;
    }
    return null;
  };

  // Stats
  const totalInFilter = filteredQuestions.length;
  const completedInFilter = filteredQuestions.filter(q => completedList[q.id]).length;
  const completionPercentage = totalInFilter > 0 ? Math.round((completedInFilter / totalInFilter) * 100) : 0;

  return (
    <div className="space-y-6 bg-slate-900/30 border border-white/5 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            LeetCode Directory
          </div>
          <h2 className="text-xl font-extrabold text-white">Company Target Sheet</h2>
          <p className="text-xs text-slate-400">Master problems tagged by top-tier product tech employers.</p>
        </div>

        {/* Mini progress tracker */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 min-w-[140px] flex flex-col justify-center">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span>PROGRESS</span>
            <span className="text-fuchsia-400 font-bold">{completedInFilter}/{totalInFilter}</span>
          </div>
          <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 transition-all duration-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 text-right mt-1 font-medium">{completionPercentage}% solved</div>
        </div>
      </div>

      {/* Filter and search panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 relative z-10">
        {/* Search input */}
        <div className="relative md:col-span-5">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems, companies, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/60 hover:bg-slate-950/80 focus:bg-slate-950 border border-white/10 focus:border-fuchsia-500/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Category selector */}
        <div className="relative md:col-span-4">
          <Filter className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-950/60 hover:bg-slate-950/80 border border-white/10 focus:border-fuchsia-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 outline-none transition-all cursor-pointer appearance-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-slate-950 text-slate-300">
                {cat === "ALL" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty selector */}
        <div className="relative md:col-span-3">
          <Tag className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full bg-slate-950/60 hover:bg-slate-950/80 border border-white/10 focus:border-fuchsia-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 outline-none transition-all cursor-pointer appearance-none"
          >
            <option value="ALL" className="bg-slate-950 text-slate-300">All Difficulties</option>
            <option value="Easy" className="bg-slate-950 text-emerald-400">Easy</option>
            <option value="Medium" className="bg-slate-950 text-amber-400">Medium</option>
            <option value="Hard" className="bg-slate-950 text-rose-400">Hard</option>
          </select>
        </div>
      </div>

      {/* Main Table area */}
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950/20 max-h-[500px] overflow-y-auto relative z-10 custom-scrollbar">
        {filteredQuestions.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="p-3 text-center w-12">Done</th>
                <th className="p-3">Problem</th>
                <th className="p-3 w-24">Difficulty</th>
                <th className="p-3 w-40">Companies Asking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredQuestions.map((q) => {
                const isCompleted = !!completedList[q.id];
                return (
                  <tr 
                    key={q.id} 
                    className={`hover:bg-white/5 transition-colors group ${isCompleted ? "bg-emerald-500/[0.02]" : ""}`}
                  >
                    {/* Done State Checkbox */}
                    <td className="p-3 text-center align-middle">
                      <button
                        onClick={() => toggleCompleted(q.id)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                          isCompleted 
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
                            : "border-white/10 hover:border-fuchsia-500/40 bg-slate-900/50"
                        }`}
                      >
                        {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </td>

                    {/* Problem Name & Category Label */}
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (onSelectQuestion) {
                                onSelectQuestion(q);
                              } else {
                                window.open(q.url, "_blank");
                              }
                            }}
                            className={`font-semibold hover:text-fuchsia-300 text-left transition-colors flex items-center gap-1.5 cursor-pointer ${
                              isCompleted ? "text-slate-400 line-through" : "text-slate-100"
                            }`}
                          >
                            {q.title}
                            <Code2 className="w-3.5 h-3.5 text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-medium tracking-wide uppercase">
                            {q.category}
                          </span>
                          {q.preRequisite && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-mono border border-indigo-500/10">
                              {q.preRequisite}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Difficulty */}
                    <td className="p-3 align-middle">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        q.difficulty === "Easy" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10" 
                          : q.difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/10"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/10"
                      }`}>
                        {q.difficulty}
                      </span>
                    </td>

                    {/* Overlapping Company Logos */}
                    <td className="p-3 align-middle">
                      {q.companies.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 relative">
                          {q.companies.slice(0, 4).map((company, index) => {
                            const logoUrl = getCompanyLogo(company);
                            const uniqueTooltipId = `${q.id}-${company}-${index}`;
                            return (
                              <div
                                key={uniqueTooltipId}
                                className="relative cursor-pointer"
                                onMouseEnter={() => setTooltipCompany({ id: q.id, name: company })}
                                onMouseLeave={() => setTooltipCompany(null)}
                                title={company}
                              >
                                {logoUrl ? (
                                  <img
                                    src={logoUrl}
                                    alt={company}
                                    className="w-6 h-6 rounded-md bg-white border border-white/20 shadow-md object-contain p-0.5 hover:scale-110 hover:z-20 relative transition-transform"
                                    onError={(e) => {
                                      // If Clearbit fails or times out, fallback immediately to generic icon instead of initials "AM GO"
                                      (e.target as HTMLImageElement).style.display = "none";
                                      const nextSibling = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                                      if (nextSibling) nextSibling.style.display = "flex";
                                    }}
                                  />
                                ) : null}

                                <div
                                  style={{ display: logoUrl ? "none" : "flex" }}
                                  className={`w-6 h-6 rounded-md items-center justify-center border border-white/10 hover:scale-110 hover:z-20 relative transition-transform bg-slate-800 text-slate-400`}
                                >
                                  <Briefcase className="w-3 h-3 text-slate-400" />
                                </div>

                                {tooltipCompany?.id === q.id && tooltipCompany?.name === company && (
                                  <div className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-mono font-bold bg-slate-950 border border-white/15 text-white rounded shadow-xl whitespace-nowrap animate-fade-in pointer-events-none">
                                    {company}
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {q.companies.length > 4 && (
                            <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-bold text-slate-400 select-none">
                              +{q.companies.length - 4}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500 font-mono text-[10px]">General / standard</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No matching questions found</p>
            <p className="text-xs text-slate-500">Try adjusting your filters or typing a different query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
