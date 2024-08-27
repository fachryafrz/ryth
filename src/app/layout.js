import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AccessToken from "@/components/Auth/AccessToken";
import Navbar from "@/components/Layout/Navbar";
import Player from "@/components/Layout/Player";
import Sidebar from "@/components/Layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const authorizationURL = process.env.AUTHORIZATION_URL;
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <html lang="en">
      <Suspense>
        <GoogleAnalytics />
        <AccessToken />
      </Suspense>

      <body className={``}>
        <Sidebar
          authorizationURL={authorizationURL}
          client_id={client_id}
          redirect_uri={redirect_uri}
        >
          {/* Center */}
          <div className={`overflow-y-auto`}>
            <main className={`p-4`}>{children}</main>
          </div>
        </Sidebar>
      </body>
    </html>
  );
}
