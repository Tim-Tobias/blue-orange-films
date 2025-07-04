import SocialMediaFooter from '@/components/social-media-footer';

const FooterLayout = () => {
    return (
        <footer className="bg-[#1E4E79]">
            <div className="mx-auto grid max-w-[1570px] px-5 grid-cols-1 items-center gap-5 py-5 md:grid-cols-2 md:justify-between md:gap-10">
                <div className="flex items-center justify-between gap-5 pl-5">
                    <SocialMediaFooter color="white" />
                </div>

                <p className="justify-self-center text-white md:justify-self-end">© 2025 Blue Orange Films</p>
            </div>
        </footer>
    );
};

export default FooterLayout;
