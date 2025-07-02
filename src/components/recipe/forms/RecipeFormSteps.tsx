'use client';

import { useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';

interface StepsProps {
    control: any;
    register: any;
    errors: any;
}

export function RecipeFormSteps({ control, register, errors }: StepsProps) {
    const { fields, append, remove } = useFieldArray({ control, name: "steps" });

    return (
        <Card>
            <CardHeader><CardTitle>Modo de Preparo</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-2">
                        <strong className="pt-2">{index + 1}.</strong>
                        <Textarea {...register(`steps.${index}.description`)} className="flex-1" />
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
                {errors.steps?.root && <p className="text-sm text-destructive mt-2">{errors.steps.root.message}</p>}
                <Button type="button" variant="outline" onClick={() => append({ description: '' })}><PlusCircle className="h-4 w-4 mr-2" />Adicionar Passo</Button>
            </CardContent>
        </Card>
    );
}
