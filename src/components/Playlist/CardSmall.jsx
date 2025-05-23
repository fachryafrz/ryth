/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function PlaylistCardSmall({ link }) {
  const pathname = usePathname();
  const isActive = pathname === link.href;
  const iconColor = isActive ? "#ff6337" : "#ffffff";

  return (
    <Link
      href={link.href}
      prefetch={false}
      className={`nav-link relative !bg-transparent font-medium hocus:bg-transparent hocus:opacity-50 ${isActive ? "active-left" : ""}`}
    >
      {link.icon && (
        <div className={`grid w-8 place-content-center`}>
          {React.cloneElement(link.icon, { color: iconColor })}
        </div>
      )}

      {link.image && (
        <figure>
          <img
            src={link.image}
            alt={link.title}
            draggable="false"
            width={32}
            height={32}
            className={`h-8 w-8 rounded-lg`}
          />
        </figure>
      )}

      <span title={link.title} className={`line-clamp-1 leading-tight`}>
        {link.title}
      </span>
    </Link>
  );
}
