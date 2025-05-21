import React from "react";
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"


const Events: NextPage = () => {
  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="description" content="SITEAO Photo Library" />
      </Head>
      <div className="absolute inset-0 grid-background"></div> {/* Ensure this doesn't overlap content if it's purely decorative */}
      <main className="flex min-h-screen flex-col  items-center justify-center p-8 pt-20"> {/* Added pt-20 for padding-top to avoid overlap with fixed navbar */}
       <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Folders grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-16">
          <FolderItem title="COMPONO: Capacity Training" />
          <FolderItem title="Induction of Officers" />
          <FolderItem title="52nd Commemoration of Martial Law" />
          <FolderItem title="Second Semester Alignment Meeting" isHighlighted />

          <FolderItem title="SITEAO+ Review with Griffins" />
          <FolderItem title="Merchandise: Lanyard" />
          <FolderItem title="SITEAO: Midterms Free Tokens" />
          <div className="hidden sm:block"></div>

          <FolderItem title="Sitio de SITEAO ORSEM 2024" />
          <FolderItem title="SITEAO Immersion Day 1" />
          <div className="hidden sm:block"></div>
          <div className="hidden sm:block"></div>

          <FolderItem title="First General Assembly" />
          <FolderItem title="SWEETAO: Food Donation" />
          <FolderItem title="SWEETAO Olympics Day 2" />
        </div>

      </div>
      </main>
    </>
  );
};

export default Events;


interface FolderItemProps {
  title: string
  isHighlighted?: boolean
}

function FolderItem({ title, isHighlighted = false }: FolderItemProps) {
  return (
    <Link href="/event/test" className="group flex flex-col items-center text-center transition-transform hover:scale-105">
      <div
        className={`
        w-full aspect-square max-w-[150px] mb-2 relative
        ${isHighlighted ? "bg-blue-500" : "bg-yellow-300"}
        rounded-md shadow-md overflow-hidden
      `}
      >
        <div className="absolute top-0 left-0 right-0 h-6 bg-white/20"></div>
      </div>
      <span
        className={`
        text-sm font-medium leading-tight
        ${isHighlighted ? "text-white" : "text-white"}
      `}
      >
        {title}
      </span>
    </Link>
  )
}
