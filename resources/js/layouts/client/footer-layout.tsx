import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CompanyLogoFooter from '@/components/company-logo-footer';
import FooterMenu from '@/components/footer-menu';
import SocialMediaFooter from '@/components/social-media-footer';

const FooterLayout = () => {
    return (
        <footer className="bg-[#1E4E79]">
            <AppFrontWrapper className="flex flex-col items-center gap-10 md:justify-between md:flex-row">
                <CompanyLogoFooter />
                <FooterMenu />
                <SocialMediaFooter color='white' />
            </AppFrontWrapper>
        </footer>
    );
};

export default FooterLayout;
