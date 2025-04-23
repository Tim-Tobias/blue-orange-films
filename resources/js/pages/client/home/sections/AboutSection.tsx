import { AppFrontWrapper } from '@/components/app-front-wrapper';
import { limitText } from '@/helpers/limit_text';
import { Link } from '@inertiajs/react';

const AboutSection = () => {
    return (
        <AppFrontWrapper>
            <div className="grid w-full grid-cols-1 gap-5 py-32 md:grid-cols-2">
                <div className="space-y-3">
                    <h6 className="text-2xl font-bold">About BOF</h6>
                    <p>
                        {limitText(
                            `      
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolorum hic consectetur praesentium qui eum sequi distinctio nesciunt explicabo natus illum exercitationem impedit, labore dicta corrupti ea esse voluptate similique ab doloribus asperiores ipsam. Maxime, accusantium rerum laboriosam molestiae eos aperiam vel similique temporibus possimus ullam illo doloremque tenetur sint?
                      `,
                            310,
                        )}
                        <Link href="/about" className="text-blue-500 hover:underline">
                            Read more
                        </Link>
                    </p>
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default AboutSection;
