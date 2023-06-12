import * as React from "react";
import Login from "@/components/login";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return <Login isLogin={false}/>;
};

export default page;
