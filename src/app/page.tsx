import { Button } from "@/components/ui/button";
import { FlatCard } from "@/components/flat-card";
import { flats } from "@/lib/data";
import Link from 'next/link';
import { ArrowRight, Users } from "lucide-react";

export default function LandingPage() {
  const featuredFlats = flats.filter(f => f.isFeatured).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-16 pb-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Find Your Safe Space
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover secure and verified housing, reviewed by a community of female students you can trust.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/flats">
                Explore Listings <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/roommates">
                Find Roommates <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Stays</h2>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked and verified for your safety and comfort.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFlats.map((flat) => (
              <FlatCard key={flat.id} flat={flat} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
                <Link href="/flats">
                    View All Listings <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
