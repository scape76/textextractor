"use client";

import * as React from "react";
import type { User } from "@supabase/auth-helpers-nextjs";
import { performOCR } from "@/lib/ocr";

import { Icons } from "@/components/icons";
import {
  Flex,
  Box,
  Button,
  Image,
  Group,
  Text,
  rem,
  Center,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Link from "next/link";

interface ConverterProps {
  user: User | null;
}

export default function Coverter({ user }: ConverterProps) {
  console.log(user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [text, setText] = React.useState("");
  const imageRef = React.useRef<HTMLImageElement>(null);

  return (
    <Center>
      <Box p={"sm"} mx={"md"}>
        <Flex
          w={"100%"}
          maw={"560px"}
          align={"center"}
          justify={"center"}
          direction={"column"}
          gap={"md"}
        >
          <img
            // src={""}
            // alt="your image"
            ref={imageRef}
            style={{ maxWidth: "100%" }}
          />
          <Dropzone
            onDrop={(files) => {
              if (imageRef.current) {
                console.log(URL.createObjectURL(files[0]));
                imageRef.current.src = URL.createObjectURL(files[0]);
                imageRef.current.alt = files[0].name;
              }
              setFile(files[0]);
              setText("");
            }}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            w={"100%"}
          >
            <Group
              position="center"
              spacing="xl"
              p={"lg"}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <Icons.upload size="3.2rem" />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <Icons.x size="3.2rem" />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <Icons.image size="3.2rem" />
              </Dropzone.Idle>

              {!file && (
                <div>
                  <Text size="xl" inline>
                    Drag image here or click to select a files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    File should not exceed 5mb
                  </Text>
                </div>
              )}
            </Group>
          </Dropzone>

          {!user && (
            <Link href={"/login"}>
              <Button maw={"300px"}>Sign in to continue</Button>
            </Link>
          )}

          {!!user && (
            <Button
              disabled={!!text}
              maw={"300px"}
              onClick={async () => {
                if (!file) return;
                try {
                  setIsLoading(true);
                  const text = await performOCR(file);
                  const res = await fetch("/api/s3/upload", {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({ name: file.name, type: file.type }),
                  });

                  const { url, imageId } = await res.json();

                  await Promise.all([
                    fetch(url, {
                      method: "PUT",
                      headers: {
                        "Access-Control-Allow-Origin": "*",
                      },
                      body: file,
                    }),
                    fetch(`/api/extractions`, {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify({ text, imageId }),
                    }),
                  ]);

                  setText(text || "No text on the image was extracted");
                } catch (err) {
                  console.log(err);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              Convert to text
            </Button>
          )}
          {isLoading && <Icons.spinner className="animate-spin w-4 h-4" />}
          <span>{text}</span>
        </Flex>
      </Box>
    </Center>
  );
}
