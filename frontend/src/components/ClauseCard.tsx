import { AnalyzedClause } from '../types';
import { cn } from '../utils';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface ClauseCardProps {
  clause: AnalyzedClause;
}

export default function ClauseCard({ clause }: ClauseCardProps) {
  const isHighRisk = clause.riskCategory === 'HIGH';
  const isModRisk = clause.riskCategory === 'MODERATE';
  const isSafe = clause.riskCategory === 'OK';

  return (
    <div className={cn(
      "rounded-xl overflow-hidden shadow-sm border transition-all hover:shadow-md",
      isHighRisk && "bg-white border-highRisk-text/30",
      isModRisk && "bg-white border-modRisk-text/30",
      isSafe && "bg-white border-safe-text/20"
    )}>
      <div className="p-6">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate">{clause.clauseTitle}</h3>
            <p className="text-sm font-medium text-slate/50 mt-1">{clause.documentReference}</p>
          </div>
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm shadow-sm",
            isHighRisk && "bg-highRisk-bg text-highRisk-text border border-highRisk-text/20",
            isModRisk && "bg-modRisk-bg text-modRisk-text border border-modRisk-text/20",
            isSafe && "bg-safe-bg text-safe-text border border-safe-text/20"
          )}>
            {clause.riskPercentage}% Risk
          </div>
        </div>
        
        <div className="bg-slate/5 p-4 rounded-lg border border-slate/10 mb-4 relative">
          <div className="absolute top-4 left-4 text-slate/20">
            <FileTextIcon />
          </div>
          <p className="text-slate/80 text-sm leading-relaxed pl-8 font-serif">"{clause.originalText}"</p>
        </div>

        {/* Strategic Suggestion Window */}
        <div className={cn(
          "p-4 rounded-lg border mt-4 flex items-start gap-3",
          isHighRisk && "bg-highRisk-bg/50 border-highRisk-text/20",
          isModRisk && "bg-modRisk-bg/50 border-modRisk-text/20",
          isSafe && "bg-safe-bg/50 border-safe-text/20"
        )}>
          <div className="shrink-0 mt-0.5">
            {isHighRisk && <AlertTriangle className="w-5 h-5 text-highRisk-text" />}
            {isModRisk && <Info className="w-5 h-5 text-modRisk-text" />}
            {isSafe && <CheckCircle2 className="w-5 h-5 text-safe-text" />}
          </div>
          <div>
            <h4 className={cn(
              "text-sm font-bold mb-1",
              isHighRisk && "text-highRisk-text",
              isModRisk && "text-modRisk-text",
              isSafe && "text-safe-text"
            )}>
              {isSafe ? 'OK' : 'Strategic Remediation Advice'}
            </h4>
            <p className="text-sm text-slate/80">{clause.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileTextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}
