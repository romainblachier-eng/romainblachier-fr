import React from "react";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Silence",
    title: "Absence",
    rightLabel: "Silence",
    background: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80",
  },
  {
    leftLabel: "Essence",
    title: "Stillness",
    rightLabel: "Essence",
    background: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1920&q=80",
  },
  {
    leftLabel: "Rebirth",
    title: "Growth",
    rightLabel: "Rebirth",
    background: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80",
  },
  {
    leftLabel: "Change",
    title: "Opportunity",
    rightLabel: "Change",
    background: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80",
  },
];

export default function DemoScrollFX() {
  return (
    <FullScreenScrollFX
      sections={sections}
      header={
        <>
          <div>The Creative</div>
          <div>Process</div>
        </>
      }
      footer={<div></div>}
      showProgress
      durations={{ change: 0.7, snap: 800 }}
    />
  );
}
