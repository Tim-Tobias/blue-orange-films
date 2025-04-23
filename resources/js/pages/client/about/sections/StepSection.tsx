import { AppFrontWrapper } from '@/components/app-front-wrapper';
import Step from '@/components/step';
import StepMobile from '@/components/step-mobile';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
    {
        number: 1,
        title: 'Gathering information',
        description: 'We listen to your wants and needs for your dream space and dig deeper into the details.',
    },
    {
        number: 2,
        title: 'Design concept',
        description: 'The research gathered is conceptualized and formed into design possibilities.',
    },
    {
        number: 3,
        title: 'Space planning',
        description: 'A precise layout is created to locate the exact placement of the furniture and equipment.',
    },
    {
        number: 4,
        title: 'Design development',
        description: 'We explore and select the best personalized design to produce the most pleasing result.',
    },
    {
        number: 5,
        title: 'Interior construction',
        description: 'Construction is started with a detailed timeline and consistent site visits for quality control.',
    },
    {
        number: 6,
        title: 'Handover!',
        description: 'The project is done and after-sales service is provided to ensure your satisfaction.',
    },
];

const StepSection = () => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
        delay: 1000,
    });

    return (
        <AppFrontWrapper>
            <div ref={ref} className="relative my-10 hidden h-[130vh] overflow-hidden lg:block">
                <motion.div
                    className="absolute top-0 w-[40%]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 * 0.1 }}
                >
                    <Step description={steps[0].description} title={steps[0].title} number={steps[0].number} />
                </motion.div>

                <motion.div
                    className="absolute top-[20%] left-1/2 w-[40%] -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 2 * 0.1 }}
                >
                    <Step description={steps[1].description} title={steps[1].title} number={steps[1].number} />
                </motion.div>

                <motion.div
                    className="absolute top-[40%] right-0 w-[40%]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 3 * 0.1 }}
                >
                    <Step description={steps[2].description} title={steps[2].title} number={steps[2].number} />
                </motion.div>

                <motion.div
                    className="absolute top-[55%] left-0 w-[40%]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 4 * 0.1 }}
                >
                    <Step description={steps[3].description} title={steps[3].title} number={steps[3].number} />
                </motion.div>

                <motion.div
                    className="absolute bottom-10 left-1/2 w-[40%] -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 5 * 0.1 }}
                >
                    <Step description={steps[4].description} title={steps[4].title} number={steps[4].number} />
                </motion.div>

                <motion.div
                    className="absolute right-0 bottom-[25%] w-[40%]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 5 * 0.1 }}
                >
                    <Step description={steps[5].description} title={steps[5].title} number={steps[5].number} />
                </motion.div>
            </div>

            <div className="relative block pb-10 lg:hidden">
                <div className="grid grid-cols-1 gap-5">
                    {steps.map((val, index) => (
                        <StepMobile description={val.description} number={val.number} title={val.title} key={index} />
                    ))}
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default StepSection;
