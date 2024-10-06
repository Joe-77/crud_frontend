import { Link } from "react-router-dom";

export default function Nav() {

  return (
    <nav className="bg-blue-700 w-full py-5 text-white">
      <div className="container px-4 md:px-0 lg:w-[85%] mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex flex-1 justify-center gap-2">
            <Link to="/branch">Branch</Link>
            <span>/</span>
            <span>Store</span>
            <span>/</span>
            <span>Cashier</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
