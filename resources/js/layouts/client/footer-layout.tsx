import CompanyLogoFooter from '@/components/company-logo-footer';
import SocialMediaFooter from '@/components/social-media-footer';

const FooterLayout = () => {
    return (
        <footer className="grid grid-cols-1 items-center gap-5 bg-[#1E4E79] p-4 md:grid-cols-2 md:justify-between md:gap-10">
            <div className="flex items-center justify-between gap-5">
                <CompanyLogoFooter />

                <SocialMediaFooter color="white" />
            </div>

            <p className="justify-self-center text-white md:justify-self-end">© 2025 Blue Orange Films</p>
        </footer>
    );
};

export default FooterLayout;
