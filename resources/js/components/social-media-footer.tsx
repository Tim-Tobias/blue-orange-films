import api from '@/services/axiosClient';
import { Social } from '@/types';
import { useEffect, useState } from 'react';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

interface SocialMediaFooterProps {
    color: 'white' | 'black';
}

const SocialMediaFooter = ({ color }: SocialMediaFooterProps) => {
    const [data, setData] = useState<{
        instagram: Social;
        youtube: Social;
        linkedin: Social;
    }>({
        instagram: { id: 0 },
        youtube: { id: 0 },
        linkedin: { id: 0 },
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
                <a href={data.instagram.link!} rel="noopenner" target="_blank">
                    <FaInstagram className="text-xl" />
                </a>
            )}

            {data?.youtube && (
                <a href={data.youtube.link!} rel="noopenner" target="_blank">
                    <FaYoutube className="text-xl" />
                </a>
            )}

            {data?.linkedin && (
                <a href={data.linkedin.link!} rel="noopenner" target="_blank">
                    <FaLinkedin className="text-xl" />
                </a>
            )}
        </div>
    );
};

export default SocialMediaFooter;
