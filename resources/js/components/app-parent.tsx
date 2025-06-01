import FooterLayout from '@/layouts/client/footer-layout';
import HeaderLayout from '@/layouts/client/header-layout';
import { Head } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ReactNode, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

const AppParent = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
                <link rel="icon" type="image/x-icon" href="./Blueorange-Square.png"></link>
                <title>Blue Orange Films</title>
            </Head>

            <HeaderLayout />
            <ParallaxProvider>{children}</ParallaxProvider>
            <FooterLayout />
        </>
    );
};

export default AppParent;
