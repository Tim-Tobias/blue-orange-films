import CompanyLogo from '@/components/company-logo';
import { Link, usePage } from '@inertiajs/react';

const HeaderLayout = () => {
    const pathname = usePage().url;

    return (
        <>
            <header className="absolute top-0 z-10 mb-6 w-full p-5">
                <nav className="relative mx-auto flex items-center justify-between gap-4">
                    <CompanyLogo />

                    <div className="flex items-center gap-4 text-white">
                        <Link
                            href="/about"
                            className={`text-sm after:block after:h-[2px] after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 *:after:content-[''] hover:after:scale-x-100 md:text-2xl ${pathname === '/about' ? 'font-semibold after:scale-x-100 after:bg-white' : ''} ${pathname === '/contact' ? 'text-black' : ''}`}
                        >
                            About
                        </Link>
                        <Link
                            href="/works"
                            className={`text-sm after:block after:h-[2px] after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 *:after:content-[''] hover:after:scale-x-100 md:text-2xl ${pathname === '/works' ? 'font-semibold after:scale-x-100 after:bg-white' : ''} ${pathname === '/contact' ? 'text-black' : ''}`}
                        >
                            Works
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-sm after:block after:h-[2px] after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 *:after:content-[''] hover:after:scale-x-100 md:text-2xl ${pathname === '/contact' ? 'font-semibold text-black after:scale-x-100 after:bg-black' : ''}`}
                        >
                            Contact
                        </Link>
                    </div>
                </nav>
            </header>

            {/* <Navigation /> */}
        </>
    );
};

export default HeaderLayout;
