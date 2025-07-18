import { Project } from '@/types';
import { Head } from '@inertiajs/react';
import InfoSection from './sections/InfoSection';
import JumbotronSection from './sections/JumbotronSection';

interface WorkDetailProps {
    project: Project;
}

const WorkDetail = ({ project }: WorkDetailProps) => {
    return (
        <>
            <Head title={`Blue Orange Films - ${project.title}`} />

            <JumbotronSection url={project.highlight_link} />
            <InfoSection project={project} />
        </>
    );
};

export default WorkDetail;
