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
        className="flex items-center justify-between border-y border-border py-6 overflow-x-auto"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              stepIdx !== steps.length - 1 ? "pr-10 sm:pr-14 md:pr-20" : "pr-2",
              "relative"
            )}
          >
            {step.status === "current" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-1 w-full bg-primary" />
                </div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -bottom-8 text-sm font-semibold text-primary whitespace-nowrap">
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
                  <div className="h-1 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-300 bg-background">
                   <step.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="absolute -bottom-8 text-sm font-medium text-muted-foreground whitespace-nowrap">
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
