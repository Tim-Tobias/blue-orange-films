import { Link } from '@inertiajs/react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const SocialMediaFooter = () => {
    return (
        <div className="flex items-center gap-5 text-white">
            <Link href="#" rel="noopenner">
                <FaInstagram className="text-xl" />
            </Link>

            <Link href="#" rel="noopenner">
                <FaYoutube className="text-xl" />
            </Link>

            <Link href="#" rel="noopenner">
                <FaFacebook className="text-xl" />
            </Link>

            <Link href="#" rel="noopenner">
                <FaLinkedin className="text-xl" />
            </Link>
        </div>
    );
};

export default SocialMediaFooter;
