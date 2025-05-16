import { Head } from '@inertiajs/react';
import AboutSection from './sections/AboutSection';
import JumbotronSection from './sections/JumbotronSection';
import ProjectSection from './sections/ProjectSection';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

            <JumbotronSection />
            <AboutSection />
            <ProjectSection />
        </>
    );
}
