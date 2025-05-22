import { Banner, Project, ProjectCategory } from '@/types';
import { Head } from '@inertiajs/react';
import IntroduceSection from '../../../layouts/client/IntroduceLayout';
import WorkSection from './sections/WorkSection';

interface WorkProps {
    categories?: ProjectCategory[];
    projects?: Project[];
    banner?: Banner;
}

const Work = ({ categories, projects, banner }: WorkProps) => {
    return (
        <>
            <Head title="Works" />

            <IntroduceSection imgUrl={banner?.image_url ? banner.image_url : ''} title="Works" />
            <WorkSection categories={categories} projects={projects} />
        </>
    );
};

export default Work;
