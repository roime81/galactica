
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
import { Server, Plug, Cloud, Link, X, ExternalLink, Key, Upload, Share2, Sparkles, FileUp, Settings, HardDrive, Database } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { useAuth } from '@/firebase';
import { Separator } from '@/components/ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


type DataSource = {
  name: string;
  icon: React.ReactNode;
  description: string;
  status: 'Connected' | 'Not Connected';
  statusVariant: 'default' | 'destructive';
  action: 'Manage' | 'Connect';
  consoleUrl?: (projectId?: string) => string;
  isGoogleService?: boolean;
};

const initialDataSources: DataSource[] = [
  {
    name: 'Firebase Firestore',
    icon: <Cloud className="h-8 w-8 text-orange-400" />,
    description: 'Scalable NoSQL cloud database to store and sync data.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
    consoleUrl: (projectId) => `https://console.firebase.google.com/project/${projectId}/firestore`,
    isGoogleService: true,
  },
  {
    name: 'Google BigQuery',
    icon: <Server className="h-8 w-8 text-blue-500" />,
    description: 'Serverless data warehouse for analytics at any scale.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
    consoleUrl: (projectId) => `https://console.cloud.google.com/bigquery?project=${projectId}`,
     isGoogleService: true,
  },
  {
    name: 'Google Cloud Storage',
    icon: <Cloud className="h-8 w-8 text-green-500" />,
    description: 'Object storage for companies of all sizes.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
    consoleUrl: (projectId) => `https://console.cloud.google.com/storage/browser?project=${projectId}`,
     isGoogleService: true,
  },
    {
    name: 'Amazon S3',
    icon: <HardDrive className="h-8 w-8 text-orange-600" />,
    description: 'Scalable object storage for data backup, archival, and analytics.',
    status: 'Not Connected',
    statusVariant: 'destructive',
    action: 'Connect',
  },
  {
    name: 'Azure Blob Storage',
    icon: <HardDrive className="h-8 w-8 text-blue-400" />,
    description: 'Massively scalable object storage for unstructured data.',
    status: 'Not Connected',
    statusVariant: 'destructive',
    action: 'Connect',
  },
  {
    name: 'Generic REST API',
    icon: <Link className="h-8 w-8 text-gray-400" />,
    description: 'Connect to any external data source via a REST API.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
  },
  {
    name: 'Manual Upload',
    icon: <Upload className="h-8 w-8 text-gray-500" />,
    description: 'Upload data files directly from your computer.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
  },
  {
    name: 'Apache Kafka',
    icon: <Share2 className="h-8 w-8 text-black dark:text-white" />,
    description: 'Connect to a real-time data streaming platform.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
  },
    {
    name: 'Apache Spark',
    icon: <Sparkles className="h-8 w-8 text-orange-500" />,
    description: 'Connect to a large-scale data processing engine.',
    status: 'Connected',
    statusVariant: 'default',
    action: 'Manage',
  },
  {
    name: 'Amazon Redshift',
    icon: <Server className="h-8 w-8 text-red-600" />,
    description: 'Cloud data warehouse for large-scale data analytics.',
    status: 'Not Connected',
    statusVariant: 'destructive',
    action: 'Connect',
  },
  {
    name: 'Azure Synapse',
    icon: <Server className="h-8 w-8 text-sky-500" />,
    description: 'Limitless analytics service with data integration and warehousing.',
    status: 'Not Connected',
    statusVariant: 'destructive',
    action: 'Connect',
  },
  {
    name: 'Azure Cosmos DB',
    icon: <Database className="h-8 w-8 text-indigo-500" />,
    description: 'Globally distributed, multi-model NoSQL database service.',
    status: 'Not Connected',
    statusVariant: 'destructive',
    action: 'Connect',
  },
];

