import BlueOrangeLogo from '@/images/BLUE ORANGE LOGO - STANDARD.png';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import SocialMediaFooter from '../social-media-footer';
import NavItem from './navItem';

interface NavMenuProps {
    callback: (val: boolean) => void;
}

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.3 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const itemVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        x: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

const menus = [
    {
        href: '/',
        title: 'Home',
    },
    {
        href: '/about',
        title: 'About',
    },
    {
        href: '/works',
        title: 'Works',
    },
    {
        href: '/contact',
        title: 'Contact',
    },
];

const NavMenu = ({ callback }: NavMenuProps) => {
    return (
        <motion.div initial="closed" animate="open" variants={variants} className="flex h-full w-full flex-col justify-between p-5 md:px-10">
            <motion.div variants={itemVariants}>
                <Link href="/" onClick={() => callback(false)}>
                    <img src={BlueOrangeLogo} className="w-64" alt="" />
                </Link>
            </motion.div>

            <div className="flex flex-col space-y-1">
                {menus.map((val, index) => (
                    <NavItem key={index} href={val.href} title={val.title} onClick={() => callback(false)} />
                ))}
            </div>

            <motion.div variants={itemVariants}>
                <SocialMediaFooter color="black" />
            </motion.div>
        </motion.div>
    );
};

export default NavMenu;
