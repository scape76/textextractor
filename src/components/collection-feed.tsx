"use client";

import * as React from "react";
import { Box, Center, Paper, Blockquote, Title } from "@mantine/core";
import { getImageUrl } from "@/lib/get-image-url";

interface CollectionFeedProps {
  extractions: Extraction[] | null;
}

const CollectionFeed: React.FC<CollectionFeedProps> = ({ extractions }) => {
  if (!extractions || !extractions.length) {
    return (
      <Center my={"md"}>
        <Box p={"sm"} mx={"md"} w={"100%"} maw={"500px"}>
          <Title>You haven't extracted anything yet :{`(`} </Title>
        </Box>
      </Center>
    );
  }

  return (
    <Center my={"md"}>
      <Box p={"sm"} mx={"md"} w={"100%"} maw={"560px"}>
        <Title>You've extracted {extractions?.length} texts!</Title>
        {extractions?.map((e) => (
          <Paper w={"100%"} radius="lg" p="md" key={e.id} withBorder mt={"sm"}>
            <img width={"100%"} src={getImageUrl(e.imageId)} alt="your image" />
            <Blockquote cite="– Tesseract.js" mt="sm">
              {e.text}
            </Blockquote>
          </Paper>
        ))}
      </Box>
    </Center>
  );
};

export default CollectionFeed;
