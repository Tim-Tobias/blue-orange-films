import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CardService from '@/components/card-service';
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

const ServiceSection = () => {
    return (
        <AppFrontWrapper className="space-y-15 pb-20">
            <h4 data-aos="fade-in" data-aos-delay="100" className="text-center text-2xl font-bold uppercase">
                Our Services
            </h4>
            <div className="grid grid-cols-1 place-content-center gap-10 md:grid-cols-3">
                {ServiceList.map((item, index) => (
                    <Link href="#" key={index} data-aos="fade-left" data-aos-delay={index * 100}>
                        <CardService imageUrl={item.imageUrl} title={item.title} tags={item.categories} />
                    </Link>
                ))}
            </div>
        </AppFrontWrapper>
    );
};

export default ServiceSection;
