import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const testimonials = [
  {
    picture: "/danny.jpeg",
    name: "Cao Dat Nguyen",
    nickname: "(Danny)",
  },
  {
    picture: "/jessie.jpeg",
    name: "Chonthica Pai-ngam",
    nickname: "(Jessie)",
  },
  {
    picture: "/emoney.jpg",
    name: "Edmon Hundubey",
    nickname: "(Emoney)",
  },
  {
    picture: "/jt.jpg",
    name: "Jesse Thomas",
    nickname: "(JT)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <Layout>
      <div className='mt-[90px] px-4 xl:px-20'>
        <div className='relative mt-20 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='text-white'>
            {/* <h1 className='text-main-darkPink text-3xl md:text-4xl font-bold mb-4'>
              About Us
            </h1> */}
            <h2 className='large-h1-span text-2xl md:text-3xl font-bold tracking-wide'>
              Who We Are
            </h2>
            <p className='text-lg md:text-xl leading-relaxed'>
              We are a team of passionate individuals dedicated to
              revolutionizing the way you manage your finances. With our
              innovative scanning and intelligent OCR technology, we strive to
              make budgeting and expense tracking seamless and efficient. Our
              goal is to empower users with tools that simplify financial
              management and promote better decision-making.
            </p>
            <p className='mt-4 text-lg md:text-xl leading-relaxed'>
              Our journey began with a simple yet powerful idea: to make
              financial management accessible and efficient for everyone. With a
              focus on user experience and innovation, we strive to deliver
              tools that not only streamline financial tasks but also enhance
              financial literacy and decision-making.
            </p>
          </div>

          <div className='relative h-[300px] lg:h-[650px]'>
            <img
              src='/about-us.jpg'
              alt='About Background'
              className='absolute left-0 object-cover rounded-lg h-full z-0 w-full'
            />
          </div>
        </div>

        <div className='mt-8 text-white'>
          <section className='mt-8'>
            <h2 className='large-h1-span text-2xl md:text-3xl font-bold tracking-wide'>
              Our Mission
            </h2>
            <p className='text-base md:text-lg leading-relaxed'>
              Our mission is to provide users with the tools they need to gain
              control over their finances. By leveraging cutting-edge
              technology, we aim to simplify the process of tracking expenses
              and managing budgets, enabling our users to make informed
              financial decisions.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='large-h1-span text-2xl md:text-3xl font-bold tracking-wide'>
              Our Vision
            </h2>
            <p className='text-base md:text-lg leading-relaxed'>
              We envision a world where managing personal finances is no longer
              a chore but a streamlined and intuitive experience. Through
              continuous innovation and user-centric design, we aim to set the
              standard for financial management solutions.
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='large-h1-span text-2xl md:text-3xl font-bold tracking-wide'>
              Contact Us
            </h2>
            <p className='text-base md:text-lg leading-relaxed'>
              Have questions or feedback? We'd love to hear from you! Reach out
              to us at{" "}
              <a
                href='mailto:leaveusalone@teamtitan.com'
                className='text-blue-500 underline'
              >
                leaveusalone@teamtitan.com
              </a>
            </p>
          </section>

          <section className='mt-8'>
            <h2 className='large-h1-span text-2xl md:text-3xl font-bold tracking-wide'>
              Support Us
            </h2>
            <p className='text-base md:text-lg leading-relaxed'>
              Click here to{" "}
              <Link to='/donate' className='text-blue-500 underline'>
                donate
              </Link>{" "}
              to our cause!
            </p>
          </section>

          <section className='py-12 mt-12 sm:py-16 lg:py-20 border-y border-main-neonPink'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='text-center'>
                <h2 className='large-h1-span text-4xl sm:text-5xl xl:text-6xl font-bold'>
                  Meet Our Capstone Team
                </h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                className='grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4'
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className='text-center'
                  >
                    <img
                      className='w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44'
                      src={testimonial.picture}
                      alt={`${testimonial.name}'s profile`}
                    />
                    <p className='mt-5 text-xl font-bold text-white'>
                      {testimonial.name}
                    </p>
                    <p className='mt-2 text-base text-gray-600'>
                      {testimonial.nickname}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
