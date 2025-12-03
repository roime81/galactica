import { cn } from "@/lib/utils";
import { Circle, Cpu, Database, Microscope } from "lucide-react";

const steps = [
  { name: "RAW INGESTION", icon: Database, status: "current" },
  { name: "HARMONIZATION", icon: Microscope, status: "upcoming" },
  { name: "CURATED SCHEMA", icon: Circle, status: "upcoming" },
  { name: "APPLIED AI", icon: Cpu, status: "upcoming" },
];

export function PipelineStepper() {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex items-center justify-between border-y border-border py-4"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
              "relative"
            )}
          >
            {step.status === "current" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -bottom-6 text-xs font-semibold text-primary whitespace-nowrap">
                    {step.name}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-700" />
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-700 bg-background">
                   <step.icon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="absolute -bottom-6 text-xs font-medium text-muted-foreground whitespace-nowrap">
                    {step.name}
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
