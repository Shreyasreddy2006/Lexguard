import { ContractAnalysisResponse } from '../types';
import ClauseCard from './ClauseCard';
import { FileText, ShieldAlert, Shield, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  data: ContractAnalysisResponse;
}

export default function Dashboard({ data }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Metric Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate/60 text-sm font-medium">Total Clauses Found</h3>
            <FileText className="w-5 h-5 text-slate/40" />
          </div>
          <p className="text-3xl font-bold text-slate">{data.summary.totalClauses}</p>
        </div>
        
        <div className="bg-highRisk-bg p-6 rounded-xl shadow-sm border border-highRisk-text/20 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-highRisk-text/80 text-sm font-medium">High Risk Clauses</h3>
            <ShieldAlert className="w-5 h-5 text-highRisk-text/60" />
          </div>
          <p className="text-3xl font-bold text-highRisk-text">{data.summary.highRiskCount}</p>
        </div>
        
        <div className="bg-modRisk-bg p-6 rounded-xl shadow-sm border border-modRisk-text/20 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-modRisk-text/80 text-sm font-medium">Moderate Risk Clauses</h3>
            <Shield className="w-5 h-5 text-modRisk-text/60" />
          </div>
          <p className="text-3xl font-bold text-modRisk-text">{data.summary.moderateRiskCount}</p>
        </div>
        
        <div className="bg-safe-bg p-6 rounded-xl shadow-sm border border-safe-text/20 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-safe-text/80 text-sm font-medium">Safe / OK Clauses</h3>
            <ShieldCheck className="w-5 h-5 text-safe-text/60" />
          </div>
          <p className="text-3xl font-bold text-safe-text">{data.summary.okCount}</p>
        </div>
      </div>

      {/* Main Assessment Feed */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate mb-6">Main Assessment Feed</h2>
        <div className="flex flex-col gap-6">
          {data.clauses.map((clause, idx) => (
            <ClauseCard key={clause.id || idx} clause={clause} />
          ))}
        </div>
      </div>
    </div>
  );
}
