import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { flats } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/star-rating';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Shield, User, Verified, AlertTriangle, Building, DollarSign, Tag, CheckCircle2, ChevronLeft, MapPin, Wifi, ParkingSquare, ShoppingBasket } from 'lucide-react';
import { ReviewSummary } from './review-summary';
import { ReportIncidentCard } from '@/components/report-incident-card';


type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return flats.map((flat) => ({
    id: flat.id.toString(),
  }));
}


export default function FlatDetailPage({ params }: PageProps) {
  const flat = flats.find((f) => f.id === parseInt(params.id));

  if (!flat) {
    notFound();
  }

  const allReviews = flat.landlord.reviews;
  const totalReviews = flat.landlord.reviews.length;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
       <Link href="/flats" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-medium">
        <ChevronLeft className="w-4 h-4" />
        Back to Listings
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Carousel */}
          <Carousel className="w-full mb-8 rounded-lg overflow-hidden shadow-lg">
            <CarouselContent>
              {flat.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video relative">
                    <Image src={img} alt={`${flat.name} - view ${index + 1}`} fill className="object-cover" data-ai-hint="apartment interior" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{flat.name}</CardTitle>
               <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 text-muted-foreground mt-2">
                  <p className="text-xl font-semibold text-primary">₹{flat.price.toLocaleString()}/month</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4"/>
                    <span>{flat.location}</span>
                  </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80 text-sm">
                    <Shield className="w-4 h-4 mr-1.5" />
                    Safety Rating: {flat.safetyRating}/5
                </Badge>
                <div className="flex items-center gap-2">
                    <StarRating rating={flat.landlord.rating} size={18} />
                    <span className="text-muted-foreground text-sm">({totalReviews} reviews)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
                <Separator className="my-4" />
                
                {/* Highlights */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {flat.highlights.map(highlight => (
                            <div key={highlight} className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span className="text-foreground/90">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="my-4" />

                {/* Description */}
                 <div>
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                     <p className="text-foreground/80 leading-relaxed">
                        A charming and secure {flat.type.toLowerCase()} located in the heart of {flat.location}. Perfect for students seeking a safe and comfortable living space close to campus facilities. Enjoy modern amenities and a responsive landlord in a student-friendly neighborhood.
                    </p>
                </div>
                
                <Separator className="my-4" />

                {/* Amenities */}
                 <div>
                    <h3 className="text-xl font-bold mb-4">Amenities</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {flat.amenities.map(amenity => (
                            <div key={amenity} className="flex items-center gap-2">
                               <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-primary" />
                                <span className="text-foreground/90">{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </CardContent>
          </Card>
          
          {/* Reviews Section */}
          <div className="mt-12">
             <h2 className="text-2xl font-bold mb-4">Reviews & Insights</h2>
            <ReviewSummary reviews={allReviews} />
            <div className="space-y-6 mt-6">
              {allReviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                {review.author}
                                {review.isVerified && <Verified className="w-4 h-4 text-blue-500" title="Verified Reviewer"/>}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <span className="font-bold">{review.rating}</span>
                            <StarRating rating={review.rating} size={16} />
                        </div>
                    </div>
                    <p className="text-muted-foreground mt-3">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          {/* Landlord Card */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="w-6 h-6 text-primary" /> Landlord Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">{flat.landlord.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-muted-foreground">Overall Rating:</span>
                <StarRating rating={flat.landlord.rating} size={16} />
                 <span className="text-sm text-muted-foreground">({totalReviews})</span>
              </div>
            </CardContent>
          </Card>

          {/* Report Incident */}
          <ReportIncidentCard flatId={flat.id} />

        </div>
      </div>
    </div>
  );
}
