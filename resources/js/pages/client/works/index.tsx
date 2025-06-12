import { Banner, Project, ProjectCategory } from '@/types';
import { Head } from '@inertiajs/react';
import IntroduceSection from '../../../layouts/client/IntroduceLayout';
import WorkSection from './sections/WorkSection';
import JumbotronSection from './sections/JumbotronSection';

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
