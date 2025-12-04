'use client';

import { useState } from 'react';
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
import { Server, Plug, Cloud, Link, X, ExternalLink, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { useAuth } from '@/firebase';
import { Separator } from '@/components/ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';

type DataSource = {
  name: string;
  icon: React.ReactNode;
  description: string;
  status: 'Connected' | 'Not Connected';
  statusVariant: 'default' | 'destructive';
  action: 'Manage' | 'Connect';
  consoleUrl?: (projectId?: string) => string;
};

const dataSources: DataSource[] = [
  {
    name: 'Firebase Firestore',
    icon: <Cloud className="h-8 w-8 text-orange-400" />,
    description: 'Scalable NoSQL cloud database to store and sync data.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
    consoleUrl: (projectId) => `https://console.firebase.google.com/project/${projectId}/firestore`,
  },
  {
    name: 'Google BigQuery',
    icon: <Server className="h-8 w-8 text-blue-500" />,
    description: 'Serverless data warehouse for analytics at any scale.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
    consoleUrl: (projectId) => `https://console.cloud.google.com/bigquery?project=${projectId}`,
  },
  {
    name: 'Google Cloud Storage',
    icon: <Cloud className="h-8 w-8 text-green-500" />,
    description: 'Object storage for companies of all sizes.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
    consoleUrl: (projectId) => `https://console.cloud.google.com/storage/browser?project=${projectId}`,
  },
  {
    name: 'Generic REST API',
    icon: <Link className="h-8 w-8 text-gray-400" />,
    description: 'Connect to any external data source via a REST API.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
  },
];

export function DataSourceLayer() {
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const auth = useAuth();
  const projectId = auth?.app?.options?.projectId;

  const handleManageClick = (source: DataSource) => {
    setSelectedSource(source);
  }

  const renderSheetContent = () => {
    if (!selectedSource) return null;

    if (selectedSource.name === 'Generic REST API') {
        return (
             <>
                <SheetHeader>
                    <div className='flex items-center gap-4 mb-2'>
                         {selectedSource.icon}
                        <SheetTitle className="text-xl">Manage {selectedSource.name}</SheetTitle>
                    </div>
                    <SheetDescription>
                    View connection details and manage your integration.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-8 space-y-6">
                    <div className='p-4 rounded-lg border bg-muted/50 space-y-4'>
                        <h3 className='font-semibold text-lg'>Connection Details</h3>
                         <Separator />
                        <div className='space-y-2'>
                            <Label htmlFor='api-endpoint'>API Endpoint</Label>
                            <Input id="api-endpoint" readOnly value="https://api.example.com/data" />
                        </div>
                        <div className='text-sm flex justify-between'>
                            <span className='text-muted-foreground'>Status:</span>
                            <span className='font-semibold text-green-600'>Connected</span>
                        </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                        <Key />
                        Manage API Keys
                    </Button>

                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="destructive">
                        <X className='mr-2' />
                        Disconnect
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </>
        )
    }

    return (
        <>
            <SheetHeader>
                <div className='flex items-center gap-4 mb-2'>
                     {selectedSource.icon}
                    <SheetTitle className="text-xl">Manage {selectedSource.name}</SheetTitle>
                </div>
                <SheetDescription>
                View connection details and manage your integration.
                </SheetDescription>
            </SheetHeader>
            <div className="py-8 space-y-6">
                <div className='p-4 rounded-lg border bg-muted/50 space-y-4'>
                    <h3 className='font-semibold text-lg'>Connection Details</h3>
                     <Separator />
                    <div className='text-sm space-y-2'>
                        <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Project ID:</span>
                            <span className='font-mono text-foreground'>{projectId || 'N/A'}</span>
                        </div>
                         <div className='flex justify-between'>
                            <span className='text-muted-foreground'>Status:</span>
                            <span className='font-semibold text-green-600'>Connected</span>
                        </div>
                    </div>
                </div>
                
                {selectedSource.consoleUrl && (
                     <Button variant="outline" className="w-full" asChild>
                        <a href={selectedSource.consoleUrl(projectId)} target="_blank" rel="noopener noreferrer">
                            <ExternalLink />
                            Open Console
                        </a>
                    </Button>
                )}

            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button variant="destructive">
                    <X className='mr-2' />
                    Disconnect
                    </Button>
                </SheetClose>
            </SheetFooter>
        </>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Data Source Connections
        </h2>
        <p className="text-muted-foreground">
          Manage your integrations with various data services.
        </p>
      </div>
      <Sheet onOpenChange={(isOpen) => !isOpen && setSelectedSource(null)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((source) => (
            <Card key={source.name} className="flex flex-col">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center gap-4">
                  {source.icon}
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                </div>
                <Badge
                  variant={
                    source.status === 'Connected' ? 'secondary' : 'outline'
                  }
                  className={cn(
                    source.status === 'Connected' &&
                      'text-green-600 border-green-600'
                  )}
                >
                  {source.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{source.description}</p>
              </CardContent>
              <CardFooter>
                 <SheetTrigger asChild>
                    <Button
                      className="w-full"
                      onClick={() => handleManageClick(source)}
                    >
                      <Plug className="mr-2 h-4 w-4" />
                      {source.action}
                    </Button>
                  </SheetTrigger>
              </CardFooter>
            </Card>
          ))}
        </div>
        <SheetContent>
            {renderSheetContent()}
        </SheetContent>
      </Sheet>
    </div>
  );
}
