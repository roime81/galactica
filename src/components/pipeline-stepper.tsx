import {
  Database,
  UploadCloud,
  ArrowRightLeft,
  TestTube2,
  Medal,
  Gem,
  LayoutDashboard,
  BrainCircuit,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BronzeIcon } from './icons';

const mainSteps = [
  { name: 'Data Source', icon: Database },
];

const bronzeSubSteps = [
    { name: 'Ingestion', icon: UploadCloud },
    { name: 'Mapping', icon: ArrowRightLeft },
    { name: 'Testing', icon: TestTube2 },
]

const finalSteps = [
  { name: 'Silver', icon: Medal },
  { name: 'Gold', icon: Gem },
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'ML & AI', icon: BrainCircuit },
];

interface PipelineStepperProps {
  currentStep: string;
  onStepClick: (stepName: string) => void;
  isBronzeExpanded: boolean;
  onBronzeToggle: () => void;
}

export function PipelineStepper({
  currentStep,
  onStepClick,
  isBronzeExpanded,
  onBronzeToggle
}: PipelineStepperProps) {
    const isBronzeActive = ['Bronze', ...bronzeSubSteps.map(s => s.name)].includes(currentStep);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-1">
        {mainSteps.map((step) => {
          const isCurrent = step.name === currentStep;
          return (
            <li key={step.name}>
              <button
                onClick={() => onStepClick(step.name)}
                className={cn(
                  'w-full transition-colors p-2 rounded-md',
                  isCurrent ? 'bg-primary/10' : 'hover:bg-primary/5'
                )}
              >
                <div className="flex items-center text-center gap-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full',
                      isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {step.name}
                  </p>
                </div>
              </button>
            </li>
          );
        })}

        {/* Bronze Collapsible Section */}
        <li>
            <button
            onClick={onBronzeToggle}
            className={cn(
                'w-full transition-colors p-2 rounded-md flex justify-between items-center',
                isBronzeActive ? 'bg-primary/10' : 'hover:bg-primary/5'
            )}
            >
            <div className="flex items-center text-center gap-4">
                <div
                className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full',
                    isBronzeActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
                >
                <BronzeIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p
                className={cn(
                    'text-sm font-medium',
                    isBronzeActive ? 'text-primary' : 'text-muted-foreground'
                )}
                >
                Bronze
                </p>
            </div>
            <ChevronDown className={cn('h-5 w-5 text-muted-foreground transition-transform', isBronzeExpanded && 'rotate-180')} />
            </button>
            {isBronzeExpanded && (
                <ul className="pl-8 pt-2 space-y-1 border-l border-border ml-7">
                    {bronzeSubSteps.map(subStep => {
                         const isCurrent = subStep.name === currentStep;
                        return (
                            <li key={subStep.name}>
                                 <button
                                    onClick={() => onStepClick(subStep.name)}
                                    className={cn(
                                        'w-full transition-colors p-2 rounded-md text-left',
                                        isCurrent ? 'bg-primary/10' : 'hover:bg-primary/5'
                                    )}
                                >
                                     <div className="flex items-center text-center gap-4">
                                        <subStep.icon className={cn('h-5 w-5', isCurrent ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true" />
                                        <p
                                            className={cn(
                                            'text-sm font-medium',
                                            isCurrent ? 'text-primary' : 'text-muted-foreground'
                                            )}
                                        >
                                            {subStep.name}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </li>

        {finalSteps.map((step) => {
          const isCurrent = step.name === currentStep;
          return (
            <li key={step.name}>
              <button
                onClick={() => onStepClick(step.name)}
                className={cn(
                  'w-full transition-colors p-2 rounded-md',
                  isCurrent ? 'bg-primary/10' : 'hover:bg-primary/5'
                )}
              >
                <div className="flex items-center text-center gap-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full',
                      isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {step.name}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
