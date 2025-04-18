/* eslint-disable @next/next/no-img-element */
import numeral from "numeral";

export default function ArtistCard({ artist, index }) {
  const [image] = artist.images;
  const followers = numeral(artist.followers.total).format(`0a`);

  return (
    <article className={`flex items-center gap-2 p-1`}>
      <figure className={`relative flex items-center overflow-hidden`}>
        <span
          data-before-content={index + 1}
          className={`before-content outline-title text-7xl font-bold leading-3 text-transparent`}
        ></span>

        <img
          src={image?.url ?? "/maskable/maskable_icon_x192.png"}
          alt={artist.name}
          draggable="false"
          width={48}
          height={48}
          className={`-ml-2 aspect-[3/4] max-w-12 rounded-lg`}
        />
      </figure>

      <div>
        <div className={`flex w-full flex-col`}>
          <h3 className={`line-clamp-2 font-medium`}>
            {artist.name}
          </h3>

          <span
            data-before-content={`${followers} followers`}
            className={`before-content text-sm font-medium text-neutral-500`}
          />
        </div>
      </div>
    </article>
  );
}
