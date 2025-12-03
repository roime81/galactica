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
  Gem,
  PlusCircle,
  BarChart3,
  Users,
  TrendingUp,
  LayoutDashboard,
  Code2,
} from 'lucide-react';

const useCases = [
  {
    name: 'Quarterly Sales Analytics',
    icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
    description:
      'Aggregated sales data for quarterly business reviews and performance analysis.',
    lastUpdated: '2023-11-10 10:00 UTC',
    sources: ['silver_device_metrics', 'silver_user_activity'],
    action: 'View Dashboard',
    actionIcon: <LayoutDashboard />,
  },
  {
    name: 'Customer Churn Prediction',
    icon: <Users className="h-8 w-8 text-red-500" />,
    description:
      'A dataset prepared for ML models to predict customer churn based on activity.',
    lastUpdated: '2023-11-09 18:30 UTC',
    sources: ['silver_user_activity'],
    action: 'Explore API',
    actionIcon: <Code2 />,
  },
  {
    name: 'Real-time Anomaly Detection',
    icon: <TrendingUp className="h-8 w-8 text-green-500" />,
    description:
      'Live-stream of processed sensor data for monitoring and anomaly detection.',
    lastUpdated: 'Live',
    sources: ['silver_device_metrics'],
    action: 'View Dashboard',
    actionIcon: <LayoutDashboard />,
  },
];

export function GoldLayer() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Gem className="h-6 w-6 text-amber-500" />
            Gold Layer: Business-Ready Use Cases
          </h2>
          <p className="text-muted-foreground">
            Curated, aggregated datasets ready for analytics, ML, and application use.
          </p>
        </div>
        <Button size="lg">
          <PlusCircle className="mr-2" />
          Create New Use Case
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase) => (
          <Card key={useCase.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                {useCase.icon}
                <CardTitle className="text-lg">{useCase.name}</CardTitle>
              </div>
              <CardDescription>{useCase.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="font-semibold text-foreground">
                    {useCase.lastUpdated}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Data Sources:</span>
                   <span className="font-semibold text-foreground">
                    {useCase.sources.length}
                  </span>
                </div>
              </div>
               <div className='flex flex-wrap gap-1'>
                    {useCase.sources.map(source => <Badge key={source} variant='secondary'>{source}</Badge>)}
               </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {useCase.actionIcon}
                {useCase.action}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
