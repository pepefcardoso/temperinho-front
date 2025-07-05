'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { RecipeDiet } from '@/types/recipe';
import { getRecipeDiets } from '@/lib/api/recipe';

interface DietsProps {
    control: any;
    errors: any;
}

export function RecipeFormDiets({ control, errors }: DietsProps) {
    const [diets, setDiets] = React.useState<RecipeDiet[]>([]);

    React.useEffect(() => {
        getRecipeDiets().then(setDiets);
    }, []);

    return (
        <Card>
            <CardHeader><CardTitle>Dietas Específicas</CardTitle></CardHeader>
            <CardContent>
                <Controller name="diets" control={control} render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                        {diets.map(diet => (
                            <Button
                                key={diet.id}
                                type="button"
                                variant={field.value.includes(diet.id) ? 'default' : 'outline'}
                                onClick={() => {
                                    const newValue = field.value.includes(diet.id)
                                        ? field.value.filter((id: number) => id !== diet.id)
                                        : [...field.value, diet.id];
                                    field.onChange(newValue);
                                }}
                            >
                                {diet.name}
                            </Button>
                        ))}
                    </div>
                )} />
                {errors.diets && <p className="text-sm text-destructive mt-2">{errors.diets.message}</p>}
            </CardContent>
        </Card>
    );
}