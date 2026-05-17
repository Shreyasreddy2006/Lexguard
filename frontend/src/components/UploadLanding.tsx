import { useState, useRef } from 'react';
import { UploadCloud, AlertCircle } from 'lucide-react';

interface UploadLandingProps {
  onUpload: (file: File) => void;
}

export default function UploadLanding({ onUpload }: UploadLandingProps) {
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndUpload = (file: File) => {
    setError('');
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only PDF, DOCX, and TXT are allowed.');
      return;
    }
    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError('File exceeds 5MB size limit.');
      return;
    }
    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center mt-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate mb-4">Protect Your Legal Rights</h1>
        <p className="text-lg text-slate/70">
          Upload any contract, offer letter, or policy. Our Vertex AI multi-agent system will instantly identify hidden liabilities and exploitative clauses.
        </p>
      </div>

      <div 
        className={`w-full border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors ${dragActive ? 'border-slate bg-slate/5' : 'border-slate/20 bg-white hover:border-slate/40 hover:bg-slate/5'}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud className="w-16 h-16 text-slate/40 mb-4" />
        <h3 className="text-xl font-semibold text-slate mb-2">Drag & Drop or Click to Upload</h3>
        <p className="text-sm text-slate/60 mb-6">Supports .PDF, .DOCX, .TXT (Max 5MB)</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".pdf,.docx,.txt"
          onChange={handleChange}
        />
        <button className="px-6 py-3 bg-slate text-white font-medium rounded-lg shadow-sm hover:bg-slate/90 transition-all flex items-center gap-2">
           Analyze Document
        </button>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 text-highRisk-text bg-highRisk-bg px-4 py-3 rounded-lg w-full">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
