"use client";

import { supabase } from "@/lib/supabase-browser";

export default function Login() {
  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email: "danyaolekhq@gmail.com",
      password: "dio2009",
    });

    if (error) {
      return console.log(error.message);
    }

    console.log("Check your email");
  }

  return <button onClick={signUp}>hello</button>;
}
