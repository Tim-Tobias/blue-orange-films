import FooterLayout from '@/layouts/client/footer-layout';
import HeaderLayout from '@/layouts/client/header-layout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ReactNode, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

const AppParent = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <ParallaxProvider>
            <HeaderLayout />
            {children}
            <FooterLayout />
        </ParallaxProvider>
    );
};

export default AppParent;
