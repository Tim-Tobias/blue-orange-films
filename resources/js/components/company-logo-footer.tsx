import BlueOrangeLogo from '@/images/BLUE ORANGE LOGO - STANDARD (VERTICAL).png';
import { Link } from '@inertiajs/react';

const CompanyLogoFooter = () => {
    return (
        <Link href="/">
            <img src={BlueOrangeLogo} className="w-24" alt="Company Logo" />
        </Link>
    );
};

export default CompanyLogoFooter;
