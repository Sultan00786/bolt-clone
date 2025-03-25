import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import NavbarSection from "@/components/ui/custom/NavbarSection";
import GradiantSpot from "@/components/ui/custom/GradiantSpot";

const geistSans = Noto_Sans({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} dark bg-background antialiased -z-50 text-white`}
      >
        <Provider>
          <div className="relative h-full w-full -z-50 ">
            <NavbarSection />
            <div className="z-30 ">{children}</div>

            {/* gradiant spot */}
            <GradiantSpot />
          </div>
        </Provider>
      </body>
    </html>
  );
}
