import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Shield, Star, CheckCircle, TrendingUp } from "lucide-react";

const stats = [
    { icon: Shield, value: "500+", label: "Verified Listings", color: "text-chart-1", bgColor: "bg-chart-1/20" },
    { icon: Star, value: "1200+", label: "Student Reviews", color: "text-chart-2", bgColor: "bg-chart-2/20" },
    { icon: CheckCircle, value: "4.6", label: "Avg Safety Rating", color: "text-chart-3", bgColor: "bg-chart-3/20" },
    { icon: TrendingUp, value: "95%", label: "Satisfaction Rate", color: "text-chart-4", bgColor: "bg-chart-4/20" },
];

export default function LandingPage() {
  return (
    <>
      <div className="relative">
        <section className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white pt-36 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Safe, Verified Housing for<br />Women Students
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Discover trusted accommodation with real reviews from female students, for female students.
            </p>
            <p className="mt-2 text-lg text-white/80">Your safety and comfort are our top priorities</p>
            
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search by location, area, or property name..."
                  className="w-full h-16 pl-6 pr-16 rounded-full bg-white text-card-foreground placeholder:text-muted-foreground border-transparent focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full h-12 w-12">
                  <Search className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-white/80">
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Verified Properties</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>Real Student Reviews</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary mr-2"></span>24/7 Support</span>
            </div>
          </div>
        </section>
      </div>

      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-0 bg-card">
                <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.bgColor}`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <p className="text-4xl font-bold text-card-foreground">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
