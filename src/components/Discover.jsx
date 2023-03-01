import { Swiper, SwiperSlide } from "swiper/react";
import data from "../json/discover.json";
import { EffectFade, Pagination } from "swiper";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useState } from "react";

export default function Discover() {
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(0) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    } else {
      return num.toString();
    }
  };

  return (
    <Swiper
      modules={[EffectFade]}
      loop={true}
      effect={`fade`}
      spaceBetween={16}
      slidesPerView={1}
      style={{
        "--swiper-pagination-color": "#fff",
        "--swiper-pagination-bullet-vertical-gap": "1rem",
      }}
      wrapperClass={``}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide
            key={index}
            className={`h-[100svh] sm:h-[auto] relative flex flex-col sm:flex-row before:z-10 before:absolute before:inset-0 before:bg-gradient-to-t sm:before:bg-gradient-to-r before:from-neutral-900 sm:before:via-neutral-900`}
          >
            <figure
              className={`sm:max-w-[50%] sm:ml-auto flex-grow aspect-square sm:max-h-[500px] sm:order-2 flex items-start sm:items-center overflow-hidden grayscale z-0 `}
            >
              <img src={item.img_path} alt={item.artist} loading={`lazy`} />
            </figure>
            <div
              className={`z-10 sm:order-1 p-4 sm:px-6 bg-neutral-900 sm:bg-opacity-0 sm:absolute sm:inset-0 sm:max-w-5xl sm:mx-auto`}
            >
              <div className={`h-full flex flex-col justify-center gap-6`}>
                <div className={`flex flex-col gap-2`}>
                  <h2
                    className={`text-3xl sm:text-4xl lg:text-6xl font-bold line-clamp-1`}
                  >
                    {item.title}
                  </h2>
                  <div className={`flex items-center gap-2`}>
                    <span className={`font-medium tracking-wide text-lg`}>
                      {item.artist}
                    </span>
                    <span>&bull;</span>
                    <span className={`font-medium text-gray-400`}>
                      {`${formatNumber(item.music_plays)} Plays`}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center gap-4`}>
                  <button
                    className={`capitalize px-6 py-3 bg-primary-blue rounded-full w-full sm:w-fit`}
                  >
                    Listen now
                  </button>
                  <button
                    className={`${
                      !item.favorite ? null : `bg-primary-blue`
                    } aspect-square px-3 border-2 border-primary-blue rounded-full max-h-fit grid place-items-center transition-all`}
                  >
                    <IonIcon
                      icon={!item.favorite ? Icon.heartOutline : Icon.heart}
                    />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
