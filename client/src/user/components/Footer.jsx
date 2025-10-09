import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import Payment from "../../assets/amex.webp";
const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col md:items-center gap-10 py-16">
        <div className="md:w-[60%] flex flex-col gap-8">
          <div>
            <img src={Logo} alt="Logo" className="w-44" />
          </div>
          <div className=" italic font-semibold">
            All products are sold for research, laboratory, or analytical
            purposes only, and are not for human consumption.
          </div>
          <p className="text-start leading-loose">
            USA Peptides Lab is a chemical supplier. USA Peptides Lab is not a
            compounding pharmacy or chemical compounding facility as defined
            under 503A of the Federal Food, Drug, and Cosmetic act. USA Peptides
            Lab is not an outsourcing facility as defined under 503B of the
            Federal Food, Drug, and Cosmetic act.
            <br /> The statements made within this website have not been
            evaluated by the US Food and Drug Administration. The products we
            offer are not intended to diagnose, treat, cure or prevent any
            disease.
            <br /> Human/Animal Consumption Prohibited. Laboratory/In-Vitro
            Experimental Use Only
          </p>
        </div>
        <div className="md:w-[40%] flex sm:flex-row flex-col gap-4">
          <div className="sm:w-1/2">
            <div className="text-secondary text-xl font-semibold">
              Quick Links
            </div>
            <nav className="flex flex-col font-medium gap-3 text-sm mt-8">
              <NavLink
                to="/peptides"
                className="hover:text-primary transition-all duration-500 ease-in-out"
              >
                Peptides for Sale
              </NavLink>
              <NavLink
                to="/about-us"
                className="hover:text-primary transition-all duration-500 ease-in-out"
              >
                About Us
              </NavLink>
              <NavLink
                to="/shipping"
                className="hover:text-primary transition-all duration-500 ease-in-out"
              >
                Shipping, Returns & Refunds
              </NavLink>
              <NavLink
                to="/privacy-policy"
                className="hover:text-primary transition-all duration-500 ease-in-out"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms-condition"
                className="hover:text-primary transition-all duration-500 ease-in-out"
              >
                Terms and Conditions
              </NavLink>
              <NavLink
                to="/contact"
                className="hover:text-primary transition-all duration-500 ease-in-out"
              >
                Contact
              </NavLink>
            </nav>
          </div>
          <div className="sm:w-1/2">
            <div className="text-secondary text-xl font-semibold">
              Now Accepting
            </div>
            <div className="mt-6">
              <img src={Payment} alt="Payment" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#141313] w-[100%] flex items-center justify-center text-sm py-8 text-primary">
        <div className="w-[80%] text-center">
          Copyright © 2025 USA Peptides Lab. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
