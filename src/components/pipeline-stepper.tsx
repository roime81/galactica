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

const stepStatus = 'completed';

export function PipelineStepper() {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex items-center justify-between rounded-md border border-border bg-card p-4"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              'relative',
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
            )}
          >
            <div className="flex items-center">
              <span
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  stepStatus === 'completed'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <step.icon className="h-7 w-7" />
              </span>
            </div>
            <div
              className={cn(
                'absolute inset-0 top-1/2 -z-10 hidden w-full bg-border sm:block',
                stepIdx === 0 ? 'rounded-l-lg' : '',
                stepIdx === steps.length - 1 ? 'rounded-r-lg' : ''
              )}
              aria-hidden="true"
            >
              <div
                className="h-0.5 w-full bg-transparent"
                style={{
                  width:
                    stepIdx < steps.length - 1
                      ? `calc(((100% - 1rem) / ${
                          steps.length - 1
                        }) * ${stepIdx} + 0.5rem)`
                      : '100%',
                }}
              />
            </div>
            <div className="mt-2 text-center">
              <p
                className={cn(
                  'text-base font-medium',
                  stepStatus === 'completed' ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {step.name}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
