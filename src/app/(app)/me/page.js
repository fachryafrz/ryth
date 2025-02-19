import Profile from "@/components/User/Profile";
import { fetchAPI } from "@/utils/api";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  try {
    const { data: user, error } = await fetchAPI(`/me`);

    return {
      title: `${user.display_name}`,
    };
  } catch (error) {
    if (error)
      return {
        title: "You are not logged in",
      };
  }


}

export default async function page() {
  try {
    const { data: user } = await fetchAPI(`/me`)

    return (
      <div>
        <Profile user={user} />
      </div>
    );
  } catch (error) {
    redirect("/")
  }
}
