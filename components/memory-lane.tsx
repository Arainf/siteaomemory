"use client"
import { useState } from "react"
import { Toggle } from "./components/ui/toggle"
import { ArrowDownAZ, ArrowUpZA } from "lucide-react"
import Compono from "./events/compono"
import Siteaoplus from "./events/siteaoplus"
import Orsem from "./events/orsem"
import Genass from "./events/genass"
import LazyRender from "@/utils/lazywrapper"
import DynamicGallery from "./events/dynamicGallery"
import Induction from "./events/induction"
import Lanyard from "./events/lanyard"
import Sweeteao from "./events/sweeteao"
import Ambas from "./events/ambas"
import Donation from "./events/donation"
import Justice from "./events/justice"
import Midterm from "./events/midterm"
import Olympics from "./events/olympics"
import Atfest from "./events/atfest"
import Iggy from "./events/iggy"
import End from "./events/end"

const baseEvents = [
  {
    name: "Compono",
    date: new Date("2024-01-01"),
    component: <Compono />
  },
  {
    name: "Siteaoplus",
    date: new Date("2024-02-01"),
    component: <Siteaoplus />
  },
  {
    name: "Orsem",
    date: new Date("2024-03-01"),
    component: <Orsem />
  },
  {
    name: "Genass",
    date: new Date("2024-04-01"),
    component: <Genass/> 
  },
   {
    name: "Officers",
    date: new Date("2024-05-01"),
    component: <Induction/> 
  }
  ,
   {
    name: "Lanyard",
    date: new Date("2024-06-01"),
    component: <Lanyard/> 
  }
  ,
   {
    name: "Sweeteao",
    date: new Date("2024-07-01"),
    component: <Sweeteao/> 
  }
    ,
   {
    name: "Ambas",
    date: new Date("2024-08-01"),
    component: <Ambas/> 
  }
      ,
   {
    name: "Donation",
    date: new Date("2024-09-01"),
    component: <Donation/> 
  }
        ,
   {
    name: "Juctice",
    date: new Date("2024-10-01"),
    component: <Justice/> 
  }
          ,
   {
    name: "Midterm",
    date: new Date("2024-11-01"),
    component: <Midterm/> 
  }
            ,
   {
    name: "Olympics",
    date: new Date("2024-12-01"),
    component: <Olympics/> 
  }
              ,
   {
    name: "Atfest",
    date: new Date("2025-01-01"),
    component: <Atfest/> 
  }
                ,
   {
    name: "Iggy",
    date: new Date("2025-02-01"),
    component: <Iggy/> 
  }
                  ,
   {
    name: "End",
    date: new Date("2025-03-01"),
    component: <End/> 
  }
]

export function MemoryLane() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const sortedEvents = [...baseEvents].sort((a, b) => {
    const dateA = a.date.getTime()
    const dateB = b.date.getTime()
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB
  })

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === "desc" ? "asc" : "desc"))
  }

  return (
    <div className="bg-transparent">
      <div className="container mx-auto py-12">
        {/* Sort Toggle */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/70">
              {sortOrder === "desc" ? "Latest to Oldest" : "Oldest to Latest"}
            </span>
            <Toggle
              pressed={sortOrder === "asc"}
              onPressedChange={toggleSortOrder}
              aria-label="Toggle sort order"
              className="data-[state=on]:bg-white/20 data-[state=on]:text-white"
            >
              {sortOrder === "desc" ? (
                <ArrowDownAZ className="h-4 w-4" />
              ) : (
                <ArrowUpZA className="h-4 w-4" />
              )}
            </Toggle>
          </div>
        </div>

        {/* Render Sorted Events */}
        <div className="h-auto w-auto">
          <hr className="h-1 self-start my-6 bg-white" />
          {sortedEvents.map((event, index) => (
            <div key={event.name}>
              {index !== 0 && <hr className="h-1 self-start my-6 bg-white" />}
              <LazyRender>{event.component}</LazyRender>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