const GoogleServiceConnection = ({ sourceName, onConnect }: { sourceName: string, onConnect: () => void }) => {
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: 'Connection Successful',
      description: `You have successfully connected to ${sourceName}.`,
    });
    onConnect();
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow p-4 rounded-lg border bg-muted/50 text-center flex flex-col justify-center items-center'>
        <p className='text-sm text-muted-foreground mb-4'>
          Click the button below to connect to {sourceName} using your current Google Cloud project context.
        </p>
      </div>
      <SheetFooter className="mt-8">
        <SheetClose asChild>
            <Button variant="secondary" type="button">
              Cancel
            </Button>
        </SheetClose>
        <Button onClick={handleConnect}>
          <Plug className="mr-2 h-4 w-4" />
          Connect
        </Button>
      </SheetFooter>
    </div>
  );
};

const ConnectionForm = ({ sourceName, onConnect }: { sourceName: string, onConnect: () => void }) => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<Record<string, string>>({});

  let fields: {id: string, label: string, type: string, placeholder: string}[] = [];

  switch (sourceName) {
    case 'Amazon S3':
      fields = [
        { id: 's3-bucket-name', label: 'Bucket Name', type: 'text', placeholder: 'my-data-bucket' },
        { id: 's3-access-key', label: 'Access Key ID', type: 'text', placeholder: 'AKIA...' },
        { id: 's3-secret-key', label: 'Secret Access Key', type: 'password', placeholder: '••••••••••••••••' },
      ];
      break;
    case 'Azure Blob Storage':
      fields = [
        { id: 'azure-storage-account', label: 'Storage Account Name', type: 'text', placeholder: 'mystorageaccount' },
        { id: 'azure-connection-string', label: 'Connection String', type: 'password', placeholder: 'DefaultEndpointsProtocol=https...' },
      ];
      break;
    case 'Amazon Redshift':
      fields = [
        { id: 'redshift-host', label: 'Cluster Host', type: 'text', placeholder: 'my-cluster.random-chars.us-east-1.redshift.amazonaws.com' },
        { id: 'redshift-db', label: 'Database Name', type: 'text', placeholder: 'dev' },
        { id: 'redshift-user', label: 'Database User', type: 'text', placeholder: 'awsuser' },
        { id: 'redshift-password', label: 'Password', type: 'password', placeholder: '••••••••••••••••' },
      ];
      break;
    case 'Azure Synapse':
      fields = [
        { id: 'synapse-endpoint', label: 'SQL Endpoint', type: 'text', placeholder: 'myworkspace-ondemand.sql.azuresynapse.net' },
        { id: 'synapse-db', label: 'Database Name', type: 'text', placeholder: 'SQLPOOL1' },
        { id: 'synapse-user', label: 'Username', type: 'text', placeholder: 'sqladminuser' },
        { id: 'synapse-password', label: 'Password', type: 'password', placeholder: '••••••••••••••••' },
      ];
      break;
    case 'Azure Cosmos DB':
       fields = [
        { id: 'cosmos-endpoint', label: 'Endpoint URI', type: 'text', placeholder: 'https://myaccount.documents.azure.com:443/' },
        { id: 'cosmos-key', label: 'Primary Key', type: 'password', placeholder: '••••••••••••••••' },
        { id: 'cosmos-db', label: 'Database Name', type: 'text', placeholder: 'ToDoList' },
      ];
      break;
    default:
      return (
         <div className='p-4 rounded-lg border bg-muted/50 text-center'>
           <p className='text-sm text-muted-foreground'>Connection form not available for this service.</p>
         </div>
      );
  }
  
  const handleInputChange = (id: string, value: string) => {
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = fields.every(field => formState[field.id] && formState[field.id].trim() !== '');

    if (!isFormValid) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields to connect to the data source.',
      });
      return;
    }

    toast({
        title: 'Connection Successful (Simulated)',
        description: `This is a prototype. A real connection to ${sourceName} has not been established.`,
    })

    onConnect();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        {fields.map(field => (
          <div key={field.id} className='space-y-2'>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input 
              id={field.id} 
              type={field.type} 
              placeholder={field.placeholder}
              value={formState[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
          </div>
        ))}
      </div>
      <SheetFooter className="mt-8">
          <SheetClose asChild>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
          </SheetClose>
            <Button type="submit">
                <Plug className="mr-2 h-4 w-4" />
                Connect
              </Button>
      </SheetFooter>
    </form>
  );
};


