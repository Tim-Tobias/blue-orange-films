import BlueOrangeLogo from '@/images/BLUE ORANGE LOGO - STANDARD.png';
import { Link } from '@inertiajs/react';

const CompanyLogo = () => {
    return (
        <Link href="/">
            <img data-aos="fade-left" data-aos-delay="500" src={BlueOrangeLogo} className="w-42" alt="Company Logo" />
        </Link>
    );
};

export default CompanyLogo;
