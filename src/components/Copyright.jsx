import React from "react";

export default function Copyright() {
  return (
    <div className="flex flex-wrap justify-center gap-1 p-2 bg-gray-900 text-sm cursor-default border-b border-gray-700">
      Designed by
      <a
        href="https://dribbble.com/bayusasmita"
        target="_blank"
        className="text-[#ea4c89] hover:font-medium transition-all"
      >
        Bayu Sasmita
      </a>
      & Developed by
      <a
        href="https://dribbble.com/fachryafrz"
        target="_blank"
        className="text-[#ea4c89] hover:font-medium transition-all"
      >
        Fachry Dwi Afriza
      </a>
    </div>
  );
}
