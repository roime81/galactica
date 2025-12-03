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
import { Progress } from '@/components/ui/progress';
import {
  Medal,
  Table,
  Database,
  Search,
  History,
  CheckCircle,
} from 'lucide-react';

const datasets = [
  {
    name: 'silver_device_metrics',
    description: 'Cleaned and structured IoT sensor data, ready for analysis.',
    records: 1523,
    quality: 98,
    lastRefresh: '2023-11-10 08:00 UTC',
    status: 'Validated',
  },
  {
    name: 'silver_user_activity',
    description: 'Aggregated user interaction events from the application.',
    records: 12450,
    quality: 95,
    lastRefresh: '2023-11-10 09:15 UTC',
    status: 'Validated',
  },
];

export function SilverLayer() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Medal className="h-6 w-6 text-slate-500" />
          Silver Layer: Curated & Cleansed Data
        </h2>
        <p className="text-muted-foreground">
          Datasets that have been cleaned, transformed, and validated.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {datasets.map((dataset) => (
          <Card key={dataset.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Database className="h-5 w-5 text-primary" />
                  {dataset.name}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="text-green-600 border-green-600"
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {dataset.status}
                </Badge>
              </div>
              <CardDescription>{dataset.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Records</span>
                  <span className="font-semibold text-foreground">
                    {dataset.records.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Refresh</span>
                  <span className="font-semibold text-foreground">
                    {dataset.lastRefresh}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Data Quality</span>
                  <span className="text-sm font-bold text-primary">
                    {dataset.quality}%
                  </span>
                </div>
                <Progress value={dataset.quality} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">
                <History className="mr-2" />
                View Lineage
              </Button>
              <Button>
                <Search className="mr-2" />
                Explore Data
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
