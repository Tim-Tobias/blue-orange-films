import { Link } from '@inertiajs/react';

const FooterMenu = () => {
    return (
        <div className="space-y-2 text-white">
            <div className="flex justify-center gap-1">
                <Link href="/">Home |</Link>
                <Link href="/">About |</Link>
                <Link href="/">Works |</Link>
                <Link href="/">Contact</Link>
            </div>

            <p>© 2025 Klesis Bocilos All Right Reserved.</p>
        </div>
    );
};

export default FooterMenu;
