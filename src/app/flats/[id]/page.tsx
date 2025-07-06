import { notFound } from 'next/navigation';
import Image from 'next/image';
import { flats } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/star-rating';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Shield, User, MessageSquare, Verified, AlertTriangle, Building, DollarSign, Tag, CheckSquare } from 'lucide-react';
import { ReviewSummary } from './review-summary';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type PageProps = {
  params: {
    id: string;
  };
};

export default function FlatDetailPage({ params }: PageProps) {
  const flat = flats.find((f) => f.id === parseInt(params.id));

  if (!flat) {
    notFound();
  }

  const allReviews = flat.landlord.reviews;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
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

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{flat.name}</CardTitle>
              <p className="text-muted-foreground">{flat.location}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary" /> <strong>${flat.price}</strong>/month</div>
                  <div className="flex items-center gap-2"><Building className="w-4 h-4 text-primary" /> {flat.type}</div>
                  <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Safety Rating: <StarRating rating={flat.safetyRating} size={16} /></div>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                A charming and secure {flat.type.toLowerCase()} located in the heart of {flat.location}. Perfect for students seeking a safe and comfortable living space close to campus facilities. Enjoy modern amenities and a responsive landlord.
              </p>
            </CardContent>
          </Card>
          
          {/* Reviews Section */}
          <div className="mt-8">
             <h2 className="text-2xl font-bold mb-4">Reviews & Insights</h2>
            <ReviewSummary reviews={allReviews} />
            <div className="space-y-6 mt-6">
              {allReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                {review.author}
                                {review.isVerified && <Verified className="w-4 h-4 text-blue-500" />}
                            </p>
                            <StarRating rating={review.rating} size={16} className="mt-1" />
                        </div>
                        <Badge variant="outline">{new Date().toLocaleDateString()}</Badge>
                    </div>
                    <p className="text-muted-foreground mt-4">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          {/* Amenities Card */}
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckSquare className="w-6 h-6 text-primary" /> Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                {flat.amenities.map(amenity => <li key={amenity} className="flex items-center gap-3"><Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-primary" /><span>{amenity}</span></li>)}
              </ul>
            </CardContent>
          </Card>
          
          {/* Landlord Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="w-6 h-6 text-primary" /> Landlord Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-lg">{flat.landlord.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-muted-foreground">Rating:</span>
                <StarRating rating={flat.landlord.rating} size={16} />
              </div>
            </CardContent>
          </Card>

          {/* Report Incident */}
          <Card className="bg-destructive/10 border-destructive/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="w-6 h-6" /> Safety Concern?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-destructive/80 mb-4">Help keep our community safe. Report any issues or unsafe conditions anonymously.</p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full">Report an Incident</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Report an Incident</DialogTitle>
                            <DialogDescription>
                                Your report is anonymous and helps us maintain a safe environment for all students.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="issue-type" className="text-right">Issue Type</Label>
                                <Input id="issue-type" placeholder="e.g., Unsafe entry, Harassment" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description</Label>
                                <Textarea id="description" placeholder="Please describe the incident in detail." className="col-span-3" />
                            </div>
                        </div>
                         <Button type="submit">Submit Report</Button>
                    </DialogContent>
                </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
