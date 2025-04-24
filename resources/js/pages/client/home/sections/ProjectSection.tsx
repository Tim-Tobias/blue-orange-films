import { AppFrontWrapper } from '@/components/app-front-wrapper';
import ProjectCard from '@/components/project-card';

const ProjectList = [
    {
        imageUrl: 'https://picsum.photos/id/237/200/300',
        title: 'Lorem Ipsum',
    },
    {
        imageUrl: 'https://picsum.photos/id/238/200/300',
        title: 'Lorem Ipsum',
    },
    {
        imageUrl: 'https://picsum.photos/id/239/200/300',
        title: 'Lorem Ipsum',
    },
    {
        imageUrl: 'https://picsum.photos/id/240/200/300',
        title: 'Lorem Ipsum',
    },
];

const ProjectSection = () => {
    return (
        <AppFrontWrapper className="overflow-hidden">
            <div className="space-y-10 py-12 md:py-25">
                <h1 data-aos="fade-right" data-aos-delay="50" className="text-center md:text-3xl">
                    Latest Work
                </h1>

                <div className="flex flex-col justify-between gap-5 md:flex-row">
                    {ProjectList.map((val, index) => (
                        <div key={index} data-aos="fade-left" data-aos-delay={index * 100}>
                            <ProjectCard imageUrl={val.imageUrl} title={val.title} />
                        </div>
                    ))}
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default ProjectSection;
