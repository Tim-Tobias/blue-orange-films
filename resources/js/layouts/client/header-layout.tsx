import CompanyLogo from '@/components/company-logo';
import { CiMenuFries } from 'react-icons/ci';

const HeaderLayout = () => {
    return (
        <header className="fixed top-0 z-10 mb-6 w-full bg-white p-5 shadow-2xl">
            <nav className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
                <CompanyLogo />

                <div className="cursor-pointer">
                    <CiMenuFries className="text-xl text-black" />
                </div>
            </nav>
        </header>
    );
};

export default HeaderLayout;
