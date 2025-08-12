"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import { useState } from "react";
import { toast, Toaster } from "sonner";
import MDEditor from '@uiw/react-md-editor';

export default function ImageToBase64() {
    const [base64string, setBase64string] = useState<string>("");
    const [selectedImageBlob, setSelectedImageBlob] = useState();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = async (event: any) => {
        try {
            const file = event.target.files[0];
            console.log("uploaded file: ", file);
            if (file) {
                setSelectedImageBlob(file);
                setSelectedImage(URL.createObjectURL(file));
            }
            const formData = new FormData();
            formData.append('image', file);
            toast("Image upload completed.")
        } catch (error) {
            console.error('Error enhancing image:', error);
            toast(`Error enhancing image: ${error}`);
        }
    };

    const handleConvertImage = async (event: any) => {
        console.log("Convert image to base64");

        try {
            if (selectedImageBlob) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader?.result && typeof reader.result == "string") {
                        setBase64string(reader.result); // Base64 string with data:image/<type>;base64, prefix
                    }
                };
                reader.readAsDataURL(selectedImageBlob);
                toast("Convert completed.")
            }
        } catch (error) {
            console.error('Error enhancing image:', error);
            toast(`Error enhancing image: ${error}`);
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Image to Base64 String</CardTitle>
                    <CardDescription>Upload image to convert to Base64 string</CardDescription>
                    <CardAction>
                        <Button variant="outline" onClick={handleConvertImage} disabled={!selectedImage}>Convert Image</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} />
                    {selectedImage &&
                        (
                            <Collapsible className="border border-1 rounded m-2 p-2 gap-4">
                                <CollapsibleTrigger>
                                    <Label className="border border-1 rounded p-2">Expend to review uploaded image</Label>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="w-full h-auto">
                                        <Image src={selectedImage} fill={true} alt="Image" className="rounded-md object-cover !relative" />
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col w-full gap-y-4">
                        <Label>Converted Base64 Result</Label>
                        {/* <MDEditor
                            value={base64string}
                            // onChange={setBase64string}
                            onChange={() => { return; }}
                        /> */}
                        {/* <MDEditor.Markdown source={base64string} style={{ whiteSpace: 'pre-wrap' }} /> */}
                        <Textarea className="max-w-[75vw] max-h-[25vh] truncate" value={base64string} onChange={() => { return; }}></Textarea>
                    </div>
                </CardFooter>
            </Card>
            <Toaster />
        </>
    )
}