import { AppFrontWrapper } from '@/components/app-front-wrapper';
import BlueOrangeLogo from '@/images/BLUE ORANGE LOGO - STANDARD.png';
import IntroduceLayout from '@/layouts/client/IntroduceLayout';

const AboutSection = () => {
    return (
        <>
            <IntroduceLayout imgUrl="https://picsum.photos/id/352/200/300" title="About" />

            <AppFrontWrapper>
                <div className="grid grid-cols-1 items-center gap-10 pb-10 md:grid-cols-2">
                    <img data-aos="fade-up" data-aos-delay="100" src={BlueOrangeLogo} alt="Company Logo" className="mx-auto block w-64 md:hidden" />
                    <img data-aos="fade-left" data-aos-delay="50" src={BlueOrangeLogo} alt="Company Logo" className="hidden md:block" />

                    <p data-aos="fade-right" className="text-center md:text-left">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat atque eos omnis nihil consectetur officia asperiores ipsam,
                        iusto magnam aperiam impedit dicta error voluptate quae culpa esse nobis fuga exercitationem dolorum et sunt velit! Hic
                        dolores minus laboriosam vero deleniti cupiditate doloribus reprehenderit. Accusantium ipsum fugiat amet eligendi temporibus
                        magni!
                    </p>
                </div>
            </AppFrontWrapper>
        </>
    );
};

export default AboutSection;
