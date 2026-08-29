import React from 'react';
import { Clock, UserCheck, Wrench, CheckCircle2 } from 'lucide-react';

export const StatusBadge = ({ status, size = 'md', className = '' }) => {
  const configs = {
    'Reported': {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: Clock,
      label: 'Reported / Pending'
    },
    'Assigned': {
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: UserCheck,
      label: 'Assigned to Tech'
    },
    'In Progress': {
      bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      icon: Wrench,
      label: 'In Progress'
    },
    'Resolved': {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CheckCircle2,
      label: 'Resolved'
    }
  };

  const config = configs[status] || configs['Reported'];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs md:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm md:text-base px-3.5 py-1.5 gap-2 font-medium'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-sm ${config.bg} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
