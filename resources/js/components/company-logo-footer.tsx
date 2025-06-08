import BlueOrangeLogo from '@/images/BLUE ORANGE LOGO - MONOCHROME.png';
import { Link } from '@inertiajs/react';

const CompanyLogoFooter = () => {
    return (
        <Link href="/">
            <img src={BlueOrangeLogo} className="w-26" alt="Company Logo" />
        </Link>
    );
};

export default CompanyLogoFooter;
