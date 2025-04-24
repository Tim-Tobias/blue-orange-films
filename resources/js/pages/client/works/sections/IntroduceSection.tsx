import AppFrontContainer from '@/components/app-front-container';

const IntroduceSection = () => {
    return (
        <AppFrontContainer>
            <div className="absolute top-0 left-0 h-[80vh] w-full">
                <img className="h-full w-full object-cover" src="https://picsum.photos/id/302/200/300" alt="" />
            </div>

            <div className="relative grid h-full w-full grid-cols-1 place-items-center">
                <h1 data-aos="fade-right" data-aos-delay="600" className="text-5xl font-semibold">
                    Works
                </h1>
            </div>
        </AppFrontContainer>
    );
};

export default IntroduceSection;
