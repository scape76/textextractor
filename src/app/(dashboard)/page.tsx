"use client";

import * as React from "react";
import { Timeline, Text, Center, Box, Title } from "@mantine/core";
import { Icons } from "@/components/Icons";

export default async function Home() {
  return (
    <Center my={"md"}>
      <Box p={"sm"} mx={"md"} w={"100%"} maw={"560px"}>
        <Title>Extract texts with a click of a button</Title>
        <Text mt={"md"}>
          Save time by extracting your text from an image using ai,
          you don&apos;t need to do this by yourself.
        </Text>
        <Timeline active={1} bulletSize={24} lineWidth={2} mt={"lg"}>
          <Timeline.Item
            bullet={<Icons.image size={12} />}
            title="Select an image"
          >
            <Text color="dimmed" size="sm">
              Choose an image you want to extract your text from
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<Icons.pointer size={12} />}
            title="Click 'extract'"
          >
            <Text color="dimmed" size="sm">
              Now Tesseract.js will do the rest for you
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Wait"
            bullet={<Icons.spinner size={12} />}
            lineVariant="dashed"
          >
            <Text color="dimmed" size="sm">
              You will get results soon
            </Text>
          </Timeline.Item>
        </Timeline>
      </Box>
    </Center>
  );
}
