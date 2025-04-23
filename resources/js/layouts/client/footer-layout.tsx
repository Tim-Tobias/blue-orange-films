import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CompanyLogoFooter from '@/components/company-logo-footer';
import FooterMenu from '@/components/footer-menu';

const FooterLayout = () => {
    return (
        <footer className="bg-[#252D37]">
            <AppFrontWrapper className="flex justify-between">
                <CompanyLogoFooter />
                <FooterMenu />
            </AppFrontWrapper>
        </footer>
    );
};

export default FooterLayout;
