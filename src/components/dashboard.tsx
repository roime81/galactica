'use client';

import { useState } from 'react';
import { DataSourceLayer } from '@/components/data-source-layer';
import { BronzeLayer } from '@/components/bronze-layer';
import { SilverLayer } from '@/components/silver-layer';
import { GoldLayer } from '@/components/gold-layer';
import { MappingLayer } from '@/components/mapping-layer';
import { TestingLayer } from '@/components/testing-layer';
import { Auth } from './auth';
import { GalacticaIcon } from '@/components/icons';
import { PipelineStepper } from '@/components/pipeline-stepper';

export function Dashboard() {
  const [currentStep, setCurrentStep] = useState('Ingestion');
  const [isBronzeExpanded, setIsBronzeExpanded] = useState(true);

  const renderContent = () => {
    switch (currentStep) {
      case 'Data Source':
        return <DataSourceLayer />;
      case 'Ingestion':
        return <BronzeLayer />;
      case 'Mapping':
        return <MappingLayer />;
      case 'Testing':
        return <TestingLayer />;
      case 'Silver':
        return <SilverLayer />;
      case 'Gold':
        return <GoldLayer />;
      default:
        return <DataSourceLayer />;
    }
  };

  const handleStepClick = (stepName: string) => {
    setCurrentStep(stepName);
    if (['Ingestion', 'Mapping', 'Testing'].includes(stepName) && !isBronzeExpanded) {
        setIsBronzeExpanded(true);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <GalacticaIcon className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-semibold">Galactica</h1>
        </div>
        <Auth />
      </header>
      <main className="flex flex-1">
        <aside className="w-72 p-4 md:p-6 lg:p-8 border-r border-border">
          <PipelineStepper
            currentStep={currentStep}
            onStepClick={handleStepClick}
            isBronzeExpanded={isBronzeExpanded}
            onBronzeToggle={() => setIsBronzeExpanded(!isBronzeExpanded)}
          />
        </aside>
        <div className="flex-1 p-4 md:p-6 lg:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
