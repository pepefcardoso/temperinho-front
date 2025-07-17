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
        const fetchUnits = async () => {
            try {
                const fetchedUnits = await getRecipeUnits();
                setUnits(fetchedUnits);
            } catch (error) {
                console.error("Falha ao buscar unidades de medida:", error);
            }
        };
        fetchUnits();
    }, []);

    const fieldErrors = errors.ingredients as (Record<string, any> | undefined)[] | undefined;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ingredientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, index) => {
                    const quantityId = `ingredients-${index}-quantity`;
                    const unitId = `ingredients-${index}-unit_id`;
                    const nameId = `ingredients-${index}-name`;

                    return (
                        <div key={field.id} className="flex items-end gap-2 p-3 border rounded-lg bg-background">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                                <div>
                                    <Label htmlFor={quantityId}>Quantidade</Label>
                                    <Input
                                        id={quantityId}
                                        {...register(`ingredients.${index}.quantity`)}
                                        type="text"
                                        aria-invalid={!!fieldErrors?.[index]?.quantity}
                                    />
                                    {fieldErrors?.[index]?.quantity && <p className="text-sm text-destructive mt-1" role="alert">{fieldErrors[index].quantity.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor={unitId}>Unidade</Label>
                                    <Controller
                                        name={`ingredients.${index}.unit_id`}
                                        control={control}
                                        render={({ field: selectField }) => (
                                            <Select onValueChange={selectField.onChange} value={selectField.value}>
                                                <SelectTrigger id={unitId} aria-invalid={!!fieldErrors?.[index]?.unit_id}>
                                                    <SelectValue placeholder="Selecione..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {units.map(u => <SelectItem key={u.id} value={String(u.id)}>{u.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {fieldErrors?.[index]?.unit_id && <p className="text-sm text-destructive mt-1" role="alert">{fieldErrors[index].unit_id.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor={nameId}>Ingrediente</Label>
                                    <Input
                                        id={nameId}
                                        {...register(`ingredients.${index}.name`)}
                                        aria-invalid={!!fieldErrors?.[index]?.name}
                                    />
                                    {fieldErrors?.[index]?.name && <p className="text-sm text-destructive mt-1" role="alert">{fieldErrors[index].name.message}</p>}
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                aria-label={`Remover ingrediente ${index + 1}`}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    );
                })}

                {errors.ingredients?.root && <p className="text-sm text-destructive mt-2" role="alert">{errors.ingredients.root.message}</p>}

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ name: '', quantity: '', unit_id: '' })}
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Adicionar Ingrediente
                </Button>
            </CardContent>
        </Card>
    );
}