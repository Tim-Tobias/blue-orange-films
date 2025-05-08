import { SearchableSelect } from '@/components/SearchableSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { X } from 'lucide-react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ProjectFormData } from '../form';

interface TeamFormProps {
    form: UseFormReturn<ProjectFormData>;
}

export default function TeamForm({ form }: TeamFormProps) {
    const { control, setValue, watch } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'teams',
    });

    const handleTeamChange = (index: number, field: 'name' | 'role', value: string) => {
        const teams = watch('teams');
        const updated = [...teams];
        updated[index][field] = value;
        setValue('teams', updated);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h6 className="text-xl font-semibold">Project Team</h6>
                    <Button type="button" onClick={() => append({ name: '', role: '' })}>
                        Add Team
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-5">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-5">
                            <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
                                <SearchableSelect
                                    value={watch(`teams.${index}.role`)}
                                    onChange={(val) => handleTeamChange(index, 'role', val)}
                                    endpoint="/roles"
                                    placeholder="Search role..."
                                />
                                <SearchableSelect
                                    value={watch(`teams.${index}.name`)}
                                    onChange={(val) => handleTeamChange(index, 'name', val)}
                                    endpoint="/team-names"
                                    placeholder="Search name..."
                                />
                            </div>
                            {fields.length > 1 && <X onClick={() => remove(index)} className="cursor-pointer text-red-600" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
