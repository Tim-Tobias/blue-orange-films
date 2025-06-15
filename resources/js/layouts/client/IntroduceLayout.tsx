import AppFrontContainer from '@/components/app-front-container';

interface IntroduceLayoutProps {
    imgUrl: string;
    title: string;
}

const IntroduceLayout = ({ imgUrl, title }: IntroduceLayoutProps) => {
    return (
        <AppFrontContainer>
            <div data-aos="fade-in" data-aos-delay={300} className="absolute top-0 left-0 h-[80vh] w-full">
                <img className="h-full w-full object-cover" src={imgUrl} alt="" />
            </div>

            <div data-aos="fade-in" data-aos-delay={400} className="absolute top-0 left-0 h-[80vh] w-full bg-black opacity-40" />

            <div className="relative grid h-full w-full grid-cols-1 place-items-center">
                <h1 data-aos="fade-right" data-aos-delay={500} className="text-5xl font-semibold text-white">
                    {title}
                </h1>
            </div>
        </AppFrontContainer>
    );
};

export default IntroduceLayout;
