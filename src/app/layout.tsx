import "@/styles/globals.css";
import Providers from "@/components/providers";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "300", "700"],
});

export const metadata = {
  title: "Textextractor",
  description: "Extract text from your images",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
