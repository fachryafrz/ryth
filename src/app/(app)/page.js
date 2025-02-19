import LeftContent from "@/components/Layout/Home/LeftContent";
import RetryAfter from "@/components/Modals/RetryAfter";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import { fetchAPI } from "@/utils/api";
import { cookies } from "next/headers";

export default async function Home() {
  const cookiesStore = cookies()
  const access_token = cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value

  try {
    const { data: { categories } } = await fetchAPI('/browse/categories', {
      access_token
    });

    const categoriesPlaylists = await Promise.all(
      categories.items.map(({ id }) =>
        fetchAPI(`/browse/categories/${id}/playlists`, {
          access_token
        }).then(({ data }) => data),
      ),
    )

    return (
      <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-12`}>
        {/* Left Content */}
        <div className={`col-span-full lg:row-start-1`}>
          {categories && categoriesPlaylists && (
            <LeftContent
              categories={categories}
              categoriesPlaylists={categoriesPlaylists}
            />
          )}
        </div>
      </div>
    );
  } catch (error) {
    const retryAfter = error?.response.headers["retry-after"];
    if (retryAfter) return <RetryAfter retryAfter={retryAfter} />;
  }
}
