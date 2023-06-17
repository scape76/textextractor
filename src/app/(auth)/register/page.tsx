import * as React from "react";
import Login from "@/components/Login";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return <Login isLogin={false}/>;
};

export default page;
