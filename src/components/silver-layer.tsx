'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Medal } from 'lucide-react';

export function SilverLayer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Medal className="h-5 w-5" />
          Silver Layer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the Silver Layer component.</p>
      </CardContent>
    </Card>
  );
}
