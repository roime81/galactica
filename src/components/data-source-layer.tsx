'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Server, Plug, Cloud, Link } from 'lucide-react';
import { cn } from '@/lib/utils';


const dataSources = [
    {
        name: 'Firebase Firestore',
        icon: <Cloud className="h-8 w-8 text-orange-400" />,
        description: 'Scalable NoSQL cloud database to store and sync data.',
        status: 'Connected',
        statusVariant: 'default',
        action: 'Manage'
    },
    {
        name: 'Google BigQuery',
        icon: <Server className="h-8 w-8 text-blue-500" />,
        description: 'Serverless data warehouse for analytics at any scale.',
        status: 'Not Connected',
        statusVariant: 'destructive',
        action: 'Connect'
    },
    {
        name: 'Google Cloud Storage',
        icon: <Cloud className="h-8 w-8 text-green-500" />,
        description: 'Object storage for companies of all sizes.',
        status: 'Not Connected',
        statusVariant: 'destructive',
        action: 'Connect'
    },
    {
        name: 'Generic REST API',
        icon: <Link className="h-8 w-8 text-gray-400" />,
        description: 'Connect to any external data source via a REST API.',
        status: 'Not Connected',
        statusVariant: 'destructive',
        action: 'Connect'
    },
]

export function DataSourceLayer() {
  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold tracking-tight">Data Source Connections</h2>
            <p className="text-muted-foreground">Manage your integrations with various data services.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataSources.map(source => (
                 <Card key={source.name} className="flex flex-col">
                    <CardHeader className="flex flex-row items-start justify-between">
                        <div className="flex items-center gap-4">
                            {source.icon}
                            <CardTitle className="text-lg">{source.name}</CardTitle>
                        </div>
                        <Badge variant={source.status === 'Connected' ? 'secondary' : 'outline'} className={cn(source.status === 'Connected' && 'text-green-600 border-green-600')}>{source.status}</Badge>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{source.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">
                            <Plug className="mr-2 h-4 w-4" />
                            {source.action}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
