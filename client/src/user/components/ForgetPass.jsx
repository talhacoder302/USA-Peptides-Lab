const Forpass = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col w-[80%] gap-4 my-14">
        <h1 className="text-gradient text-3xl font-bold">My account</h1>
        <div className=" mt-10">
          <p className=" text-gray-600 mb-4 text-sm">
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </p>
          <form className="flex flex-col gap-4">
            <label className="text-sm">
              Username or email
              <span className="text-[#CC3882]">*</span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="sm:p-3 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#CC3882]"
            />
            <div>
              <button
                type="submit"
                className="hover:bg-[#CC3882] transition-all duration-500 ease-in-out hover:text-white text-[#CC3882] border-2 border-[#CC3882] font-medium md:text-lg text-sm rounded-full px-4 py-2 bg-tranparent"
              >
                RESET PASSWORD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forpass;
