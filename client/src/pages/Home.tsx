import Banner from "@/components/modules/home/sections/Banner";
import TrustedBy from "@/components/modules/home/sections/TrustedBy";
import Categories from "@/components/modules/home/sections/Categories";
import PostJobs from "@/components/modules/home/sections/PostJobs";
import FeaturedJobs from "@/components/modules/home/sections/FeaturedJobs";
import LatestJobs from "@/components/modules/home/sections/LatestJobs";
import Footer from "@/components/modules/home/sections/Footer";

const HomePage = () => {
  return (
    <main className='min-h-screen'>
      <Banner />
      <TrustedBy />
      <Categories />
      <PostJobs />
      <FeaturedJobs />
      <LatestJobs />
      <Footer />
    </main>
  );
};

export default HomePage;
