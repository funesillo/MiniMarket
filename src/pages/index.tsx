import { Layout, ProductTable } from "../../commons";

export default function Home() {
  return (
    <>
      <Layout>
        <h1 style={{margin: "10px"}}>Bienvenido Minimarket Aron</h1>
        <ProductTable />
      </Layout>
    </>
  );
}
