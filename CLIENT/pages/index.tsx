import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MainPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/overview");
  }, []);

  return <div>Redirecting...</div>;
};

export default MainPage;
