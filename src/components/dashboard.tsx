import { BronzeLayer } from "@/components/bronze-layer";
import { PipelineStepper } from "@/components/pipeline-stepper";
import { Auth } from "./auth";

export function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-border">
        <h1 className="text-xl font-bold">Galactica</h1>
        <Auth />
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <PipelineStepper />
        <div className="mt-4">
          <span className="text-sm text-muted-foreground">Pipeline &gt; </span>
          <span className="text-sm font-medium">BRONZE Layer</span>
        </div>
        <div className="mt-6">
          <BronzeLayer />
        </div>
      </main>
    </div>
  );
}
