import { LoginForm } from '@/components/auth/login-form';
import { CloudSun } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
                <CloudSun className="h-10 w-10 text-primary" />
                <h1 className="text-3xl font-bold font-headline text-foreground">
                    Weather API
                </h1>
            </Link>
          <p className="text-muted-foreground">
            Sign in to access your dashboard
          </p>
        </div>
        <LoginForm />
         <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
      </div>
    </div>
  );
}
