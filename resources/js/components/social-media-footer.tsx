import api from '@/services/axiosClient';
import { Social } from '@/types';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CgMail } from 'react-icons/cg';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

interface SocialMediaFooterProps {
    color: 'white' | 'black';
}

const SocialMediaFooter = ({ color }: SocialMediaFooterProps) => {
    const [data, setData] = useState<{
        instagram: Social;
        youtube: Social;
        linkedin: Social;
        email: Social;
    }>({
        instagram: { id: 0 },
        youtube: { id: 0 },
        linkedin: { id: 0 },
        email: { id: 0 },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.get('/socials');
                setData(() => ({
                    ...data.data,
                }));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`flex items-center gap-5 text-${color}`}>
            {data?.instagram && (
                <Link rel="noopener noreferrer" href={data.instagram.link!}>
                    <FaInstagram className="text-xl" />
                </Link>
            )}

            {data?.youtube && (
                <Link rel="noopener noreferrer" href={data.youtube.link!}>
                    <FaYoutube className="text-xl" />
                </Link>
            )}

            {data?.linkedin && (
                <Link rel="noopener noreferrer" href={data.linkedin.link!}>
                    <FaLinkedin className="text-xl" />
                </Link>
            )}

            {data?.email && (
                <Link rel="noopener noreferrer" href={`mailto:${data.email.link!}`}>
                    <CgMail className="text-2xl" />
                </Link>
            )}
        </div>
    );
};

export default SocialMediaFooter;
