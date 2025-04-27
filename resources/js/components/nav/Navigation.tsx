import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import NavMenu from './NavMenu';

const buttonMenu = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 260px 40px)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(30px at calc(100% - 60px) 45px)',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <>
            <motion.div
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                onClick={() => setIsOpen(true)}
                className="fixed top-0 right-0 z-10 h-full w-full cursor-pointer bg-gradient-to-b from-orange-400 to-orange-100"
                variants={buttonMenu}
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 right-0 bottom-0 z-[99] h-full w-full overflow-hidden"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-8 right-8 z-10 cursor-pointer md:right-12"
                            onClick={() => setIsOpen(false)}
                        >
                            <AiOutlineClose className="text-5xl" />
                        </motion.div>

                        <NavMenu callback={(val) => setIsOpen(val)} />
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
