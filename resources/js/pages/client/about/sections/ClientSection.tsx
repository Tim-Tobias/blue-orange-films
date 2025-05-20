import { AppFrontWrapper } from '@/components/app-front-wrapper';
import { Client } from '@/types';

interface ClientSectionProps {
    client: Client;
}

const ClientSection = ({ client }: ClientSectionProps) => {
    return (
        <AppFrontWrapper>
            <div className="space-y-10 py-12">
                <h3 className="text-center text-2xl font-bold uppercase">Our Client</h3>

                <div className="grid w-full grid-cols-1 place-items-center">
                    {client && <img className="h-34 w-34 object-cover transition-all hover:opacity-60" src={client.image_url} alt="logo" />}
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default ClientSection;
