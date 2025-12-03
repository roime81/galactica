'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TestTube2, CheckCircle, AlertTriangle, Play, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputData = [
    { device_id: 'SENSOR-2', temperature: '32.88', timestamp: '2025-12-03T08:41:40Z' },
    { device_id: 'SENSOR-3', temperature: 'null', timestamp: '2025-12-03T08:42:10Z' },
    { device_id: 'SENSOR-2', temperature: '33.15', timestamp: '2025-12-03T08:42:40Z' },
];

const outputData = [
    { sensorId: 'SENSOR-2', temp_celsius: 32.88, event_time: '2025-12-03T08:41:40Z', is_ok: true },
    { sensorId: 'SENSOR-3', temp_celsius: null, event_time: '2025-12-03T08:42:10Z', is_ok: false },
    { sensorId: 'SENSOR-2', temp_celsius: 33.15, event_time: '2025-12-03T08:42:40Z', is_ok: true },
];

const validationResults = [
    { check: 'Schema validation', status: 'Passed', details: 'Output matches target Silver schema.' },
    { check: '`temp_celsius` not null', status: 'Warning', details: '1 of 3 records has a null temperature.' },
    { check: '`event_time` is valid timestamp', status: 'Passed', details: 'All timestamps are correctly formatted.' },
    { check: '`sensorId` is not empty', status: 'Passed', details: 'All records have a sensor ID.' },
];

export function TestingLayer() {
  return (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold tracking-tight">Data Transformation Testing</h2>
            <p className="text-muted-foreground">Verify your data mappings and transformations before deploying to the Silver layer.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">Test Configuration</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                        <label htmlFor="pipeline-select" className="text-sm font-medium">Transformation Pipeline</label>
                        <Select defaultValue="bronze_to_silver_iot">
                            <SelectTrigger id="pipeline-select">
                                <SelectValue placeholder="Select a pipeline" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bronze_to_silver_iot">Bronze IoT → Silver Metrics</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <label htmlFor="data-sample-select" className="text-sm font-medium">Data Sample</label>
                         <Select defaultValue="latest_ingestion">
                            <SelectTrigger id="data-sample-select">
                                <SelectValue placeholder="Select data sample" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="latest_ingestion">Latest Ingestion Batch</SelectItem>
                                <SelectItem value="random_sample" disabled>Random 100 Records</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button size="lg">
                        <Play className="mr-2"/>
                        Run Test
                    </Button>
                </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Input: Raw Data (Bronze)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>device_id</TableHead>
                                <TableHead>temperature</TableHead>
                                <TableHead>timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inputData.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{row.device_id}</TableCell>
                                    <TableCell>{row.temperature}</TableCell>
                                    <TableCell>{row.timestamp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Output: Transformed Data (Silver)</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>sensorId</TableHead>
                                <TableHead>temp_celsius</TableHead>
                                <TableHead>is_ok</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {outputData.map((row, i) => (
                                <TableRow key={i} className={cn(!row.temp_celsius && 'bg-yellow-100/50 dark:bg-yellow-900/20')}>
                                    <TableCell>{row.sensorId}</TableCell>
                                    <TableCell>{row.temp_celsius ?? 'NULL'}</TableCell>
                                    <TableCell>{String(row.is_ok)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <ClipboardCheck className="h-5 w-5" />
                    Validation Results
                </CardTitle>
                <CardDescription>
                    Test completed. 2/2 checks passed, 1 with warnings.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Data Quality Check</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {validationResults.map((result) => (
                            <TableRow key={result.check}>
                                <TableCell className="font-medium">{result.check}</TableCell>
                                <TableCell>
                                    <Badge variant={result.status === 'Passed' ? 'secondary' : 'destructive'} className={cn(result.status === 'Passed' && 'text-green-600 border-green-600', result.status === 'Warning' && 'text-yellow-600 border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20')}>
                                        {result.status === 'Passed' && <CheckCircle className="mr-2" />}
                                        {result.status === 'Warning' && <AlertTriangle className="mr-2" />}
                                        {result.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{result.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
