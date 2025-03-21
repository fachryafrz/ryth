import { usePlayback } from "@/zustand/playback";
import { useRouter } from "next/navigation";
import { ChevronDown } from "react-ionicons";

export default function TopBar() {
  const { track } = usePlayback();
  const router = useRouter();

  const [_, type, id] = track?.album.uri.split(":") ?? [];

  return (
    <form method="dialog">
      <header className={`flex items-center justify-between`}>
        <button className={`btn btn-circle btn-ghost focus-visible:outline-none`}>
          <ChevronDown color={"#ffffff"} height="24px" width="24px" />
        </button>

        <button
          onClick={() => router.push(`/${type}/${id}`)}
          className={`line-clamp-1 font-medium hocus:underline`}
        >
          {track?.album.name}
        </button>
      </header>
    </form>
  );
}
