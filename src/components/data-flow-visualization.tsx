import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  Database,
  FileText,
  UploadCloud,
  Cpu,
  BookOpen,
  Layers3,
  Cable,
  Share2,
} from "lucide-react";
import { BronzeIcon, SilverIcon, GoldIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

const FlowStep = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <Card className="flex-1 min-w-[280px] text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="items-center">
      <div className="p-3 bg-secondary rounded-full mb-2">{icon}</div>
      <CardTitle className="font-headline">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
  </Card>
);

const Connector = () => (
  <div className="flex items-center justify-center min-h-16 text-muted-foreground/60 transform md:rotate-0 rotate-90">
    <ChevronRight className="w-10 h-10" />
  </div>
);

export function DataFlowVisualization() {
  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl">End-to-End Data Flow</CardTitle>
        <CardDescription>
          Illustrating the journey of data through the Medallion Architecture.
        </CardDescription>
        <div className="pt-2">
            <Badge variant="outline">Use Case: Hospital Patient Data</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-stretch justify-center gap-4">
          <FlowStep
            icon={<Share2 className="w-8 h-8 text-primary" />}
            title="Data Sources"
            description="Connecting to heterogeneous sources."
          >
            <div className="flex justify-center gap-4 text-muted-foreground">
              <div className="flex flex-col items-center gap-1">
                <FileText className="w-6 h-6" /> <span className="text-xs">Files</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Cable className="w-6 h-6" /> <span className="text-xs">APIs</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Database className="w-6 h-6" /> <span className="text-xs">DBs</span>
              </div>
            </div>
          </FlowStep>
          <Connector />
          <FlowStep
            icon={<UploadCloud className="w-8 h-8 text-primary" />}
            title="Ingestion Layer"
            description="Via Cloud Functions & Storage."
          />
          <Connector />
          <FlowStep
            icon={<BronzeIcon className="w-8 h-8 text-primary" />}
            title="Bronze Layer"
            description="Raw data in Cloud Storage."
          />
          <Connector />
          <FlowStep
            icon={<SilverIcon className="w-8 h-8 text-primary" />}
            title="Silver Layer"
            description="Curated data in Firestore."
          />
          <Connector />
          <FlowStep
            icon={<GoldIcon className="w-8 h-8 text-primary" />}
            title="Gold Layer"
            description="Aggregated data in Firestore."
          />
          <Connector />
          <FlowStep
            icon={<Cpu className="w-8 h-8 text-accent" />}
            title="Analytics & AI"
            description="LLM-powered Q&A & summaries."
          />
          <Connector />
          <FlowStep
            icon={<BookOpen className="w-8 h-8 text-primary" />}
            title="Data Catalog"
            description="Sync with OpenMetadata/DataHub."
          />
        </div>
      </CardContent>
    </Card>
  );
}
