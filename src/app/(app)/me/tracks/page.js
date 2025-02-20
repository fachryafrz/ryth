import CardVertical from "@/components/Card/CardVertical";
import LoginAlert from "@/components/Modals/LoginAlert";
import { createSpotifyAxiosInstance } from "@/lib/axios";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: user } = await axios.get(`/me/tracks`);

    return {
      title: `Saved Songs (${user.display_name})`,
    };
  } catch (error) {
    return {
      title: "You are not logged in",
    }
  }
}

export default async function page({ params }) {
  try {
    const axios = await createSpotifyAxiosInstance();

    const { data: savedTracks } = await axios.get(`/me/tracks`)

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
                          prefetch={false}
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
    return <LoginAlert show={true} redirect={`/`} />;
  }

}
