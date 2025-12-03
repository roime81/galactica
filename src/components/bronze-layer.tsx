'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FileJson, Bot, Upload, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const sampleJson = JSON.stringify(
  {
    id: 1,
    timestamp: '2025-12-03T08:41:40.621Z',
    device_id: 'SENSOR-2',
    temperature: '32.88',
    status: 'OK',
    raw_message: 'heartbeat',
  },
  null,
  2
);

export function BronzeLayer() {
  const [activeSource, setActiveSource] = useState('manual');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileJson className="h-5 w-5" />
            Ingestion Source
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={activeSource === 'manual' ? 'secondary' : 'ghost'}
            className="w-full justify-start text-left"
            onClick={() => setActiveSource('manual')}
          >
            <FileJson className="mr-2" /> Manual JSON
          </Button>
          <Button
            variant={activeSource === 'iot' ? 'secondary' : 'ghost'}
            className="w-full justify-start text-left"
            onClick={() => setActiveSource('iot')}
          >
            <Bot className="mr-2" /> IoT Stream (Simulated)
          </Button>
          <Button
            variant={activeSource === 'upload' ? 'secondary' : 'ghost'}
            className="w-full justify-start text-left"
            onClick={() => setActiveSource('upload')}
          >
            <Upload className="mr-2" /> File Upload
          </Button>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Raw Data Lake (Bronze)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Settings2 className="h-5 w-5 text-primary" />
              Ingestion Configuration
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <Label htmlFor="batch-id">Batch Identifier</Label>
                <Input id="batch-id" defaultValue="BATCH-2025" />
              </div>
              <div className="flex items-end pb-2 space-x-2">
                <Checkbox id="validate-schema" defaultChecked />
                <Label htmlFor="validate-schema">Validate Schema on Ingest</Label>
              </div>
            </div>
          </div>
          <div>
            <Textarea
              readOnly
              className="h-64 font-mono text-xs bg-muted"
              value={sampleJson}
            />
          </div>
          <div className="flex justify-end">
            <Button>Ingest Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
