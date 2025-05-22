import { About, Banner, Client, Project } from '@/types';
import { Head } from '@inertiajs/react';
import ClientSection from '../about/sections/ClientSection';
import AboutSection from './sections/AboutSection';
import JumbotronSection from './sections/JumbotronSection';
import ProjectSection from './sections/ProjectSection';

interface WelcomeProps {
    about?: About;
    projects?: Project[];
    client?: Client;
    banner?: Banner;
}

export default function Welcome({ about, projects, client, banner }: WelcomeProps) {
    return (
        <>
            <Head title="Welcome" />

            <JumbotronSection banner={banner} />
            <AboutSection about={about} />
            <ProjectSection projects={projects} />
            {client && <ClientSection client={client} />}
        </>
    );
}
