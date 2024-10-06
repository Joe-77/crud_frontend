import { IoAddOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const pathName = useLocation().pathname;

  return (
    <nav className="bg-blue-700 w-full py-5 text-white">
      <div className="container px-4 md:px-0 lg:w-[85%] mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex flex-1 justify-center gap-2">
            <Link to="/branch">Branch</Link>
            {pathName === "/add-branch" && (
              <>
                <span>/</span>
                <span>Store</span>
                <span>/</span>
                <span>Cashier</span>
              </>
            )}
          </div>

          {pathName !== "/add-branch" && pathName !== "/update-customer" && (
            <div>
              <Link
                to="/add-branch"
                className="text-xl bg-white lg:w-6 lg:h-6 flex items-center justify-center rounded-full text-black"
              >
                <IoAddOutline />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
