import SearchableSelect from '@/components/SearchableSelect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ProjectFormData } from '../form';

interface TeamFormProps {
    form: UseFormReturn<ProjectFormData>;
}

export default function TeamForm({ form }: TeamFormProps) {
    const { errors: inertiaErrors } = usePage().props;

    const {
        setValue,
        watch,
        formState: { errors: hookErrors },
    } = form;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'teams',
    });

    const handleTeamChange = (index: number, fields: (keyof ProjectFormData['teams'][0])[], values: (string | number)[]) => {
        const teams = [...watch('teams')];

        fields.forEach((field, i) => {
            (teams[index][field] as string | number) = values[i];
        });

        setValue('teams', teams);
    };

    const errorText = (key: string) => hookErrors[key as keyof typeof hookErrors]?.message || inertiaErrors[key];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h6 className="text-xl font-semibold">Project Team</h6>
                    <Button type="button" onClick={() => append({ id_name: 0, id_role: 0, name: '', role: '' })}>
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
                                    onChange={(val) => val && handleTeamChange(index, ['id_role', 'role'], [val.id, val.name])}
                                    endpoint="/roles"
                                    placeholder="Search role..."
                                />
                                {errorText(`teams.${index}.role`) && <p className="text-sm text-red-500">{errorText(`teams.${index}.role`)}</p>}
                                {errorText(`teams.${index}.id_role`) && <p className="text-sm text-red-500">{errorText(`teams.${index}.id_role`)}</p>}
                                <SearchableSelect
                                    value={watch(`teams.${index}.name`)}
                                    onChange={(val) => val && handleTeamChange(index, ['id_name', 'name'], [val.id, val.name])}
                                    endpoint="/team-names"
                                    placeholder="Search name..."
                                />
                                {errorText(`teams.${index}.name`) && <p className="text-sm text-red-500">{errorText(`teams.${index}.name`)}</p>}
                                {errorText(`teams.${index}.id_name`) && <p className="text-sm text-red-500">{errorText(`teams.${index}.id_name`)}</p>}
                            </div>
                            {fields.length > 1 && <X onClick={() => remove(index)} className="cursor-pointer text-red-600" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
