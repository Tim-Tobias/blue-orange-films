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
        <AppFrontWrapper>
            <div className="space-y-10 py-25">
                <h1 className="text-center md:text-3xl">Latest Work</h1>

                <div className="flex justify-between">
                    {ProjectList.map((val, index) => (
                        <ProjectCard imageUrl={val.imageUrl} title={val.title} key={index} />
                    ))}
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default ProjectSection;
