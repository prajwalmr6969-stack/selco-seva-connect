import React from 'react';
import { Clock, UserCheck, Wrench, CheckCircle2, Check } from 'lucide-react';

export const Stepper = ({ currentStatus, timeline = [] }) => {
  const steps = [
    { key: 'Reported', label: '1. Reported', icon: Clock, desc: 'Issue registered & logged' },
    { key: 'Assigned', label: '2. Assigned', icon: UserCheck, desc: 'Technician dispatched' },
    { key: 'In Progress', label: '3. In Progress', icon: Wrench, desc: 'On-site diagnostics' },
    { key: 'Resolved', label: '4. Resolved', icon: CheckCircle2, desc: 'Serviced & verified' }
  ];

  const statusOrder = {
    'Reported': 1,
    'Assigned': 2,
    'In Progress': 3,
    'Resolved': 4
  };

  const currentStepNum = statusOrder[currentStatus] || 1;

  const findTimelineItem = (key) => {
    return timeline.find(item => item.status === key);
  };

  return (
    <div className="w-full py-4">
      {/* Desktop & Tablet Stepper */}
      <div className="relative">
        {/* Connecting Progress Track */}
        <div className="absolute top-6 left-12 right-12 h-1 bg-slate-200 -z-0">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-solar-teal-600 to-emerald-500 transition-all duration-700 ease-out"
            style={{
              width: `${((currentStepNum - 1) / (steps.length - 1)) * 100}%`
            }}
          />
        </div>

        {/* Step Nodes */}
        <div className="grid grid-cols-4 relative z-10 gap-2">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStepNum || currentStatus === 'Resolved';
            const isCurrent = stepNum === currentStepNum && currentStatus !== 'Resolved';
            const isPending = stepNum > currentStepNum;
            const timelineItem = findTimelineItem(step.key);
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center text-center px-1">
                {/* Node Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-emerald-200'
                      : isCurrent
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100 shadow-solar animate-pulse-subtle'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 stroke-[3]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Label & Description */}
                <div className="mt-3">
                  <p className={`text-xs md:text-sm font-bold ${
                    isCurrent ? 'text-amber-700' : isCompleted ? 'text-emerald-800' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </p>
                  
                  {timelineItem ? (
                    <p className="text-[11px] font-medium text-slate-600 mt-0.5">
                      {timelineItem.time}
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                      {step.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
