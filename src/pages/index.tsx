import { Layout, Ventas } from "../../commons/components";

export default function Home() {
  return (
    <>
      <Layout>
        <h1 style={{margin: "10px"}}>Bienvenido Minimarket Aron - Ventas</h1>
        <Ventas />
      </Layout>
    </>
  );
}
