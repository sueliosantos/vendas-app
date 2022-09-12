import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "components";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Vendas app</title>
      </Head>
      <Layout />
    </div>
  );
};

export default Home;
