
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
  Users,
  ShieldCheck,
  Map,
  Share2,
  Cable,
  TrendingUp,
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
            title="Data Source"
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
            title="Ingestion"
            description="Via Cloud Functions & Storage."
          />
          <Connector />
           <FlowStep
            icon={<Map className="w-8 h-8 text-primary" />}
            title="Mapping"
            description="Schema definition and transformation."
          />
          <Connector />
           <FlowStep
            icon={<ShieldCheck className="w-8 h-8 text-primary" />}
            title="Testing"
            description="Data validation and quality checks."
          />
          <Connector />
          <FlowStep
            icon={<BronzeIcon className="w-8 h-8 text-primary" />}
            title="Bronze"
            description="Raw, validated data stored."
          />
          <Connector />
          <FlowStep
            icon={<SilverIcon className="w-8 h-8 text-primary" />}
            title="Silver"
            description="Curated and enriched data."
          />
          <Connector />
          <FlowStep
            icon={<GoldIcon className="w-8 h-8 text-primary" />}
            title="Gold"
            description="Aggregated for analytics."
          />
          <Connector />
          <FlowStep
            icon={<Users className="w-8 h-8 text-accent" />}
            title="Data Consumerization"
            description="BI, Analytics, and AI insights."
          />
          <Connector />
           <FlowStep
            icon={<TrendingUp className="w-8 h-8 text-primary" />}
            title="End of Journey"
            description="Actionable business outcomes."
          />
        </div>
      </CardContent>
    </Card>
  );
}
