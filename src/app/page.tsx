import { HomeComponent } from '@/components/layout/home-page';
import { AuthProvider } from '@/hooks/use-auth';

export default function Home() {
  return (
    <AuthProvider>
      <HomeComponent />
    </AuthProvider>
  );
}
