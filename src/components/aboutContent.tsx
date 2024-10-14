'use client'
import React from 'react';
import Image from 'next/image';
import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const AboutContent = () => {
  return (
    <section className="blog-single">
      <div className="container mx-auto p-4">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="blog-single__left">
              <Card className="bg-white p-8 shadow-md rounded">
                <Typography className="mb-20">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                        <Image
                            src="/about.svg"
                            layout="responsive"
                            width={100}
                            height={100} 
                            alt="About"
                            className="w-full h-auto"
                        />
                    </div>
                    <div>
                        <Text className="font-bold">About Lexpulse</Text>
                        <Title level={2}>Seamless Networking & Socialization</Title>
                        <Paragraph>
                            Lexpulse facilitates effortless networking by intelligently connecting attendees based on shared interests, ensuring that every social event becomes an opportunity to expand your professional and social circles. You get to discover like-minded individuals, fostering meaningful connections.
                        </Paragraph>
                        <Paragraph>
                            <Text className="font-bold">Effortless Planning & Coordination</Text> <br />Simplify event planning with our intuitive coordination tools. From creating invitations to managing RSVPs and organizing logistics, our app streamlines the entire process, empowering event hosts to focus on creating memorable experiences rather than dealing with the complexities of coordination.
                        </Paragraph>
                    </div>
                  </div>
                </Typography>

                <div className="mt-4">
                    <div className="relative" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', position: 'relative' }}>
                      <iframe
                        src="https://www.youtube.com/embed/guyHbtlkB7Y"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;