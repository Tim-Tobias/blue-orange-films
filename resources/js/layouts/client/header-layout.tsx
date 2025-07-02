import CompanyLogo from '@/components/company-logo';
import SocialMediaFooter from '@/components/social-media-footer';
import useScrollPosition from '@/hooks/use-scroll-position';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { BiMenuAltRight, BiX } from 'react-icons/bi';

const HeaderLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollY = useScrollPosition();
    const pathname = usePage().url;

    return (
        <>
            <header className="fixed top-0 z-10 mb-6 w-full">
                <motion.div
                    initial={{ y: -100 }}
                    animate={{
                        y: scrollY > 0 ? 0 : -100,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                    }}
                    className="absolute top-0 left-0 h-full w-full bg-white"
                />
                <nav className="relative mx-auto flex max-w-[1570px] items-center justify-between gap-4 py-5">
                    <CompanyLogo />

                    <div className="block text-3xl text-white md:hidden" onClick={() => setIsOpen(true)}>
                        <BiMenuAltRight className={`text-black ${pathname === '/contact' || scrollY > 0 ? 'text-black' : 'text-white'}`} />
                    </div>

                    <div className="hidden items-center gap-4 text-white md:flex">
                        <Link
                            href="/about"
                            className={cn(
                                `text-sm after:block after:h-[2px] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 *:after:content-[''] hover:after:scale-x-100 md:text-[18px]`,
                                pathname === '/about' ? 'font-semibold after:scale-x-100 after:bg-white' : '',
                                pathname === '/contact' || scrollY > 0 ? 'text-black' : '',
                                scrollY > 0 ? 'after:bg-black' : 'after:bg-white',
                            )}
                        >
                            About
                        </Link>
                        <Link
                            href="/works"
                            className={cn(
                                `text-sm after:block after:h-[2px] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 *:after:content-[''] hover:after:scale-x-100 md:text-[18px]`,
                                pathname === '/works' ? 'font-semibold after:scale-x-100 after:bg-white' : '',
                                pathname === '/contact' || scrollY > 0 ? 'text-black' : '',
                                scrollY > 0 ? 'after:bg-black' : 'after:bg-white',
                            )}
                        >
                            Works
                        </Link>
                        <Link
                            href="/contact"
                            className={cn(
                                `text-sm after:block after:h-[2px] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 *:after:content-[''] hover:after:scale-x-100 md:text-[18px]`,
                                pathname === '/contact' ? 'font-semibold text-black after:scale-x-100 after:bg-black' : '',
                                scrollY > 0 ? 'text-black after:bg-black' : '',
                            )}
                        >
                            Contact
                        </Link>
                    </div>
                </nav>
            </header>

            {/* <Navigation /> */}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: -400, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -400, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="fixed inset-0 z-50 flex flex-col"
                    >
                        <div className="grid h-full w-full grid-cols-1 place-items-center">
                            <div className="absolute bottom-0 left-0 h-[50vh] w-full flex-1 bg-[#1E4E79]" />
                            <div className="absolute top-0 left-0 h-[50vh] w-full flex-1 bg-[#F5F3F2]" />

                            <div className="absolute top-0 left-0 mb-8 flex w-full justify-between p-5">
                                <CompanyLogo />
                                <div className="text-3xl text-black" onClick={() => setIsOpen(false)}>
                                    <BiX />
                                </div>
                            </div>

                            <div className="relative h-[80%] w-[80%] p-5">
                                <div className="absolute top-0 left-0 h-full w-full bg-white opacity-90" />

                                <div className="relative h-full w-full">
                                    <div className="grid grid-cols-1 gap-4">
                                        <Link
                                            href="/about"
                                            className={`flex items-center gap-2 text-lg text-black ${pathname === '/about' ? 'font-semibold after:scale-x-100 after:bg-black' : ''}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="block h-px w-8 bg-black" />
                                            About
                                        </Link>
                                        <Link
                                            href="/works"
                                            className={`flex items-center gap-2 text-lg text-black ${pathname === '/works' ? 'font-semibold after:scale-x-100 after:bg-black' : ''}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="block h-px w-8 bg-black" />
                                            Works
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className={`flex items-center gap-2 text-lg text-black ${pathname === '/contact' ? 'font-semibold after:scale-x-100 after:bg-black' : ''}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="block h-px w-8 bg-black" />
                                            Contact
                                        </Link>
                                    </div>

                                    <div className="absolute bottom-0">
                                        <SocialMediaFooter color="black" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default HeaderLayout;
