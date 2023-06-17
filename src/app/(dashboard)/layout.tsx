import supabase from "@/lib/supabase-server";

import Header from "@/components/Nav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
