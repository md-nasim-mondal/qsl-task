import vodafoneIcon from "../../../../../public/assets/logo/vodafone-2017-logo.png";
import intelIcon from "../../../../../public/assets/logo/intel-3.png";
import teslaIcon from "../../../../../public/assets/logo/tesla-9.png";
import amdIcon from "../../../../../public/assets/logo/amd-logo-1.png";
import talkitIcon from "../../../../../public/assets/logo/talkit_1.png";
import Image from "next/image";
import Container from "@/components/shared/Container";

const brands = [vodafoneIcon, intelIcon, teslaIcon, amdIcon, talkitIcon];

const TrustedBy = () => {
  return (
    <section className='w-full py-8 bg-white border-b border-gray-100'>
      <Container>
        <p className='mb-8 text-lg font-normal text-[#202430]'>Companies we helped grow</p>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          {brands?.map((brand, index) => (
            <Image key={index + 1} src={brand} alt='company logo' />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustedBy;
