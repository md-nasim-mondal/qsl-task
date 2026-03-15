"use client";
import Image from "next/image";
import sidebarImg from "../../../../../public/assets/images/Dashboard-Company.svg";
import dashboardImg from "../../../../../public/assets/images/Content.png";
import Container from "@/components/shared/Container";

const PostJobs = () => {
  return (
    <section className='w-full bg-white'>
      <Container className="overflow-hidden">
        <div className='px-2 py-24 md:p-18 md:pb-0 bg-primary overflow-hidden flex flex-col md:flex-row items-center'>
          {/* Left Text */}
          <div className='flex-1 flex flex-col justify-end'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-3'>
              Start posting <br /> jobs today
            </h2>
            <p className='text-white text-sm md:text-base mb-8 max-w-xs leading-relaxed font-medium'>
              Start posting jobs for only $10.
            </p>
            <button className='bg-white text-primary font-bold text-base px-7 py-3 hover:bg-indigo-50 transition-colors max-w-45'>
              Sign Up for free
            </button>
          </div>

          {/* Right Illustration */}
          <div className='md:flex-1 '>
            <div className='flex items-baseline-last relative w-full overflow-hidden mt-5'>
              {/* Dashboard mockup */}
              <Image
                className='w-26.5 h-87.5 md:h-127.5 md:absolute md:-top-22'
                src={sidebarImg}
                alt='sidebar mockup Img'
              />
              <div className='w-[80%] bg-white ml-auto'>
                <Image
                  className='h-86.5'
                  src={dashboardImg}
                  alt='dashboard mockup img'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='absolute -top-50 -left-10 w-40 h-80 bg-white rotate-60'></div>
        <div className='absolute -bottom-50 -right-10 w-40 h-80 bg-white rotate-60'></div>
      </Container>
    </section>
  );
};

export default PostJobs;
