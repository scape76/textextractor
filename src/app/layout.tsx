import "@/styles/globals.css";
import { Lato } from "next/font/google";
import Providers from "@/components/providers";
import createClient from "@/lib/supabase-server";
import Navbar from "@/components/navbar";

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
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={lato.className}>
        <Providers>
          <Navbar user={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
