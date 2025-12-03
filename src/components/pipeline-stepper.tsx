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

export function PipelineStepper() {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex items-start justify-between rounded-md border border-border bg-card p-4"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              'relative flex-1',
              stepIdx !== steps.length - 1 ? 'pr-4' : ''
            )}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground relative"
              >
                <step.icon className="h-5 w-5" aria-hidden="true" />
                {stepIdx !== steps.length - 1 && (
                  <div
                    className="absolute top-1/2 left-full ml-2 hidden w-full -translate-y-1/2 bg-border sm:block"
                    style={{ height: '2px' }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="mt-2 text-xs font-medium text-primary">
                {step.name}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
