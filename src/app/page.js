import LeftContent from "@/components/Layout/Home/LeftContent";
import RightContent from "@/components/Layout/Home/RightContent";
import React from "react";

export default function Home() {
  return (
    <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-12`}>
      {/* Left Content */}
      <div className={`lg:col-span-8 lg:row-start-1 xl:col-span-9`}>
        <LeftContent />
      </div>

      {/* Right Content */}
      <div
        className={`bg-base-100 lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10`}
      >
        <RightContent />
      </div>
    </div>
  );
}
