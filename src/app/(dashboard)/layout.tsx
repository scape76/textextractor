import createClient from "@/lib/supabase-server";
import Header from "@/components/nav";

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
    <>
      <Header user={user} />
      {children}
    </>
  );
}
