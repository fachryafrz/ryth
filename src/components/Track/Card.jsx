/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function TrackCard({ image, name, info, responsive = false }) {
  return (
    <article className={`flex items-center gap-2 p-1`}>
      {image && (
        <figure
          className={`aspect-square w-full max-w-14 overflow-hidden rounded-lg`}
        >
          <img src={image} alt={name} loading="lazy" draggable="false" />
        </figure>
      )}

      <div
        className={`w-full flex-col ${responsive ? `hidden sm:flex` : `flex`}`}
      >
        <div className={`line-clamp-1 font-medium`}>
          {name}
        </div>

        {info && (
          <div className={`line-clamp-1 text-sm font-medium text-neutral-500`}>
            {info}
          </div>
        )}
      </div>
    </article>
  );
}