export function DataSourceLayer() {
  const [dataSources, setDataSources] = useState<DataSource[]>(initialDataSources);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [isClusterSettingsOpen, setIsClusterSettingsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const auth = useAuth();
  const projectId = auth?.app?.options?.projectId;

  const handleManageClick = (source: DataSource) => {
    setSelectedSource(source);
    setIsSheetOpen(true);
  }

  const handleStatusChange = (sourceName: string, status: 'Connected' | 'Not Connected') => {
    setDataSources(prevSources =>
      prevSources.map(s =>
        s.name === sourceName
          ? {
              ...s,
              status,
              action: status === 'Connected' ? 'Manage' : 'Connect',
              statusVariant: status === 'Connected' ? 'default' : 'destructive',
            }
          : s
      )
    );
    setIsSheetOpen(false);
  };


  const renderSheetContent = () => {
    if (!selectedSource) return null;

    if (selectedSource.name === 'Manual Upload') {
       return (
         <>
            <SheetHeader>
                <div className='flex items-center gap-4 mb-2'>
                     {selectedSource.icon}
                    <SheetTitle className="text-xl">Manage {selectedSource.name}</SheetTitle>
                </div>
                <SheetDescription>
                  Upload CSV, JSON, or Parquet files directly.
                </SheetDescription>
            </SheetHeader>
            <div className="py-8 space-y-6">
                <Card className="border-dashed border-2 hover:border-primary transition-colors">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                        <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="font-semibold mb-1">Drag & drop files here</p>
                        <p className="text-muted-foreground text-sm">or</p>
                        <Button variant="outline" className="mt-2">Browse files</Button>
                    </CardContent>
                </Card>
            </div>
            <SheetFooter>
                <Button variant="destructive" onClick={() => handleStatusChange(selectedSource.name, 'Not Connected')}>
                  <X className='mr-2' />
                  Disconnect
                </Button>
            </SheetFooter>
        </>
       )
    }
    
    if (selectedSource.name === 'Apache Kafka') {
        return (
             <>
                <SheetHeader>
                    <div className='flex items-center gap-4 mb-2'>
                         {selectedSource.icon}
                        <SheetTitle className="text-xl">Manage {selectedSource.name}</SheetTitle>
                    </div>
                    <SheetDescription>
                      Configure your Kafka cluster connection.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-8 space-y-6">
                     <div className='p-4 rounded-lg border bg-muted/50 space-y-4'>
                        <h3 className='font-semibold text-lg'>Connection Details</h3>
                         <Separator />
                        <div className='space-y-2'>
                            <Label htmlFor='kafka-brokers'>Bootstrap Brokers</Label>
                            <Input id="kafka-brokers" readOnly value="kafka-broker-1:9092,kafka-broker-2:9092" />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='kafka-topic'>Topic</Label>
                            <Input id="kafka-topic" readOnly value="iot-data-stream" />
                        </div>
                         <div className='text-sm flex justify-between'>
                            <span className='text-muted-foreground'>Status:</span>
                            <span className='font-semibold text-green-600'>Connected</span>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="destructive" onClick={() => handleStatusChange(selectedSource.name, 'Not Connected')}>
                    <X className='mr-2' />
                    Disconnect
                    </Button>
                </SheetFooter>
            </>
        )
    }

    if (selectedSource.name === 'Apache Spark') {
        return (
             <>
                <SheetHeader>
                    <div className='flex items-center gap-4 mb-2'>
                         {selectedSource.icon}
                        <SheetTitle className="text-xl">Manage {selectedSource.name}</SheetTitle>
                    </div>
                    <SheetDescription>
                      Configure your Spark cluster connection.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-8 space-y-6">
                     <div className='p-4 rounded-lg border bg-muted/50 space-y-4'>
                        <h3 className='font-semibold text-lg'>Connection Details</h3>
                         <Separator />
                        <div className='space-y-2'>
                            <Label htmlFor='spark-master'>Master URL</Label>
                            <Input id="spark-master" readOnly value="spark://spark-master:7077" />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='spark-cluster'>Cluster Name</Label>
                            <Input id="spark-cluster" readOnly value="data-processing-cluster" />
                        </div>
                         <div className='text-sm flex justify-between'>
                            <span className='text-muted-foreground'>Status:</span>
                            <span className='font-semibold text-green-600'>Connected</span>
                        </div>
                    </div>
                    <Dialog open={isClusterSettingsOpen} onOpenChange={setIsClusterSettingsOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <Settings className="mr-2" />
                            Manage Cluster Settings
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Spark Cluster Configuration</DialogTitle>
                          <DialogDescription>
                            Adjust the resources allocated to your Spark cluster. Changes will be applied on the next job run.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="dynamic-allocation">Enable Dynamic Allocation</Label>
                            <Switch id="dynamic-allocation" defaultChecked />
                          </div>
                          <Separator />
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="driver-cores">Driver Cores</Label>
                            <Input id="driver-cores" defaultValue="2" className="col-span-1" />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="driver-memory">Driver Memory (GB)</Label>
                            <Input id="driver-memory" defaultValue="4" className="col-span-1" />
                          </div>
                          <Separator />
                           <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="exec-instances">Executor Instances</Label>
                            <Input id="exec-instances" defaultValue="4" className="col-span-1" />
                          </div>
                           <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="exec-cores">Executor Cores</Label>
                            <Input id="exec-cores" defaultValue="4" className="col-span-1" />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="exec-memory">Executor Memory (GB)</Label>
                            <Input id="exec-memory" defaultValue="8" className="col-span-1" />
                          </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => setIsClusterSettingsOpen(false)}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                </div>
                <SheetFooter>
                    <Button variant="destructive" onClick={() => handleStatusChange(selectedSource.name, 'Not Connected')}>
                    <X className='mr-2' />
                    Disconnect
                    </Button>
                </SheetFooter>
            </>
        )
    }


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
                        <Key className="mr-2" />
                        Manage API Keys
                    </Button>

                </div>
                <SheetFooter>
                    <Button variant="destructive" onClick={() => handleStatusChange(selectedSource.name, 'Not Connected')}>
                    <X className='mr-2' />
                    Disconnect
                    </Button>
                </SheetFooter>
            </>
        )
    }

    if (selectedSource.status === 'Not Connected') {
       return (
         <>
            <SheetHeader>
                <div className='flex items-center gap-4 mb-2'>
                     {selectedSource.icon}
                    <SheetTitle className="text-xl">Connect to {selectedSource.name}</SheetTitle>
                </div>
                <SheetDescription>
                  Enter the credentials to configure your connection to this service.
                </SheetDescription>
            </SheetHeader>
            <div className="py-8 flex-grow">
               {selectedSource.isGoogleService ? (
                 <GoogleServiceConnection 
                    sourceName={selectedSource.name} 
                    onConnect={() => handleStatusChange(selectedSource.name, 'Connected')} 
                 />
                ) : (
                  <ConnectionForm 
                    sourceName={selectedSource.name} 
                    onConnect={() => handleStatusChange(selectedSource.name, 'Connected')} 
                  />
                )}
            </div>
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
                            <p className='text-muted-foreground'>Project ID:</p>
                            <p className='font-mono text-foreground'>{projectId || 'N/A'}</p>
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
                            <ExternalLink className="mr-2" />
                            Open Console
                        </a>
                    </Button>
                )}

            </div>
            <SheetFooter>
                <Button variant="destructive" onClick={() => handleStatusChange(selectedSource.name, 'Not Connected')}>
                <X className='mr-2' />
                Disconnect
                </Button>
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
      <Sheet open={isSheetOpen} onOpenChange={(isOpen) => {
          setIsSheetOpen(isOpen);
          if (!isOpen) {
            setSelectedSource(null)
          }
        }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                      'text-green-600 border-green-600',
                    source.status === 'Not Connected' && 'text-red-600 border-red-600'
                  )}
                >
                  {source.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{source.description}</p>
              </CardContent>
              <CardFooter className="grid-cols-1">
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
        <SheetContent className="overflow-y-auto flex flex-col">
            {renderSheetContent()}
        </SheetContent>
      </Sheet>
    </div>
  );
}
