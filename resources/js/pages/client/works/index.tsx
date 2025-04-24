import { Head } from '@inertiajs/react';
import IntroduceSection from './sections/IntroduceSection';
import WorkSection from './sections/WorkSection';

const Work = () => {
    return (
        <>
            <Head title="Works" />

            <IntroduceSection />
            <WorkSection />
        </>
    );
};

export default Work;
