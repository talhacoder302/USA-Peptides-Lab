import React from 'react'
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
    const { user } = useOutletContext(); // get user from parent
console.log(user, 'usss')
    return (
        <div>
      <p className="text-[15px] text-[#666]">
        Hello <span className="font-[700]">{user?.username || "Guest"}</span>{' '}
        (Not <span className="font-[700]">{user?.username || "Guest"}</span>?<a href='*' className="text-[#cc3882] font-[600] cursor-pointer"> Log out</a>)
      </p>
      <p className="mt-4 text-[#666]">
        From your account dashboard you can view your <a href='/account-info/dashboard/orders' className="text-[#cc3882] font-[600] cursor-pointer">recent orders</a>, manage your <a href='/account-info/dashboard/addresses' className="text-[#cc3882] font-[600] cursor-pointer">shipping and billing addresses</a>, and <a href='/account-info/dashboard/orders' className="text-[#cc3882] font-[600] cursor-pointer">edit your password and account details.</a>
      </p>
    </div>
    )
}

export default Dashboard
