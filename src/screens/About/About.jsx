import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Layout>
      <div className='mt-[90px]'>
        <div className='px-4 xl:px-20'>
          <div className='relative h-[300px] lg:h-[700px] w-full mt-[1rem] flex items-start justify-between'>
            <h1 className='main-span font-bold mt-4 tracking-wider z-10 w-[55%] lg:w-[70%] right-0 text-right px-4 xl:px-20'>
              About Us
            </h1>
            <img
              src='/about-us.jpg'
              alt='About Background'
              className='absolute left-0 object-cover rounded-lg h-full z-0 w-[50%] '
            />
          </div>

          <div className='mt-0.5 text-white'>
            <section className='mt-0.5 '>
              <h2 className='large-h1-span my-2 text-lg md:text-2xl font-bold tracking-wide'>
                Who We Are
              </h2>
              <p className='text-base md:text-lg leading-relaxed'>
                We are a team of passionate individuals dedicated to
                revolutionizing the way you manage your finances. With our
                innovative scanning and intelligent OCR technology, we strive to
                make budgeting and expense tracking seamless and efficient.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='large-h1-span my-2 text-lg md:text-2xl font-bold tracking-wide'>
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
              <h2 className='large-h1-span my-2 text-lg md:text-2xl font-bold tracking-wide'>
                Our Vision
              </h2>
              <p className='text-base md:text-lg leading-relaxed'>
                We envision a world where managing personal finances is no
                longer a chore but a streamlined and intuitive experience.
                Through continuous innovation and user-centric design, we aim to
                set the standard for financial management solutions.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='large-h1-span my-2 text-lg md:text-2xl font-bold tracking-wide'>
                Contact Us
              </h2>
              <p className='text-base md:text-lg leading-relaxed'>

                Have questions or feedback? We'd love to hear from you! Reach
                out to us at{" "}
                <a
                  href='mailto:leaveusalone@teamtitan.com'
                  className='text-blue-500 underline'
                >
                  leaveusalonet@teamtitan.com
                </a>
                
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='large-h1-span my-2 text-lg md:text-2xl font-bold tracking-wide'>
                Wanna Support Us?
              </h2>
              <p className='text-base md:text-lg leading-relaxed'>
                Click here to{" "}
                <Link to='/donate' className='text-blue-500 underline'>
                  donate
                </Link>{" "}
                to our cause!
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
