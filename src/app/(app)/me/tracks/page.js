import CardVertical from "@/components/Card/CardVertical";
import { fetchAPI } from "@/utils/api";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: `Saved Songs`,
  };
}

export default async function page() {
  try {
    const { data: savedTracks } = await fetchAPI(`/me/tracks`)

    return (
      <div className={`@container`}>
        <header>
          <h2 className={`text-xl font-medium`}>Saved Songs</h2>
        </header>

        <ul
          className={`-mx-2 grid grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-4 @5xl:grid-cols-5`}
        >
          {savedTracks.items.map((item, i) => {
            const [image] = item.track.album.images;

            return (
              <li key={item.id}>
                <CardVertical
                  item={item.track}
                  image={image?.url ?? "/maskable/maskable_icon_x192.png"}
                  info={item.track.artists.map((artist) => {
                    return (
                      <>
                        <Link
                          key={artist.id}
                          href={`/${artist.type}/${artist.id}`}
                          className={`hocus:underline`}
                        >
                          {artist.name}
                        </Link>

                        <span className={`last:hidden`}>, </span>
                      </>
                    );
                  })}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  } catch (error) {
    redirect("/")
  }
}
