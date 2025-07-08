'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Loader2 } from "lucide-react";
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

type ReportIncidentCardProps = {
    flatId: number;
};

export function ReportIncidentCard({ flatId }: ReportIncidentCardProps) {
    const [open, setOpen] = useState(false);
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!issueType || !description) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out both fields.',
            });
            return;
        }

        setIsLoading(true);
        try {
            await addDoc(collection(db, 'reports'), {
                flatId: flatId,
                issueType: issueType,
                description: description,
                createdAt: serverTimestamp(),
                status: 'new',
            });

            toast({
                title: 'Report Submitted',
                description: 'Thank you for helping keep our community safe.',
            });
            setOpen(false);
            setIssueType('');
            setDescription('');
        } catch (error) {
            console.error("Error submitting report: ", error);
            toast({
                variant: 'destructive',
                title: 'Submission Failed',
                description: 'There was an error submitting your report. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="bg-destructive/10 border-destructive/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="w-6 h-6" /> Safety Concern?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-destructive/80 mb-4">Help keep our community safe. Report any issues or unsafe conditions anonymously.</p>
                <Dialog open={open} onOpenChange={setOpen}>
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
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="issue-type" className="text-right">Issue Type</Label>
                                <Input 
                                    id="issue-type" 
                                    placeholder="e.g., Unsafe entry, Harassment" 
                                    className="col-span-3"
                                    value={issueType}
                                    onChange={(e) => setIssueType(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description</Label>
                                <Textarea 
                                    id="description" 
                                    placeholder="Please describe the incident in detail." 
                                    className="col-span-3"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                             <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Submit Report'}
                             </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
