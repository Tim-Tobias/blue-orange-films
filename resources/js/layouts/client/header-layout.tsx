import CompanyLogo from '@/components/company-logo';
import Navigation from '@/components/nav/Navigation';

const HeaderLayout = () => {
    return (
        <>
            <header className="absolute top-0 z-10 mb-6 w-full p-5">
                <nav className="relative mx-auto flex items-center justify-between gap-4">
                    <CompanyLogo />
                </nav>
            </header>

            <Navigation />
        </>
    );
};

export default HeaderLayout;
