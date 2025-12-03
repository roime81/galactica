'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  PlusCircle,
  Share2,
  Key,
  ExternalLink,
  BarChart,
} from 'lucide-react';
import Image from 'next/image';

const dashboards = [
  {
    name: 'Q1 Sales Performance',
    tool: 'Power BI',
    toolIcon: '/powerbi.svg',
    description: 'Tracks quarterly sales metrics and regional performance.',
    lastSynced: '2023-11-10 14:00 UTC',
    owner: 'Sales Team',
  },
  {
    name: 'Website Traffic Analysis',
    tool: 'Qlik Sense',
    toolIcon: '/qlik.svg',
    description: 'Monitors user engagement and traffic sources for the company website.',
    lastSynced: '2023-11-11 09:00 UTC',
    owner: 'Marketing',
  },
  {
    name: 'Product Usage Funnel',
    tool: 'Tableau',
    toolIcon: '/tableau.svg',
    description: 'Visualizes user progression through the product signup and activation funnel.',
    lastSynced: '2023-11-11 11:30 UTC',
    owner: 'Product Team',
  },
];

export function DashboardLayer() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            Dashboards &amp; Analytics
          </h2>
          <p className="text-muted-foreground">
            Connect your Gold-layer datasets to third-party BI tools via secure APIs.
          </p>
        </div>
        <Button size="lg">
          <PlusCircle className="mr-2" />
          Create New Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dash) => (
          <Card key={dash.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                    <Image src={dash.toolIcon} alt={`${dash.tool} logo`} width={32} height={32} />
                    <CardTitle className="text-lg">{dash.name}</CardTitle>
                </div>
                <Badge variant="outline">{dash.tool}</Badge>
              </div>
              <CardDescription>{dash.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
               <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Last Synced:</span>
                  <span className="font-semibold text-foreground">
                    {dash.lastSynced}
                  </span>
                </div>
                 <div className="flex justify-between">
                  <span>Owner:</span>
                  <span className="font-semibold text-foreground">
                    {dash.owner}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button variant="outline">
                <Key />
                Manage API
              </Button>
              <Button>
                <ExternalLink />
                View Dashboard
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
