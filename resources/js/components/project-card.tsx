interface ProjectCardProps {
    imageUrl: string;
    title: string;
}

const ProjectCard = ({ imageUrl, title }: ProjectCardProps) => {
    return (
        <div className="group relative h-62 w-62 cursor-pointer overflow-hidden rounded-lg shadow-lg">
            <img
                src={imageUrl}
                alt={title}
                className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
            />
        </div>
    );
};

export default ProjectCard;
