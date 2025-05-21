import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
// import { DraggablePhoto } from "../components/draggable-photo";
import React, { useState, useEffect } from "react";
import MemoryLane from "@/components/memory-lane";
// import { getRandomPhotos } from "@/utils/fetchRandom";

interface HomeProps {
  // draggablePhotos: any[];
}

// interface Dimensions {
//   centerX: number;
//   centerY: number;
// }

const Home: NextPage<HomeProps> = ({ /* draggablePhotos */ }) => {
  // const [dimensions, setDimensions] = useState<Dimensions>({ centerX: 500, centerY: 400 });

  // useEffect(() => {
  //   const updateDimensions = () => {
  //     setDimensions({
  //       centerX: window.innerWidth / 2,
  //       centerY: window.innerHeight / 2
  //     });
  //   };

  //   updateDimensions();
  //   window.addEventListener('resize', updateDimensions);

  //   return () => window.removeEventListener('resize', updateDimensions);
  // }, []);

  return (
    <>
      <Head>
        <title>SITEAO</title>
        <meta name="description" content="SITEAO Photo Library" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div className="fixed inset-0 w-full h-full grid-background md:transform-none"/>
      <main className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-20">
        <div className="relative z-10 text-center">
          <div className="relative inline-block text-[60px] md:text-[85px] lg:text-[160px] font-horizon leading-none">
            <span className="absolute inset-0 text-white translate-y-2 md:translate-y-3 opacity-40">SITEAO</span>
            <span className="absolute inset-0 text-white translate-y-4 md:translate-y-6 opacity-30">SITEAO</span>
            <span className="relative text-white">SITEAO</span>
          </div>
          <p className="font-century font-bold text-base md:text-lg lg:text-3xl text-white mt-4">
            DOCUMENTATION FILES &#91;A. Y. 2024-25&#93;
          </p>
        </div>
      </main>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block text-[40px] md:text-[60px] lg:text-[160px] font-horizon leading-none">
            <span className="absolute inset-0 text-white translate-y-2 md:translate-y-3 opacity-40">MEMORY LANE</span>
            <span className="absolute inset-0 text-white translate-y-4 md:translate-y-6 opacity-30">MEMORY LANE</span>
            <span className="relative text-white">MEMORY LANE</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 flex items-start justify-center -mt-20 md:-mt-[15%] overflow-hidden">
        <div className="w-full">
          <MemoryLane />
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const draggablePhotos = await getRandomPhotos("ORSEM", 10);
//   return {
//     props: {
//       draggablePhotos,
//     },
//   };
// };

export default Home;