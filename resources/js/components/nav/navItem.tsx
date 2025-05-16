import { cn } from '@/lib/utils';
import { InertiaLinkProps, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface NavItemProps extends Omit<InertiaLinkProps, 'children'> {
    title: string;
}

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

const NavItem = ({ className, title, ...props }: NavItemProps) => {
    const { url } = usePage();

    return (
        <motion.span variants={itemVariants}>
            <Link
                className={cn(
                    'text-7xl leading-none font-light text-slate-900 transition-all hover:font-semibold lg:text-[122px]',
                    url === props.href ? 'font-semibold' : '',
                    className,
                )}
                {...props}
            >
                {title}
            </Link>
        </motion.span>
    );
};

export default NavItem;
