
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function PostListingPage() {
    const [safetyRating, setSafetyRating] = useState([3]);
    

    return (
        <div className="container mx-auto py-28 px-4 md:px-6">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Post a New Listing</CardTitle>
                    <CardDescription>
                        Fill out the details below to list your property on SafeStay. Your listing helps students find safe housing.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Listing Title</Label>
                            <Input id="title" placeholder="e.g., Cozy 1BHK Near Campus" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Select>
                                    <SelectTrigger id="location">
                                        <SelectValue placeholder="Select a location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="santacruz-w">Santacruz West</SelectItem>
                                        <SelectItem value="santacruz-e">Santacruz East</SelectItem>
                                        <SelectItem value="vile-parle-w">Vile Parle West</SelectItem>
                                        <SelectItem value="vile-parle-e">Vile Parle East</SelectItem>
                                        <SelectItem value="bandra-w">Bandra West</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="room-type">Room Type</Label>
                                <Select>
                                    <SelectTrigger id="room-type">
                                        <SelectValue placeholder="Select a room type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1rk">1RK</SelectItem>
                                        <SelectItem value="1bhk">1BHK</SelectItem>
                                        <SelectItem value="2bhk">2BHK</SelectItem>
                                        <SelectItem value="pg">Paying Guest (PG)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price per Month (₹)</Label>
                            <Input id="price" type="number" placeholder="e.g., 25000" />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe the property, its features, and nearby area..." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amenities">Amenities</Label>
                            <Input id="amenities" placeholder="e.g., Wi-Fi, AC, Gated Security, 24/7 Water..." />
                            <p className="text-xs text-muted-foreground">Enter comma-separated values.</p>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="highlights">Highlights</Label>
                            <Input id="highlights" placeholder="e.g., 5-Min Walk to College, Women-only Building..." />
                             <p className="text-xs text-muted-foreground">Enter comma-separated values.</p>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="safety-rating">Safety Rating: <span className="font-bold text-primary">{safetyRating[0]}/5</span></Label>
                            <Slider
                                id="safety-rating"
                                min={0}
                                max={5}
                                step={0.5}
                                defaultValue={safetyRating}
                                onValueChange={(value) => setSafetyRating(value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Upload Images</Label>
                            <div className="border-2 border-dashed border-muted rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors">
                                <UploadCloud className="w-12 h-12 text-muted-foreground mb-2" />
                                <p className="font-semibold">Click or drag files here to upload</p>
                                <p className="text-sm text-muted-foreground">PNG, JPG, or GIF up to 5MB</p>
                            </div>
                        </div>

                        <Button type="submit" size="lg" className="w-full">Submit Listing</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
