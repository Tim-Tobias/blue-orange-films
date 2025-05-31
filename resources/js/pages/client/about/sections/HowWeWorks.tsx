import { AppFrontWrapper } from '@/components/app-front-wrapper';
import { Hww } from '@/types';
import parse from 'html-react-parser';

interface HowWorksProps {
    hww?: Hww;
}

const HowWorks = ({ hww }: HowWorksProps) => {
    return (
        <AppFrontWrapper className="space-y-5 pb-20">
            <h5 data-aos="fade-left" data-aos-delay="500" className="text-center text-2xl font-bold uppercase md:text-left">
                How We Works
            </h5>
            <div data-aos="fade-left" data-aos-delay="500" className="text-center md:w-[50%] md:text-left">
                {parse(hww?.content || '')}
            </div>
        </AppFrontWrapper>
    );
};

export default HowWorks;
