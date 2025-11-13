import { SignupForm } from '@/components/auth/signup-form';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-foreground">
              GreenPulse Cloud
            </h1>
          </Link>
          <p className="text-muted-foreground">
            Create an account to get started
          </p>
        </div>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
