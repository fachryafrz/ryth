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
    <div className={`relative flex flex-col gap-4 pb-[82px] xl:pb-0`}>
      <section id="topSong" className={`flex flex-col gap-2`}>
        <div className={`flex items-center justify-between`}>
          <h2 className={`capitalize text-lg sm:text-2xl font-medium`}>
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
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1152: {
              slidesPerView: 5,
            },
          }}
          className={`overflow-x-hidden max-w-full`}
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
          <h2 className={`capitalize text-lg sm:text-2xl font-medium`}>
            Remix for today
          </h2>
          <button
            className={`text-sm font-medium text-gray-400 hover:text-white`}
          >
            View all
          </button>
        </div>
        <div>
          <div className="grid md:grid-cols-2 gap-2 md:gap-4">
            <Link
              to={`/`}
              id="leftRemix"
              className={`flex flex-col hover:bg-gray-800 rounded-lg transition-all h-fit`}
            >
              <figure className={`rounded-lg overflow-hidden aspect-video`}>
                <img
                  src="https://www.radiopopolare.it/wp-content/uploads/2016/09/cover-trasmissione-psicoradio.jpg"
                  alt=""
                />
              </figure>
              <div id="contents" className={`transition-all py-2`}>
                <h3 className={`text-xl font-medium`}>Happy Thursday</h3>
                <p className={`text-sm text-gray-400 font-medium`}>
                  Happy Thursday, enjoy your day with a collection of songs that
                  we have prepared.
                </p>
              </div>
            </Link>
            <div id="rightRemix" className={`flex flex-col gap-1`}>
              {data.slice(0, 5).map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSongList(item)}
                    className={`flex items-center gap-4 w-full bg-gray-800 px-4 py-2 h-full rounded-lg hover:bg-gray-700`}
                  >
                    <span className={`text-sm text-gray-400 font-medium`}>
                      {index + 1}
                    </span>
                    <figure
                      className={`min-w-[50px] max-w-[50px] rounded-lg overflow-hidden`}
                    >
                      <img src={item.img_path} alt={item.title} />
                    </figure>
                    <div className={`text-left -ml-2`}>
                      <h3 className={`line-clamp-1 font-medium`}>
                        {item.title}
                      </h3>
                      <span
                        className={`line-clamp-1 text-sm text-gray-400 font-medium`}
                      >
                        {item.artist}
                      </span>
                    </div>
                    <time
                      className={`ml-auto text-sm text-gray-400 font-medium`}
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
          <h2 className={`capitalize text-lg sm:text-2xl font-medium`}>
            Recently Played
          </h2>
          <button
            className={`text-sm font-medium text-gray-400 hover:text-white`}
          >
            View all
          </button>
        </div>
        <div className={`border border-gray-700 rounded-lg p-2`}>
          {data.map((item, index) => {
            const [like, setLike] = useState(false);

            const handleLike = () => {
              setLike(!like);
            };

            return (
              <div
                key={index}
                id="recentTracks"
                className={`flex items-center hover:bg-gray-800 rounded-lg pr-2 transition-all`}
              >
                <button
                  onClick={() => setSongList(item)}
                  className={`p-2 grid grid-cols-3 md:grid-cols-4 gap-2 items-center w-full`}
                >
                  <div className={`flex items-center gap-2 col-span-2`}>
                    <IonIcon
                      icon={Icon.play}
                      id="recentIconPlay"
                      className={`hidden sm:block opacity-0 transition-all !min-w-[20px]`}
                    />
                    <figure
                      className={`min-w-[30px] max-w-[30px] sm:max-w-[50px] aspect-square rounded-lg overflow-hidden`}
                    >
                      <img src={item.img_path} alt={item.artist} />
                    </figure>
                    <h4 className={`line-clamp-1 text-left`}>{item.title}</h4>
                  </div>
                  <span
                    className={`text-sm text-left text-gray-400 font-medium line-clamp-1`}
                  >
                    {item.artist}
                  </span>
                  <time
                    className={`hidden md:block text-sm text-gray-400 font-medium`}
                  >
                    {formatTime(item.duration)}
                  </time>
                </button>
                <button
                  onClick={handleLike}
                  className={`ml-auto p-2 flex hover:bg-white hover:bg-opacity-10 rounded`}
                >
                  <IonIcon icon={!like ? Icon.heartOutline : Icon.heart} />
                </button>
                <button
                  className={`p-2 flex hover:bg-white hover:bg-opacity-10 rounded`}
                >
                  <IonIcon icon={Icon.ellipsisVertical} />
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <div className={`xl:hidden flex justify-center`}>
        <MusicPlayer songList={songList} setSongList={setSongList} />
      </div>
    </div>
  );
}
