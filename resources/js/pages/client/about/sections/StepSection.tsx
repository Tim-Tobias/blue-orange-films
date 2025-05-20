import { AppFrontWrapper } from '@/components/app-front-wrapper';
import Step from '@/components/step';
import StepMobile from '@/components/step-mobile';
import { Workflow } from '@/types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StepSectionProps {
    steps: Workflow[];
}

const StepSection = ({ steps }: StepSectionProps) => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
        delay: 1000,
    });

    return (
        <AppFrontWrapper>
            <div ref={ref} className="relative my-10 hidden h-[130vh] overflow-hidden lg:block">
                {steps[0] && (
                    <motion.div
                        className="absolute top-10 left-10 w-[30%] transition-all hover:scale-110"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1 * 0.3 }}
                    >
                        <Step description={steps[0].desc} title={steps[0].title} number={steps[0].order} />
                    </motion.div>
                )}

                {steps[1] && (
                    <motion.div
                        className="absolute top-[20%] left-1/2 w-[40%] -translate-x-1/2 transition-all hover:scale-110"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 2 * 0.3 }}
                    >
                        <Step description={steps[1].desc} title={steps[1].title} number={steps[1].order} />
                    </motion.div>
                )}

                {steps[2] && (
                    <motion.div
                        className="absolute top-[40%] right-0 w-[40%] transition-all hover:scale-110"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 3 * 0.3 }}
                    >
                        <Step description={steps[2].desc} title={steps[2].title} number={steps[2].order} />
                    </motion.div>
                )}

                {steps[3] && (
                    <motion.div
                        className="absolute top-[55%] left-10 w-[40%] transition-all hover:scale-110"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 4 * 0.3 }}
                    >
                        <Step description={steps[3].desc} title={steps[3].title} number={steps[3].order} />
                    </motion.div>
                )}

                {steps[5] && (
                    <motion.div
                        className="absolute bottom-10 left-1/2 w-[40%] -translate-x-1/2 transition-all hover:scale-110"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 5 * 0.3 }}
                    >
                        <Step description={steps[5].desc} title={steps[5].title} number={steps[5].order} />
                    </motion.div>
                )}

                {steps[4] && (
                    <motion.div
                        className="absolute right-0 bottom-[25%] w-[40%] transition-all hover:scale-110"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 6 * 0.3 }}
                    >
                        <Step description={steps[4].desc} title={steps[4].title} number={steps[4].order} />
                    </motion.div>
                )}
            </div>

            <div className="relative block pb-10 lg:hidden">
                <div className="grid grid-cols-1 gap-5">
                    {steps.map((val, index) => (
                        <StepMobile description={val.desc} number={val.order} title={val.title} key={index} />
                    ))}
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default StepSection;
