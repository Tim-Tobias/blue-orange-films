import CompanyLogo from '@/components/company-logo';
import Navigation from '@/components/nav/Navigation';

const HeaderLayout = () => {
    return (
        <>
            <header className="fixed top-0 z-10 mb-6 w-full p-5">
                <nav className="relative mx-auto flex max-w-[1680px] items-center justify-between gap-4">
                    <CompanyLogo />

                    <Navigation />
                </nav>
            </header>
        </>
    );
};

export default HeaderLayout;
