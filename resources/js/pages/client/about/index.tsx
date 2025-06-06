import { About, Banner, Client, Hww, Service, Workflow } from '@/types';
import { Head } from '@inertiajs/react';
import { lazy } from 'react';
import AboutSection from './sections/aboutSection';
import ClientSection from './sections/ClientSection';

const StepSection = lazy(() => import('./sections/StepSection'));
const ServiceSection = lazy(() => import('./sections/serviceSection'));
const HowWorks = lazy(() => import('./sections/HowWeWorks'));

interface AboutPageProps {
    about?: About;
    services?: Service[];
    hww?: Hww;
    steps?: Workflow[];
    client?: Client;
    banner?: Banner;
}

const AboutPage = ({ about, services, hww, steps, client, banner }: AboutPageProps) => {
    return (
        <>
            <Head title="Blue Orange Films - About Us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className='my-30'>
                <AboutSection banner={banner} about={about} />
            </div>
            <ServiceSection services={services} />
            <HowWorks hww={hww} />
            <StepSection steps={steps} />
            <ClientSection client={client} />
        </>
    );
};

export default AboutPage;
