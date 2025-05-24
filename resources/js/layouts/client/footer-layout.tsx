import CompanyLogoFooter from '@/components/company-logo-footer';
import SocialMediaFooter from '@/components/social-media-footer';
import { Link } from '@inertiajs/react';

const FooterLayout = () => {
    return (
        <footer className="flex flex-col items-center gap-10 bg-[#1E4E79] p-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-5 text-white">
                <CompanyLogoFooter />
                <div className="flex justify-center gap-1">
                    <Link href="/">Home |</Link>
                    <Link href="/">About |</Link>
                    <Link href="/">Works |</Link>
                    <Link href="/">Contact</Link>
                </div>
            </div>

            <div className="flex items-center gap-5 text-white">
                <p>© 2025 Blue Orange Films All Right Reserved.</p>
                <SocialMediaFooter color="white" />
            </div>
        </footer>
    );
};

export default FooterLayout;
