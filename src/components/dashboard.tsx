import { DataFlowVisualization } from "@/components/data-flow-visualization";
import { LlmInteraction } from "@/components/llm-interaction";
import { GalacticaIcon } from "./icons";
import { Auth } from "./auth";

export function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="flex justify-between items-start mb-12 md:mb-16">
        <div className="flex-1 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <GalacticaIcon className="w-12 h-12 text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Galactica
            </h1>
          </div>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            A prototype platform visualizing the Medallion Architecture on
            Firebase with integrated AI-powered analytics.
          </p>
        </div>
        <div className="absolute top-4 right-4">
          <Auth />
        </div>
      </header>

      <div className="space-y-12 md:space-y-16">
        <DataFlowVisualization />
        <LlmInteraction />
      </div>
    </main>
  );
}
