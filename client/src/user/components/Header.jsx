import Cookies from "js-cookie";
import Logo from "../../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import data from "../../data.json";
import Cart from "./Cart"; // Import the Cart component

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const results = data.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredResults(results);
  }, [searchQuery]);

  // Cart functions
  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      handleUpdateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image:
            product.productImage ||
            product.imageUrl ||
            "/placeholder-image.jpg",
        },
      ]);
    }

    // Open cart when item is added
    setIsCartOpen(true);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Make addToCart available globally for ProductDetails component
  useEffect(() => {
    window.addToCart = addToCart;
    return () => {
      delete window.addToCart;
    };
  }, [cartItems]);

  return (
    <>
      <div className="bg-black text-white sticky top-0 z-[999999]">
        <div className="md:w-[80%] w-[90%] mx-auto flex items-center justify-between md:py-3 py-3">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="md:w-32 w-24" />
          </NavLink>

          <div className="flex items-center gap-10">
            <nav className="hidden lg:!flex items-center font-medium gap-6 ">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-primary text-[14px]"
                    : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/peptides"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary text-[14px]"
                    : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
                }
              >
                PEPTIDES FOR SALE
              </NavLink>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary text-[14px]"
                    : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
                }
              >
                ABOUT US
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary text-[14px]"
                    : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
                }
              >
                CONTACT
              </NavLink>
            </nav>

            {/* Icons */}
            <div className="text-2xl flex items-center sm:gap-6 gap-3">
              <NavLink to="/my-accounts">
                <HiOutlineUser onClick={() => {
    const token = Cookies.get("refreshToken"); // read token from cookies
    if (token) {
      navigate("/my-accounts/dashboard");
    } else {
      navigate("/my-accounts");
    }
  }} className="lg:!flex hidden" />
              </NavLink>
              <div className="relative cursor-pointer" onClick={handleOpenCart}>
                <FaShoppingCart />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <IoMdSearch
                onClick={() => setSearchOpen(true)}
                className="cursor-pointer"
              />
              <div
                className="lg:hidden text-2xl cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <IoMdClose /> : <SlMenu />}
              </div>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="absolute top-0 left-0 w-[100%]  z-40 flex justify-center items-center px-4 py-3">
            <div className="w-[82%] items-center rounded-lg bg-black border-2 border-primary  relative px-4">
              <button
                className="absolute right-4 top-4  text-xl text-primary"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <IoMdClose size={30} />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent py-6 rounded-md text-primary outline-none"
              />

              {/* Search Results */}
              {searchQuery && (
                <div className="mt-4">
                  {filteredResults.length > 0 ? (
                    <>
                      <ul className=" max-h-60 overflow-y-auto">
                        {filteredResults.slice(0, 5).map((product) => (
                          <li
                            key={product.id}
                            className="border-b border-[#666]  p-6 hover:bg-[#666] transition cursor-pointer"
                            onClick={() => {
                              navigate(product.url);
                              setSearchOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                              <div className="">
                                <div>{product.name}</div>
                                <div>{product.price}</div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {filteredResults.length > 5 && (
                        <p
                          className="text-primary text-sm mt-4 underline cursor-pointer"
                          onClick={() => {
                            navigate(`/search?query=${searchQuery}`);
                            setSearchOpen(false);
                          }}
                        >
                          View all results
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm mt-4 text-gray-500">
                      No products found.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out border-t-2 border-primary ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-black px-6`}
        >
          <nav className="flex flex-col gap-4 py-4 font-medium ">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-[14px]"
                  : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
              }
              onClick={() => setMenuOpen(false)}
            >
              HOME
            </NavLink>
            <NavLink
              to="/peptides"
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-[14px]"
                  : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
              }
              onClick={() => setMenuOpen(false)}
            >
              PEPTIDES FOR SALE
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-[14px]"
                  : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
              }
              onClick={() => setMenuOpen(false)}
            >
              ABOUT US
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-primary text-[14px]"
                  : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
              }
              onClick={() => setMenuOpen(false)}
            >
              CONTACT
            </NavLink>
            <div className="flex items-center justify-between">
              <NavLink
                to="/my-accounts"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary text-[14px]"
                    : "hover:text-primary transition-all duration-500 ease-in-out text-[14px]"
                }
                onClick={() => setMenuOpen(false)}
              >
                MY ACCOUNT
              </NavLink>
              <NavLink
                to="/my-accounts"
                className={({ isActive }) =>
                  isActive ? "text-primary text-[14px]" : "hover:text-primary"
                }
                onClick={() => setMenuOpen(false)}
              >
                <button className="border border-primary text-primary px-4 py-1 rounded-lg">
                  LOGIN
                </button>
              </NavLink>
            </div>
          </nav>
        </div>
      </div>

      {/* Cart Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
};

export default Header;
