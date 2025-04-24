import { Head } from '@inertiajs/react';
import InfoSection from './sections/InfoSection';
import JumbotronSection from './sections/JumbotronSection';

const WorkDetail = () => {
    return (
        <>
            <Head title="Work Detail" />

            <JumbotronSection />
            <InfoSection />
        </>
    );
};

export default WorkDetail;
