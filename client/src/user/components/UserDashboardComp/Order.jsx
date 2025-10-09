import { Link } from "react-router-dom";

const Order = () => {
    return (
        <div className="bg-black flex justify-between  p-8 ">
      <h2 className="font-[600] text-[26px] text-white leading-[26px]">
        No order has been made yet.
      </h2>
      <Link to="/peptides" className="bg-transparent hover:bg-[#CC3882] text-[#CC3882] hover:text-white px-4 py-2 rounded-full font-medium border-2 border-[#CC3882] transition">
        BROWSE PRODUCT
      </Link>
    </div>
    )
}

export default Order;   
