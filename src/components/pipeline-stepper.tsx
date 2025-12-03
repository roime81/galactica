import { cn } from "@/lib/utils";
import { Circle, Database, Upload, GitMerge, TestTube2, Flag, User, ShoppingCart, Award } from "lucide-react";
import { BronzeIcon, SilverIcon, GoldIcon } from "@/components/icons";

const steps = [
  { name: "DATA SOURCE", icon: Database, status: "current" },
  { name: "INGESTION", icon: Upload, status: "upcoming" },
  { name: "MAPPING", icon: GitMerge, status: "upcoming" },
  { name: "TESTING", icon: TestTube2, status: "upcoming" },
  { name: "BRONZE", icon: BronzeIcon, status: "upcoming" },
  { name: "SILVER", icon: SilverIcon, status: "upcoming" },
  { name: "GOLD", icon: GoldIcon, status: "upcoming" },
  { name: "DATA CONSUMERIZATION", icon: ShoppingCart, status: "upcoming" },
  { name: "END OF JOURNEY", icon: Flag, status: "upcoming" },
];

export function PipelineStepper() {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex items-center justify-between border-y border-border py-4 overflow-x-auto"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-12 md:pr-16" : "pr-2",
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
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 bg-background">
                   <step.icon
                    className="h-5 w-5 text-gray-400"
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
