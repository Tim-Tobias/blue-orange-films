import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { ProjectCategory, Projects, TeamMember, type BreadcrumbItem } from '@/types';
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
    projects?: Projects;
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

export default function FormProjects({ isEdit = false,projects,categories }: FormProjectsProps) {

    const [dataProjects, setdataProjects] = useState<Projects[]>([]);
    const [dataCategories, setdataCategories] = useState<ProjectCategory[]>([]);

    useEffect(() => {
        if (projects) {
            setdataProjects([projects]);
        }
    }, [projects]);

    useEffect(() => {
        if (categories) {
            setdataCategories(categories);
        }
    }, [categories]);

    // console.log(`dataProjects ${JSON.stringify(dataProjects)}`);
    console.log(`dataCategories ${JSON.stringify(dataCategories)}`);

    // State for form fields
    const [formData, setFormData] = useState({
        highlight_link: '',
        title: '',
        year: '',
        duration: '',
        aspect_ratio: '',
        description: '',
        client: '',
        agency: '',
        id_project_category: '',
    });

    const [projectEntries, setProjectEntries] = useState<ProjectEntry[]>([
        {
            title: "",
            project_link: "",
            category: "image",
            description: "",
        },
    ])

    
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   
    const handleTeamMemberChange = (id: string, field: keyof TeamMember, value: string) => {
        setTeamMembers((prevMembers) => prevMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member)));
    };


    const addTeamMember = () => {
        const newMember: TeamMember = {
            id: `team-${Date.now()}`,
            teamName: '',
            crewRoles: '',
        };
        setTeamMembers([...teamMembers, newMember]);
    };

 
    const removeTeamMember = (id: string) => {
        setTeamMembers(teamMembers.filter((member) => member.id !== id));
    };



    const handleChange = (index: number, field: keyof ProjectEntry, value: string) => {
        const updatedEntries = [...projectEntries]
        updatedEntries[index] = {
            ...updatedEntries[index],
            [field]: value,
        }
        setProjectEntries(updatedEntries)
    }

    const addProjectEntry = () => {
        setProjectEntries([
            ...projectEntries,
            {
                title: "",
                project_link: "",
                category: "image",
                description: "",
            },
        ])
    }

    const removeProjectEntry = (index: number) => {
        if (projectEntries.length > 1) {
            const updatedEntries = [...projectEntries]
            updatedEntries.splice(index, 1)
            setProjectEntries(updatedEntries)
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Combine form data with team members
        const projectData = {
            ...formData,
            teamMembers: teamMembers.map((member) => ({
                nameTeams: member.teamName,
                nameRoles: member.crewRoles,
            })),
            projectEntries: projectEntries.map((entry) => ({
                title: entry.title,
                project_link: entry.project_link,
                category: entry.category,
                description: entry.description,
            }))
        };

        // console.log(`Submitting projectData: ${JSON.stringify(projectData)}`);
        // console.log(`Submitting projectEntries: ${JSON.stringify(projectEntries)}`);
        router.post(`/dashboard/projects`, projectData, {
            forceFormData: true,
            onSuccess: (data) => {
                console.log('Project created successfully',JSON.stringify(data));
            },
            onError: (errors) => {
                console.error('Error creating project:', JSON.stringify(errors));
            }
        });

        // console.log("Submitting data:", projectData)

        // Here you would typically send the data to your API
        // const response = await fetch('/api/projects', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(projectData)
        // })

        // Handle response...
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Web Content`} />

            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Web Content</h1>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                            <div className="w-full">
                                <div className="flex flex-wrap w-full">
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Title</label>
                                        <Input
                                            type="text"
                                            name="title"
                                            className="form-control mt-2"
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Highlight Link</label>
                                        <Input
                                            type="text"
                                            name='highlight_link'
                                            className="form-control mt-2"
                                            onChange={handleInputChange} />
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Aspect Ratio</label>
                                        <Input type="text" name="aspect_ratio" className="form-control mt-2" onChange={handleInputChange} />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Client</label>
                                        <Input type="text" name="client" className="form-control mt-2" onChange={handleInputChange} />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Agency </label>
                                        <Input type="text" name="agency" className="form-control mt-2" onChange={handleInputChange} />
                                    </div>
                                    <div className="p-4 md:w-1/2 lg:w-1/2">
                                        <label>Project Category </label>
                                        <Select
                                            name="id_project_category"
                                            onValueChange={(value) => setFormData({ ...formData, id_project_category: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {dataCategories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="p-4 w-full">
                                        <label>Description</label>
                                        <textarea 
                                        name='description'
                                        className="mt-2 w-full rounded border p-2"
                                            onChange={handleInputChange} 
                                            rows={4}
                                            

                                         ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>Project Files</CardTitle>
                                        <Button type="button" onClick={addProjectEntry} variant="outline">
                                            Add Files
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {projectEntries.map((entry, index) => (
                                                <div key={index} className="bg-muted/50 flex items-center gap-4 rounded-lg p-4">
                                                    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
                                                      
                                                        <div>
                                                            <Label htmlFor={`project-title-${index}`}>Title</Label>
                                                            <Input
                                                                id={`project-title-${index}`}
                                                                value={entry.title}
                                                                onChange={(e) => handleChange(index, 'title', e.target.value)}
                                                                className="mt-1"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                                                            <Input
                                                                id={`project-link-${index}`}
                                                                value={entry.project_link}
                                                                onChange={(e) => handleChange(index, 'project_link', e.target.value)}
                                                                className="mt-1"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor={`category-${index}`}>Category</Label>
                                                            <Select
                                                                value={entry.category}
                                                                onValueChange={(value) => handleChange(index, 'category', value)}
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
                                                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                                                className="mt-2 w-full rounded border p-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeProjectEntry(index)}
                                                    >
                                                        <Trash2 />
                                                    </Button>
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
                                        <Button type="button" onClick={addTeamMember} variant="outline">
                                            Add Team
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {teamMembers.length === 0 && (
                                                <p className="text-muted-foreground text-sm">
                                                    No team members added yet. Click "Add Team" to add team members.
                                                </p>
                                            )}

                                            {teamMembers.map((member) => (
                                                <div key={member.id} className="bg-muted/50 flex items-center gap-4 rounded-lg p-4">
                                                    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
                                                        <div>
                                                            <Label htmlFor={`team-name-${member.id}`}>Team Name</Label>
                                                            <Input
                                                                id={`team-name-${member.id}`}
                                                                value={member.teamName}
                                                                onChange={(e) => handleTeamMemberChange(member.id, 'teamName', e.target.value)}
                                                                className="mt-1"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor={`crew-roles-${member.id}`}>Crew Roles</Label>
                                                            <Input
                                                                id={`crew-roles-${member.id}`}
                                                                value={member.crewRoles}
                                                                onChange={(e) => handleTeamMemberChange(member.id, 'crewRoles', e.target.value)}
                                                                className="mt-1"
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeTeamMember(member.id)}
                                                        className="h-9 w-9 shrink-0"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                        <span className="sr-only">Remove team member</span>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </AppWrapper>
        </AppLayout>
    );
}
