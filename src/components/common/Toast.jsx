import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useData();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white border-emerald-500 shadow-teal',
    error: 'bg-white border-rose-500 shadow-lg',
    info: 'bg-white border-amber-500 shadow-solar'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short">
      <div className={`flex items-center gap-3 p-4 rounded-xl border-l-4 shadow-xl ${bgStyles[toast.type] || bgStyles.info}`}>
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium text-slate-800">{toast.message}</p>
      </div>
    </div>
  );
};

export default Toast;
