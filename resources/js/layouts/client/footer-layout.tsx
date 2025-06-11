import CompanyLogoFooter from '@/components/company-logo-footer';
import SocialMediaFooter from '@/components/social-media-footer';

const FooterLayout = () => {
    return (
        <footer className="flex flex-col items-center gap-10 bg-[#1E4E79] p-4 md:flex-row md:justify-between">
            <div className="flex flex-col items-center gap-5 text-white md:flex-row">
                <CompanyLogoFooter />
                <SocialMediaFooter color="white" />
            </div>

            <div className="flex flex-col items-center gap-5 text-white md:flex-row">
                <p className="text-center">© 2025 Blue Orange Films All Right Reserved.</p>
            </div>
        </footer>
    );
};

export default FooterLayout;
