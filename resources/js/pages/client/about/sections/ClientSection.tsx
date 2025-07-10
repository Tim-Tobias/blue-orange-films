import { AppFrontWrapper } from '@/components/app-front-wrapper';
import { Client } from '@/types';

interface ClientSectionProps {
    client?: Client;
}

const ClientSection = ({ client }: ClientSectionProps) => {
    return (
        <AppFrontWrapper className='p-5'>
            <div className="space-y-10 py-12">
                <h3 data-aos="fade-left" data-aos-delay={100} className="text-center text-2xl font-bold uppercase">
                    Our Client
                </h3>

                <div data-aos="fade-right" data-aos-delay={200} className="grid w-full grid-cols-1 place-items-center">
                    {client && <img className="object-cover transition-all hover:opacity-60" src={client.image_url} alt="logo" />}
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default ClientSection;
