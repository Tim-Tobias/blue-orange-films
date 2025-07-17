import SocialMediaFooter from '@/components/social-media-footer';

const FooterLayout = () => {
    return (
        <footer className="bg-[#1E4E79]">
            <div className="mx-auto flex max-w-[1570px] flex-col items-center justify-center gap-5 p-5 md:flex-row md:justify-between">
                <SocialMediaFooter color="white" />

                <p className="text-white">© 2025 Blue Orange Films</p>
            </div>
        </footer>
    );
};

export default FooterLayout;
