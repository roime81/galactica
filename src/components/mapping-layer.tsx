'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Settings, Code, CheckCircle, Database } from 'lucide-react';

const sourceSchema = [
  { name: 'device_id', type: 'string' },
  { name: 'temperature', type: 'string' },
  { name: 'timestamp', type: 'datetime' },
  { name: 'status', type: 'string' },
  { name: 'raw_message', type: 'string' },
];

const destinationSchema = [
  { name: 'sensorId', type: 'string' },
  { name: 'temp_celsius', type: 'float' },
  { name: 'event_time', type: 'timestamp' },
  { name: 'is_ok', type: 'boolean' },
];

export function MappingLayer() {
  const [transformationType, setTransformationType] = useState('visual');
  const query = `SELECT
  device_id AS sensorId,
  CAST(temperature AS FLOAT) AS temp_celsius,
  timestamp AS event_time,
  status = 'OK' AS is_ok
FROM
  bronze_iot_data;`;

  return (
    <div className="space-y-6">
       <div>
            <h2 className="text-2xl font-bold tracking-tight">Data Mapping & Transformation</h2>
            <p className="text-muted-foreground">Define how raw data from the Bronze layer is cleaned, transformed, and structured for the Silver layer.</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Source and Destination Cards */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className='flex items-center gap-2'><Database className='h-5 w-5 text-amber-600'/> Source: Bronze Layer</CardTitle>
            <CardDescription>Raw ingested data</CardDescription>
          </CardHeader>
          <CardContent>
            <Select defaultValue="bronze_iot_data">
              <SelectTrigger>
                <SelectValue placeholder="Select source table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bronze_iot_data">bronze_iot_data</SelectItem>
                <SelectItem value="bronze_user_logs" disabled>bronze_user_logs</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4 space-y-2 rounded-lg border bg-muted/50 p-4">
              <h4 className="font-semibold">Schema</h4>
              {sourceSchema.map((field) => (
                <div key={field.name} className="flex justify-between items-center text-sm">
                  <span>{field.name}</span>
                  <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{field.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-1 flex items-center justify-center self-center h-full">
            <ArrowRight className="h-10 w-10 text-muted-foreground hidden lg:block" />
        </div>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className='flex items-center gap-2'><Database className='h-5 w-5 text-slate-500'/> Destination: Silver Layer</CardTitle>
            <CardDescription>Cleaned & structured data</CardDescription>
          </CardHeader>
          <CardContent>
            <Select defaultValue="silver_device_metrics">
              <SelectTrigger>
                <SelectValue placeholder="Select destination table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="silver_device_metrics">silver_device_metrics</SelectItem>
              </SelectContent>
            </Select>
             <div className="mt-4 space-y-2 rounded-lg border bg-muted/50 p-4">
               <h4 className="font-semibold">Schema</h4>
              {destinationSchema.map((field) => (
                <div key={field.name} className="flex justify-between items-center text-sm">
                  <span>{field.name}</span>
                  <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{field.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transformation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5" />
            Transformation Logic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={transformationType} onValueChange={setTransformationType} className="w-full">
            <TabsList>
              <TabsTrigger value="visual">Visual Mapping</TabsTrigger>
              <TabsTrigger value="sql">SQL Editor</TabsTrigger>
            </TabsList>
            <TabsContent value="visual" className="mt-4 p-4 border rounded-md bg-muted/20">
               <div className="space-y-4">
                {sourceSchema.map((sourceField, index) => {
                  const destField = destinationSchema[index];
                  if (!destField) return null;
                  return (
                    <div key={sourceField.name} className="flex items-center justify-between gap-4 p-2 rounded-md ">
                      <div className='flex items-center gap-2'>
                        <div className="text-sm font-medium w-36 text-right">{sourceField.name}</div>
                        <div className="text-xs font-mono text-muted-foreground">({sourceField.type})</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <div className='flex items-center gap-2'>
                        <div className="text-sm font-medium w-36">{destField.name}</div>
                         <div className="text-xs font-mono text-muted-foreground">({destField.type})</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="sql" className="mt-4">
              <div className="relative">
                <Code className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
                <Textarea
                  className="pl-10 font-mono text-sm bg-muted"
                  rows={10}
                  defaultValue={query}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className='flex justify-end'>
            <Button>
                <CheckCircle className='mr-2' />
                Apply Transformation
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
