import { Head } from '@inertiajs/react';
import AboutSection from './sections/AboutSection';
import JumbotronSection from './sections/JumbotronSection';
import ProjectSection from './sections/ProjectSection';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <JumbotronSection />
            <AboutSection />
            <ProjectSection />
        </>
    );
}
