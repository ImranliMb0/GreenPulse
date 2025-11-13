'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Regenerate API Key</CardTitle>
                    <CardDescription>
                        Has your key been compromised? You can generate a new key.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Before you proceed</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>You will need to change your apps to use the new key.</li>
                                <li>Your statistics will be reset.</li>
                                <li>This action cannot be undone.</li>
                            </ul>
                        </AlertDescription>
                    </Alert>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the above and would like to regenerate the API key.
                        </label>
                    </div>
                    <Button disabled>Regenerate API Key</Button>
                </CardContent>
            </Card>
        </div>
    )
}
