import { Toaster } from "sonner";
import Nav from "./components/nav/Nav";
import Routers from "./components/routing/Routers";

function App() {
  return (
    <>
      <Nav />
      <Routers />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
