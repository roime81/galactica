'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem } from 'lucide-react';

export function GoldLayer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gem className="h-5 w-5" />
          Gold Layer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the Gold Layer component.</p>
      </CardContent>
    </Card>
  );
}
