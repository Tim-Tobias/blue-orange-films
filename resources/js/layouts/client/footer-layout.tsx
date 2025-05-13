import CompanyLogoFooter from '@/components/company-logo-footer';
import FooterMenu from '@/components/footer-menu';
import SocialMediaFooter from '@/components/social-media-footer';

const FooterLayout = () => {
    return (
        <footer className="flex flex-col items-center gap-10 bg-[#1E4E79] md:flex-row md:justify-between p-4">
            <CompanyLogoFooter />
            <FooterMenu />
            <SocialMediaFooter color="white" />
        </footer>
    );
};

export default FooterLayout;
