import { Head } from '@inertiajs/react';
import IntroduceSection from '../../../layouts/client/IntroduceLayout';
import WorkSection from './sections/WorkSection';

const Work = () => {
    return (
        <>
            <Head title="Works" />

            <IntroduceSection imgUrl="https://picsum.photos/id/302/200/300" title="Works" />
            <WorkSection />
        </>
    );
};

export default Work;
