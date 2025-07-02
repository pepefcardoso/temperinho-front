'use client';

import * as React from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { Image as ImageType } from '@/types/image';

interface ImageProps {
    initialImage?: ImageType | null;
    onFileChange: (file: File | null) => void;
}

export function RecipeFormImage({ initialImage, onFileChange }: ImageProps) {
    const [imagePreview, setImagePreview] = React.useState<string | null>(initialImage?.url || null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <Card>
            <CardHeader><CardTitle>Imagem de Capa</CardTitle></CardHeader>
            <CardContent>
                <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground hover:border-primary">
                        {imagePreview ? (
                            <div className="relative w-full h-48 mx-auto"><Image src={imagePreview} alt="Preview" fill className="object-cover rounded-md" /></div>
                        ) : (
                            <div className="flex flex-col items-center gap-2"><Upload className="h-10 w-10" /><p>Clique para fazer upload</p></div>
                        )}
                    </div>
                </Label>
                <Input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
            </CardContent>
        </Card>
    );
}
