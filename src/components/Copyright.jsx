import React from "react";

export default function Copyright() {
  return (
    <div className="flex cursor-default flex-wrap justify-center gap-1 border-b border-neutral-700 bg-neutral-900 p-2 text-sm">
      Designed by
      <a
        href="https://dribbble.com/bayusasmita"
        target="_blank"
        className="text-[#ea4c89] transition-all hover:font-medium"
      >
        Bayu Sasmita
      </a>
      & Developed by
      <a
        href="https://dribbble.com/fachryafrz"
        target="_blank"
        className="text-[#ea4c89] transition-all hover:font-medium"
      >
        Fachry Dwi Afriza
      </a>
    </div>
  );
}
