import api from '@/services/axiosClient';
import { Social } from '@/types';
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
        instagram: { id: 0, link: '', name: '', is_active: true },
        youtube: { id: 0, link: '', name: '', is_active: true },
        linkedin: { id: 0, link: '', name: '', is_active: true },
        email: { id: 0, link: '', name: '', is_active: true },
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
                <a target="_blank" rel="noopener noreferrer" href={data.instagram.link!}>
                    <FaInstagram className="text-xl" />
                </a>
            )}

            {data?.youtube && (
                <a target="_blank" rel="noopener noreferrer" href={data.youtube.link!}>
                    <FaYoutube className="text-xl" />
                </a>
            )}

            {data?.linkedin && (
                <a target="_blank" rel="noopener noreferrer" href={data.linkedin.link!}>
                    <FaLinkedin className="text-xl" />
                </a>
            )}

            {data?.email && (
                <a target="_blank" rel="noopener noreferrer" href={`mailto:${data.email.link!}`}>
                    <CgMail className="text-2xl" />
                </a>
            )}
        </div>
    );
};

export default SocialMediaFooter;
