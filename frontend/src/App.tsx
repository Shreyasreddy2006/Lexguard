import { useState } from 'react';
import UploadLanding from './components/UploadLanding';
import Dashboard from './components/Dashboard';
import { ContractAnalysisResponse } from './types';

export default function App() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [data, setData] = useState<ContractAnalysisResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUpload = async (file: File) => {
    setStatus('loading');
    const formData = new FormData();
    formData.append('document', file);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Server responded with ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setStatus('success');
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setData(null);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm py-4 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate">LEXGUARD</h1>
        {status === 'success' && (
          <button onClick={handleReset} className="text-sm font-medium text-slate hover:text-slate/70">
            Analyze New Document
          </button>
        )}
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {status === 'idle' && <UploadLanding onUpload={handleUpload} />}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
            <div className="w-16 h-16 border-4 border-t-slate border-cream rounded-full animate-spin"></div>
            <p className="text-xl font-medium animate-pulse text-slate">Clause Extractor parsing document...</p>
            <p className="text-sm text-slate/60">Evaluating real-world risk metrics...</p>
          </div>
        )}
        {status === 'error' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="bg-highRisk-bg p-6 rounded-lg text-center max-w-md w-full shadow-sm border border-highRisk-text/20">
              <h2 className="text-xl font-semibold text-highRisk-text mb-2">Analysis Failed</h2>
              <p className="text-sm text-highRisk-text/80 mb-6">{errorMsg}</p>
              <button 
                onClick={handleReset}
                className="px-4 py-2 bg-highRisk-text text-white rounded-md font-medium hover:bg-highRisk-text/90 transition-colors w-full"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        {status === 'success' && data && <Dashboard data={data} />}
      </main>
    </div>
  );
}
