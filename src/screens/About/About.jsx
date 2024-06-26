import React from "react";
import Layout from "../Layout/Layout";
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
      <div className="mt-[90px] px-4 xl:px-20">
        <div className="text-center py-12">
          <h2 className="large-h1-span text-4xl sm:text-5xl xl:text-6xl font-bold">
            About Us
          </h2>
        </div>

        <section className="py-12 sm:py-16 lg:py-20 border-y border-main-neonPink">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="large-h1-span text-4xl sm:text-5xl xl:text-6xl font-bold">
                Meet Our Capstone Team
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <img
                    className="w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44"
                    src={testimonial.picture}
                    alt={`${testimonial.name}'s profile`}
                  />
                  <p className="mt-5 text-xl font-bold text-white">
                    {testimonial.name}
                  </p>
                  <p className="mt-2 text-base text-gray-600">
                    {testimonial.nickname}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="mt-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="mt-8 lg:mt-0 flex flex-col justify-between">
              <div>
                <h2 className="large-h1-span text-2xl md:text-3xl font-bold tracking-wide">
                  Who We Are
                </h2>
                <p className="text-lg md:text-xl leading-relaxed">
                  We are a team of passionate individuals dedicated to revolutionizing the way you manage your finances. With our innovative scanning and intelligent OCR technology, we strive to make budgeting and expense tracking seamless and efficient. Our goal is to empower users with tools that simplify financial management and promote better decision-making.
                </p>
                <p className="mt-4 text-lg md:text-xl leading-relaxed">
                  Our journey began with a simple yet powerful idea: to make financial management accessible and efficient for everyone. With a focus on user experience and innovation, we strive to deliver tools that not only streamline financial tasks but also enhance financial literacy and decision-making.
                </p>
              </div>
            </section>

            <section className="mt-8 lg:mt-0 flex flex-col justify-between">
              <div>
                <h2 className="large-h1-span text-2xl md:text-3xl font-bold tracking-wide">
                  Our Mission
                </h2>
                <p className="text-base md:text-xl leading-relaxed">
                  Our mission is to provide users with the tools they need to gain control over their finances. By leveraging cutting-edge technology, we aim to simplify the process of tracking expenses and managing budgets, enabling our users to make informed financial decisions.
                </p>
                <p className="mt-4 text-base md:text-xl leading-relaxed">
                  We strive to create an ecosystem where financial independence and literacy are accessible to everyone. Our mission is driven by a commitment to innovation, user-centric design, and a deep understanding of the financial challenges faced by individuals and businesses alike.
                </p>
              </div>
            </section>

            <section className="mt-8 lg:mt-0 flex flex-col justify-between">
              <div>
                <h2 className="large-h1-span text-2xl md:text-3xl font-bold tracking-wide">
                  Our Vision
                </h2>
                <p className="text-base md:text-xl leading-relaxed">
                  We envision a world where managing personal finances is no longer a chore but a streamlined and intuitive experience. Through continuous innovation and user-centric design, we aim to set the standard for financial management solutions.
                </p>
                <p className="mt-4 text-base md:text-xl leading-relaxed">
                  Our vision is to transform financial management into a seamless experience that empowers users to take control of their financial futures. We are committed to evolving with the needs of our users and leveraging the latest technologies to provide unmatched value.
                </p>
              </div>
            </section>

            <section className="mt-8 lg:mt-0 flex flex-col justify-between">
              <div >
                <h2 className="large-h1-span text-2xl md:text-3xl font-bold tracking-wide">
                  Support Us
                </h2>
                <p className="text-base md:text-xl leading-relaxed">
                  Click here to{" "}
                  <a href="https://buy.stripe.com/8wM9CP6N78Fh21q5kk" className="text-blue-500 underline">
                    donate
                  </a>{" "}
                  to our cause!
                </p>
                <p className="mt-4 text-base md:text-xl leading-relaxed">
                  Your support helps us to continue innovating and improving our tools for financial management. Every contribution makes a difference and helps us achieve our mission to make financial literacy and independence accessible to all. Thank you for your generosity!
                </p>
              </div>
            </section>
          </div>

          <div className="relative h-[300px] lg:h-[650px] mt-8">
            <img
              src="/about-us.jpg"
              alt="About Background"
              className="absolute left-0 object-cover rounded-lg h-full z-0 w-full"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
