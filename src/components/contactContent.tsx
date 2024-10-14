'use client'
import React from 'react';
import Image from 'next/image';
import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const ContactContent = () => {
  return (
    <section className="blog-single">
      <div className="container mx-auto p-4">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="blog-single__left">
              <Card className="bg-white p-8 shadow-md rounded mb-20">
                <Typography className="mb-20">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    {/* <div>
                        <Image
                            src="/about.svg"
                            layout="responsive"
                            width={100}
                            height={100} 
                            alt="About"
                            className="w-full h-auto"
                        />
                    </div> */}
                    <div>
                        <Text className="font-bold">Contact</Text>
                        <Title level={2}>Reach out to us</Title>
                        <Paragraph>
                            At Lexpulse, a proud subsidiary of Fardotec Ltd., we are committed to providing seamless networking and event solutions tailored to your needs. Whether you have a question, need support, or want to explore partnership opportunities, our team is here to assist you every step of the way. Get in touch with us today, and let&apos;s work together to make your next event unforgettable. You can reach us via email, phone, or by filling out the contact form on our website. We look forward to hearing from you!
                        </Paragraph>
                        <Paragraph>
                            <Text className="font-bold">Email</Text> <br /><a href='mailto:hello@fadorteclimited.com'>hello@fadorteclimited.com</a>
                        </Paragraph>
                    </div>
                  </div>
                </Typography>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;