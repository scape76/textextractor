"use client";

import { CacheProvider } from "@emotion/react";
import { useEmotionCache, MantineProvider } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cache = useEmotionCache();
  // cache.compat = true;

  // useServerInsertedHTML(() => (
  //   <style
  //     data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
  //     dangerouslySetInnerHTML={{
  //       __html: Object.values(cache.inserted).join(" "),
  //     }}
  //   />
  // ));

  return (
    // <CacheProvider value={cache}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      {children}
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </MantineProvider>
    // </CacheProvider>
  );
}
