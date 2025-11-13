'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Leaf, Map, Zap, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

const features = [
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Renewable Energy GeoMap',
    description:
      'Visualize regions with high renewable energy potential using our interactive GeoMap.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Carbon Emission Reports',
    description:
      'Generate real-time carbon emission reports based on your energy consumption.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'AI-Driven Insights',
    description:
      'Gain actionable insights and analytics to drive local-level implementation.',
  },
];

export function HomeComponent() {
  const { user, loading } = useAuth();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-foreground">
            GreenPulse Cloud
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          {!loading && !user && (
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
        <Button asChild>
          <Link href="/dashboard">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline text-foreground tracking-tight">
              Accelerate a Sustainable Future
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
              GreenPulse Cloud is an AI-powered platform to accelerate renewable
              energy deployment and provide transparent carbon tracking.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Explore the Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
                Powerful Features for a Greener Planet
              </h3>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Our platform provides the tools and insights needed to make a
                real impact on renewable energy goals.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline mt-4">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} GreenPulse Cloud. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
