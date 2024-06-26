import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../authentication/AuthProvider";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";


const Navbar = () => {
  const [cart] = useCart();
  // console.log(cart)
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("light");
    }
  };

  const handleLogout = () => {
    logout();
    toast("You have successfully logged out");
  };
  const navlinks = (
    <>
      <li>
        <NavLink to="/">HOME</NavLink>
      </li>
      <li>
        <NavLink to="/menu">OUR MENU</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">DASHBOARD</NavLink>
      </li>
      <li>
        <NavLink to="/order/salad">ORDER FOOD</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/cart" className=" bg-yellow-600 bg-opacity-70">
          <button className="flex items-center gap-2">
          <FaShoppingCart />
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30 bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navlinks}
          </ul>
        </div>
        <div className=" flex flex-col">
          <h1 className="font-bold text-3xl">BISTRO BOSS</h1>
          <p className=" text-xl tracking-[.39em]">RESTAURANT</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end gap-4">
        <label className="cursor-pointer grid place-items-center">
          <input
            onChange={handleTheme}
            type="checkbox"
            value=""
            checked={theme === "light" ? false : true}
            className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
          />
          <svg
            className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {user ? (
          <div id="profileImg">
            <img
              className="w-12 md:w-12 lg:w-14  rounded-full "
              alt="profile picture"
              src={
                user?.photoURL ||
                "https://i.ibb.co/RPpmvwb/images-blank-profile.png"
              }
            />

            <div id="dropdown" className=" w-28 lg:w-40 rounded-lg z-30">
              <h1 className="p-2 bg-purple-400 dark:bg-gradient-to-r from-yellow-600 via-purple-600 to-purple-700 rounded-lg text-center font-semibold  w-full">
                {user.displayName || "user name not found"}
              </h1>
              <button
                onClick={handleLogout}
                className="btn w-full bg-yellow-600 dark:bg-gradient-to-r from-purple-500 via-purple-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-purple-300"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <Link
            className="btn px-6 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-purple-300"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
