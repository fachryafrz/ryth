import { MusicPlayer, TrackCard } from "../components/Components";
import "swiper/css";
import "swiper/css/navigation";

import data from "../json/topTracks.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { IonIcon } from "@ionic/react";
import * as Icon from "ionicons/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home2({ songList, setSongList }) {
  const options = { weekday: "long" };
  const today = new Date();
  const dayName = new Intl.DateTimeFormat("en-US", options).format(today);

  const handleAddSong = (item) => {
    const existingTitle = songList.find((i) => i.title === item.title);

    if (!existingTitle) {
      songList.push(item);
    } else {
      return false;
    }
  };

  const handleCurrentTrack = () => {
    setCurrentTrack(true);
    setShowPlayer(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = ("0" + minutes).slice(-2);
    const formattedSeconds = ("0" + seconds).slice(-2);
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className={`relative flex flex-col gap-4 xl:pb-0`}>
      <section id="topSong" className={`flex flex-col gap-2`}>
        <div className={`flex items-center justify-between`}>
          <h2 className={`text-lg font-medium capitalize sm:text-2xl`}>
            Top song this week
          </h2>
          <div className={`flex items-center gap-2`}>
            <button id="prevSlide" className={`arrow-btn`}>
              <IonIcon icon={Icon.chevronBack} />
            </button>
            <button id="nextSlide" className={`arrow-btn`}>
              <IonIcon icon={Icon.chevronForward} />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: "#nextSlide",
            prevEl: "#prevSlide",
            enabled: true,
          }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className={`max-w-full overflow-x-hidden`}
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <TrackCard
                  item={item}
                  songList={songList}
                  setSongList={setSongList}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <section id="remix" className={`flex flex-col gap-2`}>
        <div className={`flex items-center justify-between`}>
          <h2 className={`text-lg font-medium capitalize sm:text-2xl`}>
            Remix for today
          </h2>
          <button
            className={`text-sm font-medium text-neutral-400 hover:text-white`}
          >
            View all
          </button>
        </div>
        <div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <Link
              to={`/`}
              id="leftRemix"
              className={`flex h-fit flex-col rounded-lg transition-all hover:bg-neutral-800`}
            >
              <figure className={`aspect-video overflow-hidden rounded-lg`}>
                <img
                  src="https://www.radiopopolare.it/wp-content/uploads/2016/09/cover-trasmissione-psicoradio.jpg"
                  alt=""
                />
              </figure>
              <div id="contents" className={`py-2 transition-all`}>
                <h3 className={`text-xl font-medium`}>Happy {dayName}</h3>
                <p className={`text-sm font-medium text-neutral-400`}>
                  Happy {dayName}, enjoy your day with a collection of songs
                  that we have prepared.
                </p>
              </div>
            </Link>
            <div id="rightRemix" className={`flex flex-col gap-1`}>
              {data.slice(0, 5).map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSongList(item)}
                    className={`flex h-full w-full items-center gap-4 rounded-lg bg-neutral-800 px-4 py-2 hover:bg-neutral-700`}
                  >
                    <span className={`text-sm font-medium text-neutral-400`}>
                      {index + 1}
                    </span>
                    <figure
                      className={`min-w-[50px] max-w-[50px] overflow-hidden rounded-lg`}
                    >
                      <img src={item.img_path} alt={item.title} />
                    </figure>
                    <div className={`-ml-2 text-left`}>
                      <h3 className={`font-medium line-clamp-1`}>
                        {item.title}
                      </h3>
                      <span
                        className={`text-sm font-medium text-neutral-400 line-clamp-1`}
                      >
                        {item.artist}
                      </span>
                    </div>
                    <time
                      className={`ml-auto text-sm font-medium text-neutral-400`}
                    >
                      {formatTime(item.duration)}
                    </time>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section id="recentPlayed" className={`flex flex-col gap-2`}>
        <div className={`flex items-center justify-between`}>
          <h2 className={`text-lg font-medium capitalize sm:text-2xl`}>
            Recently Played
          </h2>
          <button
            className={`text-sm font-medium text-neutral-400 hover:text-white`}
          >
            View all
          </button>
        </div>
        <div className={`rounded-lg border border-neutral-700 p-4`}>
          {data.map((item, index) => {
            const [like, setLike] = useState(false);

            const handleLike = () => {
              setLike(!like);
            };

            return (
              <div
                key={index}
                id="recentTracks"
                className={`flex items-center border-b border-neutral-700 pr-2 transition-all hover:bg-neutral-800 [&:last-child]:border-b-0`}
              >
                <button
                  onClick={() => setSongList(item)}
                  className={`grid w-full grid-cols-3 items-center gap-2 p-2 sm:grid-cols-4`}
                >
                  <div className={`col-span-2 flex items-center gap-2`}>
                    <IonIcon
                      icon={Icon.play}
                      id="recentIconPlay"
                      className={`hidden !min-w-[20px] opacity-0 transition-all sm:block`}
                    />
                    <figure
                      className={`aspect-square min-w-[30px] max-w-[30px] overflow-hidden rounded-lg sm:max-w-[50px]`}
                    >
                      <img src={item.img_path} alt={item.artist} />
                    </figure>
                    <h4 className={`text-left line-clamp-1`}>{item.title}</h4>
                  </div>
                  <span
                    className={`text-left text-sm font-medium text-neutral-400 line-clamp-1`}
                  >
                    {item.artist}
                  </span>
                  <time
                    className={`hidden text-sm font-medium text-neutral-400 sm:block`}
                  >
                    {formatTime(item.duration)}
                  </time>
                </button>
                <button
                  onClick={handleLike}
                  className={`ml-auto hidden rounded p-2 hover:bg-white hover:bg-opacity-10 md:flex`}
                >
                  <IonIcon icon={!like ? Icon.heartOutline : Icon.heart} />
                </button>
                <button
                  className={`hidden rounded p-2 hover:bg-white hover:bg-opacity-10 md:flex`}
                >
                  <IonIcon icon={Icon.ellipsisVertical} />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
