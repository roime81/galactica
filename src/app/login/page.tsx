'use client';

import { LoginForm } from '@/components/login-form';
import { LakeIcon } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center gap-4 mb-8">
          <LakeIcon className="w-12 h-12 text-primary" />
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Galactica
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
