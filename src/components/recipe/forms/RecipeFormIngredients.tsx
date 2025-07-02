'use client';

import * as React from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { RecipeUnit } from '@/types/recipe';
import { getRecipeUnits } from '@/lib/api/recipe';

interface IngredientsProps {
    control: any;
    register: any;
    errors: any;
}

export function RecipeFormIngredients({ control, register, errors }: IngredientsProps) {
    const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });
    const [units, setUnits] = React.useState<RecipeUnit[]>([]);

    React.useEffect(() => {
        getRecipeUnits().then(setUnits);
    }, []);

    return (
        <Card>
            <CardHeader><CardTitle>Ingredientes</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                            <div>
                                <Label>Quantidade</Label>
                                <Input {...register(`ingredients.${index}.quantity`)} type="text" />
                            </div>
                            <div>
                                <Label>Unidade</Label>
                                <Controller name={`ingredients.${index}.unit_id`} control={control} render={({ field: selectField }) => (
                                    <Select onValueChange={selectField.onChange} value={selectField.value}>
                                        <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                        <SelectContent>
                                            {units.map(u => <SelectItem key={u.id} value={String(u.id)}>{u.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )} />
                            </div>
                            <div>
                                <Label>Ingrediente</Label>
                                <Input {...register(`ingredients.${index}.name`)} />
                            </div>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
                {errors.ingredients?.root && <p className="text-sm text-destructive mt-2">{errors.ingredients.root.message}</p>}
                <Button type="button" variant="outline" onClick={() => append({ name: '', quantity: '', unit_id: '' })}><PlusCircle className="h-4 w-4 mr-2" />Adicionar Ingrediente</Button>
            </CardContent>
        </Card>
    );
}
