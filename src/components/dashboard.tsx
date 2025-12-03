import { BronzeLayer } from "@/components/bronze-layer";
import { Auth } from "./auth";
import { GalacticaIcon } from "@/components/icons";
import { PipelineStepper } from "@/components/pipeline-stepper";

export function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <GalacticaIcon className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-semibold">Galactica</h1>
        </div>
        <Auth />
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PipelineStepper currentStep="Bronze" />
          <div className="mt-8">
            <BronzeLayer />
          </div>
        </div>
      </main>
    </div>
  );
}
