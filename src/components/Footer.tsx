import { footerData } from "@/variables/pageData";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-black text-white py-4 md:py-6 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">Need Help?</h2>
          <p className="text-sm md:text-base">Call: {footerData.mobile}</p>
          <p className="text-sm md:text-base">Email: {footerData.email}</p>
        </div>

     
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-0">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-xl md:text-2xl hover:text-gray-400" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl md:text-2xl hover:text-gray-400" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl md:text-2xl hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
