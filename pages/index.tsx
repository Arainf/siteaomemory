import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { PhotoCarousel } from "../components/photo-carousel";
import { DraggablePhoto } from "../components/draggable-photo";
import { MemorablePhoto } from "../components/memorable-photo";
import { PhotoGrid } from "../components/PhotoGrid";
import React, { useState, useEffect } from "react";
import MemoryLane from "@/components/memory-lane";

// Use require for fetchRandom
const { getRandomPhotos } = require("../utils/fetchRandom");

interface HomeProps {
  draggablePhotos: any[];
}

interface Dimensions {
  centerX: number;
  centerY: number;
}

const Home: NextPage<HomeProps> = ({ draggablePhotos }) => {
  const [dimensions, setDimensions] = useState<Dimensions>({ centerX: 500, centerY: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        centerX: window.innerWidth / 2,
        centerY: window.innerHeight / 2
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <>
      <Head>
        <title>SITEAO</title>
        <meta name="description" content="SITEAO Photo Library" />
      </Head>
      <div className="absolute inset-0 h-screen grid-background"/>
      <main className="flex min-h-screen flex-col  items-center justify-center p-8 pt-20">
        <div className="relative z-50 inline-block text-[85px]  lg:text-[160px] font-horizon leading-none">
          <span   className="absolute  inset-0 text-white translate-y-3 opacity-40">SITEAO</span>
          <span   className="absolute   inset-0 text-white translate-y-6 opacity-30">SITEAO</span>
          <span  className="relative  text-white">SITEAO</span>

          <p className="font-century  font-bold text-lg lg:text-3xl text-center text-white">DOCUMENTATION FILES &#91;A. Y. 2024-25&#93;</p>
        </div>
        
        <div className="absolute  inset-0 pointer-events-none">
          {draggablePhotos.map((photo, index) => {
            const angle = (index * 137.5) % 360;
            const radius = 200 + (index * 80);
            const x = Math.round(dimensions.centerX + Math.cos(angle * Math.PI / 180) * radius);
            const y = Math.round(dimensions.centerY + Math.sin(angle * Math.PI / 170) * radius);
            return (
              <DraggablePhoto
                key={photo.id}
                photo={photo}
                initialPosition={{ x, y }}
              />
            );
          })}
        </div>
      </main>
      {/* COMING SOON */}
      <div className="h-screen flex items-center justify-center ">
           <div className="relative z-50  inline-block text-[60px] lg:text-[160px] font-horizon leading-none">
          <span   className="absolute  inset-0 text-white translate-y-3 opacity-40">MEMORY LANE</span>
          <span   className="absolute   inset-0 text-white translate-y-6 opacity-30">MEMORY LANE</span>
          <span  className="relative  text-white">MEMORY LANE</span>
        </div>
        
      </div>
      
      <div className="h-auto flex items-start justify-center lg:mt-[-15%] mt-[-80%] overflow-hidden ">
        {/* overflow-y-hidden h-96 */}
        <div className="h-auto w-screen">
          
         <MemoryLane  />
      </div>
        
      </div>
      
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const draggablePhotos = await getRandomPhotos("ORSEM", 10);
  return {
    props: {
      draggablePhotos,
    },
  };
};

export default Home;