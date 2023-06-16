"use client";

import supabase from "@/lib/supabase-browser";
import { Center, Flex, TextInput, Title, Button, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { Icons } from "@/components/icons";
import { useForm } from "@mantine/form";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login({ isLogin }: { isLogin: boolean }) {
  const { height, width } = useViewportSize();

  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length <= 5) {
          return "Password has to be at least 6 characters long";
        } else if (value.length > 15) {
          return "Password can't be more than 15 characters long";
        }
        return null;
      },
    },
  });

  async function onSubmit(values: { email: string; password: string }) {
    if (isLogin) {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        return toast.error(error.message);
      } else {
        toast.success("You are succesfully logged in.");
        router.push("/");
        router.refresh();
      }
    } else {
      const { error, data } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: { emailRedirectTo: `${location.origin}/login` },
      });

      if (error || !data.user)
        return toast.error(error?.message || "Something went wrong");

      await supabase
        .from("users")
        .insert({ id: data.user?.id, email: data.user?.email });

      toast.success(
        "Success! Please, check your email for further instructions.",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Center mih={height} p={"md"}>
        <Flex
          direction={"column"}
          justify={"center"}
          w={"100%"}
          maw={400}
          gap={"sm"}
        >
          <Center>
            <Title order={1}>{isLogin ? "Sign in" : "Sign up"}</Title>
          </Center>
          <TextInput
            withAsterisk
            icon={<Icons.at />}
            placeholder="Your email"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            icon={<Icons.lock />}
            type="password"
            placeholder="Your password"
            {...form.getInputProps("password")}
          />
          <Button type="submit">{isLogin ? "Sign in" : "Sign up"}</Button>
          <Flex gap={"sm"}>
            <Text>
              {isLogin ? "Don't have an accout?" : "Already have an accout?"}
            </Text>
            <Link href={isLogin ? "/register" : "/login"}>
              {isLogin ? "Sign up" : "Sign in"}
            </Link>
          </Flex>
        </Flex>
      </Center>
    </form>
  );
}
