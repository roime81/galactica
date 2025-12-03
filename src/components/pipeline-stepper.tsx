import {
  Database,
  UploadCloud,
  ArrowRightLeft,
  TestTube2,
  Package,
  Medal,
  Gem,
  Users,
  Flag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { name: 'Data Source', icon: Database },
  { name: 'Ingestion', icon: UploadCloud },
  { name: 'Mapping', icon: ArrowRightLeft },
  { name: 'Testing', icon: TestTube2 },
  { name: 'Bronze', icon: Package },
  { name: 'Silver', icon: Medal },
  { name: 'Gold', icon: Gem },
  { name: 'Data Consumerization', icon: Users },
  { name: 'End of Journey', icon: Flag },
];

interface PipelineStepperProps {
  currentStep: string;
}

export function PipelineStepper({ currentStep }: PipelineStepperProps) {
  const currentStepIndex = steps.findIndex((step) => step.name === currentStep);

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex flex-col space-y-4 rounded-md border border-border bg-card p-4"
      >
        {steps.map((step, stepIdx) => {
          const isCurrent = step.name === currentStep;

          return (
            <li
              key={step.name}
              className={cn(
                'relative'
              )}
            >
              <button className={cn('w-full transition-opacity', !isCurrent && 'opacity-50 hover:opacity-75')}>
                <div className="flex items-center text-center gap-4">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground relative',
                      !isCurrent && 'bg-muted'
                    )}
                  >
                    <step.icon
                      className={cn(
                        'h-6 w-6',
                        !isCurrent && 'text-muted-foreground'
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <p
                    className={cn(
                      'text-sm font-medium text-primary',
                      !isCurrent && 'text-muted-foreground'
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
