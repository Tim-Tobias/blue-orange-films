import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { ProjectCategory, ProjectDetail, Projects, TeamMember, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projects',
        href: '/dashboard/Projects',
    },
];

type FormProjectsProps = {
    isEdit?: boolean;
    projects?: ProjectDetail;
    categories?: ProjectCategory[];
};
type ProjectEntry = {
    title: string
    project_link: string
    category: "image" | "video"
    description: string
}

export const webContentScheme = z.object({
    title: z.string().optional(),
    section: z.string().min(1, 'Section is required'),
});

export type WebContentFormData = z.infer<typeof webContentScheme>;

export default function FormProjects({ isEdit = false, projects, categories }: FormProjectsProps) {


    const [dataCategories, setdataCategories] = useState<ProjectCategory[]>([]);

    const [ProjectDetail, setProjectDetail] = useState<ProjectDetail[]>([]);


    useEffect(() => {
        if (projects) {
            setProjectDetail([projects]);
        }
        return () => {

            
        }
    }, [projects]);

    console.log(`ProjectDetail ${JSON.stringify(ProjectDetail)}`);


    useEffect(() => {
        if (categories) {
            setdataCategories(categories);
        }
    }, [categories]);





    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title={`Admin Dashboard - Projects`} />

            <AppWrapper>
                <h1 className="text-2xl font-semibold">Detail Project</h1>

                <Card>
                    <CardContent>
                        <form encType="multipart/form-data" className="space-y-4">
                            <div className="w-full">
                                <div className="flex flex-wrap w-full">
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Title</label>
                                        <Input
                                            type="text"
                                            name="title"
                                            className="form-control mt-2"
                                            defaultValue={ProjectDetail[0]?.title}
                                             />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Highlight Link</label>
                                        <Input
                                            type="text"
                                            name='highlight_link'
                                            className="form-control mt-2"
                                            defaultValue={ProjectDetail[0]?.highlight_link}
                                        />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Year</label>
                                        <Input
                                            type="number"
                                            name="year"
                                            min="1900"
                                            max="2099"
                                            step="1"
                                            className="form-control mt-2"
                                            defaultValue={ProjectDetail[0]?.year}
                                        />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Duration</label>
                                        <Input
                                            type="text"
                                            name="duration"
                                            placeholder="00:00:00"
                                            pattern="^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$"
                                            title="Format: HH:MM:SS"
                                            className="form-control mt-2"
                                            defaultValue={ProjectDetail[0]?.duration}
                                        />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Aspect Ratio</label>
                                        <Input type="text" name="aspect_ratio" className="form-control mt-2" 
                                            defaultValue={ProjectDetail[0]?.aspect_ratio}
                                        />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Client</label>
                                        <Input type="text" name="client" className="form-control mt-2"
                                            defaultValue={ProjectDetail[0]?.client}

                                         />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Agency </label>
                                        <Input type="text" name="agency" className="form-control mt-2"
                                            defaultValue={ProjectDetail[0]?.agency}
                                         />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Project Category </label>
                                        <Input type="text" name="agency" className="form-control mt-2"
                                            defaultValue={ProjectDetail[0]?.id}
                                        />
                                    </div>
                                    <div className="p-4 w-full">
                                        <label>Description</label>
                                        <textarea
                                            name='description'
                                            className="mt-2 w-full rounded border p-2"
                                            defaultValue={ProjectDetail[0]?.description}

                                            rows={4}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>Project Files</CardTitle>
                                        
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {ProjectDetail[0]?.projectFiles?.map((entry, index) => (
                                                <div key={index} className="bg-muted/50 flex items-center gap-4 rounded-lg p-4">
                                                    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">

                                                        <div>
                                                            <Label htmlFor={`project-title-${index}`}>Title</Label>
                                                            <Input
                                                                id={`project-title-${index}`}
                                                                defaultValue={entry.title}

                                                                className="mt-1"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                                                            <Input
                                                                id={`project-link-${index}`}
                                                                defaultValue={entry.project_link}

                                                                className="mt-1"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor={`category-${index}`}>Category</Label>
                                                            <Select
                                                                defaultValue={entry.category}
                                                            >
                                                                <SelectTrigger id={`category-${index}`} className="mt-1">
                                                                    <SelectValue placeholder="Select category" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="video">Video</SelectItem>
                                                                    <SelectItem value="image">Image</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className='w-full'>
                                                            <Label htmlFor={`description-${index}`}>Description</Label>
                                                            <textarea
                                                                id={`description-${index}`}
                                                                value={entry.description}
                                                                className="mt-2 w-full rounded border p-2"
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="w-full">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>Project Team</CardTitle>
                                        
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {ProjectDetail[0]?.projectTeams?.length === 0 && (
                                                <p className="text-muted-foreground text-sm">
                                                    No team members added yet. Click "Add Team" to add team members.
                                                </p>
                                            )}

                                            {ProjectDetail[0]?.projectTeams?.map((member) => (
                                                <div key={member.id} className="bg-muted/50 flex items-center gap-4 rounded-lg p-4">
                                                    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
                                                        <div>
                                                            <Label htmlFor={`team-name-${member.id}`}>Team Name</Label>
                                                            <Input
                                                                id={`team-name-${member.id}`}
                                                                defaultValue={member.nameTeam}
                                                                className="mt-1"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor={`crew-roles-${member.id}`}>Crew Roles</Label>
                                                            <Input
                                                                id={`crew-roles-${member.id}`}
                                                                defaultValue={member.nameRoles}
                                                                className="mt-1"
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                           
                        </form>
                    </CardContent>
                </Card>
            </AppWrapper>
        </AppLayout>
    );
}