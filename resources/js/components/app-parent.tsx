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
                <meta
                    name="description"
                    content="Blue Orange Films is a film production company that specializes in creating high-quality films for the screen."
                />
                <meta name="keywords" content="film, production, company, high-quality, screen" />
                <meta name="author" content="Blue Orange Films" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="bingbot" content="index, follow" />
                <meta name="google-site-verification" content="google-site-verification=google-site-verification" />
                <meta name="og:title" content="Blue Orange Films" />
                <meta
                    name="og:description"
                    content="Blue Orange Films is a film production company that specializes in creating high-quality films for the screen."
                />
                <meta name="og:image" content="./Blueorange-Square.png" />
                <meta name="og:url" content="https://blueorangefilms.com" />
                <meta name="og:type" content="website" />
                <meta name="og:locale" content="en_US" />
                <meta name="og:site_name" content="Blue Orange Films" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blue Orange Films" />
                <meta
                    name="twitter:description"
                    content="Blue Orange Films is a film production company that specializes in creating high-quality films for the screen."
                />
                <meta name="twitter:image" content="./Blueorange-Square.png" />
                <meta name="twitter:url" content="https://blueorangefilms.com" />
                <meta name="twitter:site" content="@blueorangefilms" />
                <meta name="twitter:creator" content="@blueorangefilms" />
                <meta name="twitter:domain" content="blueorangefilms.com" />
                <meta name="twitter:image:alt" content="Blue Orange Films" />
            </Head>

            <HeaderLayout />
            <ParallaxProvider>{children}</ParallaxProvider>
            <FooterLayout />
        </>
    );
};

export default AppParent;
