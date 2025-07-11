
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { ArrowRight, Search, ShieldCheck, Star, CircleCheck, TrendingUp } from "lucide-react";
import { flats } from "@/lib/data";
import { FlatCard } from "@/components/flat-card";



const stats = [
  {
    value: "500+",
    label: "Verified Listings",
    icon: ShieldCheck,
    color: "text-pink-500",
    bgColor: "bg-pink-100",
  },
  {
    value: "1200+",
    label: "Student Reviews",
    icon: Star,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    value: "4.6",
    label: "Avg Safety Rating",
    icon: CircleCheck,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
    icon: TrendingUp,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
];

export default function LandingPage() {
  const featuredFlats = flats.filter(f => f.isFeatured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#2a0d45] to-[#4c1d95]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="min-h-[60vh] md:min-h-[50vh] flex flex-col justify-center items-center text-center pt-20 pb-12 text-white">
            <h5 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Real experiences. Trusted spaces.
            </h5>
            <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
              Discover trusted accommodation with real reviews from female students. Your safety and comfort are our top priorities.
            </p>
            <div className="mt-8 w-full max-w-2xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search by location, area, or property name..."
                  className="w-full h-14 pl-12 pr-4 rounded-full text-base"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              </div>
              <div className="mt-4 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-purple-300">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400"></span>Verified Properties</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400"></span>Real Student Reviews</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400"></span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 flex items-center gap-4 shadow-lg rounded-2xl">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
       {/* Featured Listings Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Stays</h2>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked and verified for your safety and comfort.</p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFlats.map((flat) => (
              <FlatCard key={flat.id} flat={flat} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
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
