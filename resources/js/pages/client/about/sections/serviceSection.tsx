import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CardService from '@/components/card-service';
import { Service } from '@/types';
import { Link } from '@inertiajs/react';

const ServiceList = [
    {
        imageUrl: 'https://picsum.photos/id/250/200/300',
        title: 'Lorem Ipsum',
        categories: [
            {
                name: 'Lorem',
            },
            {
                name: 'Ipsum',
            },
        ],
    },
    {
        imageUrl: 'https://picsum.photos/id/251/200/300',
        title: 'Lorem Ipsum',
        categories: [
            {
                name: 'Lorem',
            },
            {
                name: 'Ipsum',
            },
        ],
    },
    {
        imageUrl: 'https://picsum.photos/id/252/200/300',
        title: 'Lorem Ipsum',
        categories: [
            {
                name: 'Lorem',
            },
            {
                name: 'Ipsum',
            },
        ],
    },
];

interface ServiceSectionProps {
    services: Service[];
}

const ServiceSection = ({ services }: ServiceSectionProps) => {
    return (
        <AppFrontWrapper className="space-y-15 pb-20">
            <h4 data-aos="fade-in" data-aos-delay="100" className="text-center text-2xl font-bold uppercase">
                Our Services
            </h4>
            <div className="grid grid-cols-1 place-content-center gap-10 md:grid-cols-3">
                {services.map((item, index) => (
                    <Link href="#" key={index} data-aos="fade-left" data-aos-delay={index * 100}>
                        <CardService imageUrl={item.image_url!} title={item.title!} />
                    </Link>
                ))}
            </div>
        </AppFrontWrapper>
    );
};

export default ServiceSection;
