import React from 'react';
import { AlertCircle, AlertTriangle, Info, Flame } from 'lucide-react';

export const UrgencyBadge = ({ urgency = 'Medium', size = 'md' }) => {
  const configs = {
    'Emergency': {
      bg: 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse',
      icon: Flame,
      label: 'Emergency (4h SLA)'
    },
    'High': {
      bg: 'bg-orange-100 text-orange-800 border-orange-300',
      icon: AlertCircle,
      label: 'High Urgency'
    },
    'Medium': {
      bg: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: AlertTriangle,
      label: 'Medium'
    },
    'Low': {
      bg: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: Info,
      label: 'Low'
    }
  };

  const config = configs[urgency] || configs['Medium'];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1 font-semibold',
    md: 'text-xs px-2.5 py-1 gap-1 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${sizeClasses[size] || sizeClasses.md}`}
    >
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};

export default UrgencyBadge;
