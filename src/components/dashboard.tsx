import { DataFlowVisualization } from "@/components/data-flow-visualization";
import { LlmInteraction } from "@/components/llm-interaction";

export function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          DataFlow AI Lake
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          A prototype Data Lake platform visualizing the Medallion Architecture
          on Firebase with integrated AI-powered analytics.
        </p>
      </header>

      <div className="space-y-12 md:space-y-16">
        <DataFlowVisualization />
        <LlmInteraction />
      </div>
    </main>
  );
}
