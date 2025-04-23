
import { Head } from '@inertiajs/react';
import { lazy } from 'react';
import AboutSection from './sections/aboutSection';

const StepSection = lazy(() => import('./sections/StepSection'));
const ServiceSection = lazy(() => import('./sections/serviceSection'));
const HowWorks = lazy(() => import('./sections/HowWeWorks'));

const AboutPage = () => {
    return (
        <>
            <Head title="About Section">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <AboutSection />
            <ServiceSection />
            <HowWorks />
            <StepSection />
            
        </>
    );
};

export default AboutPage;
