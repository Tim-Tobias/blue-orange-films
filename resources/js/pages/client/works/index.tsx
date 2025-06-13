import { Banner, Project, ProjectCategory } from '@/types';
import { Head } from '@inertiajs/react';
import JumbotronSection from './sections/JumbotronSection';
import WorkSection from './sections/WorkSection';

interface WorkProps {
    categories?: ProjectCategory[];
    projects?: Project[];
    banner?: Banner;
}

const Work = ({ categories, projects, banner }: WorkProps) => {
    return (
        <>
            <Head title="Blue Orange Films - Works" />

            {/* <IntroduceSection imgUrl={banner?.image_url ? banner.image_url : ''} title="Works" /> */}

            <JumbotronSection banner={banner} />
            <WorkSection categories={categories} projects={projects} />
        </>
    );
};

export default Work;
