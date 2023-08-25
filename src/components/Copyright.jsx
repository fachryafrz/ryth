import React from "react";

export default function Copyright() {
  return (
    <div className="flex cursor-default flex-wrap justify-center gap-1 border-b border-neutral-700 bg-neutral-900 p-2 text-sm">
      Design by
      <a
        href="https://dribbble.com/bayusasmita"
        target="_blank"
        className="text-[#ea4c89] font-medium"
      >
        Bayu Sasmita
      </a>
      & Built by
      <a
        href="https://fachryafrz.vercel.app/"
        target="_blank"
        className="text-[#ea4c89] font-medium"
      >
        Fachry Dwi Afriza
      </a>
    </div>
  );
}
