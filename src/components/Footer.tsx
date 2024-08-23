import { footerData } from "@/variables/pageData";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { CgMail } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-8 sm:mb-0">
            <div className="flex items-center text-teal-600 dark:text-teal-300">
              <RiShoppingCartFill className="text-2xl md:text-3xl text-violet-900 dark:text-violet-300 mr-4" />
              <Link href="/">
                <h1 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white">
                  ShopTrackrr
                </h1>
              </Link>
            </div>
            <p className="mt-6 max-w-md text-left leading-relaxed text-gray-500 dark:text-gray-400">
              ShopTrackrr provides the small shopkeeper a platform where they can manage their inventory online and get the insights of monthly sales. Our Aim is to help the small businesses grow.
            </p>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">Contact Us</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="flex items-center justify-center sm:justify-end gap-1.5" href="#">
                  <CgMail className="text-white text-2xl" />
                  <span className="flex-1 text-gray-700 dark:text-gray-300">{footerData.email}</span>
                </a>
              </li>
              <li>
                <a className="flex items-center justify-center sm:justify-end gap-1.5" href="#">
                  <FiPhone className="text-white text-2xl" />
                  <span className="flex-1 text-gray-700 dark:text-gray-300">{footerData.mobile}</span>
                </a>
              </li>
              <li className="flex items-start justify-center sm:justify-end gap-1.5">
                <MdOutlineLocationOn className="text-white text-2xl" />
                <p className="-mt-0.5 flex-1 text-gray-700 dark:text-gray-300">
                  {footerData.location}
                </p>
              </li>
            </ul>
            <div className="flex justify-center sm:justify-end space-x-6 mt-6">
              <a href={footerData.linkedinUrl} className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
                <FaLinkedin className="text-2xl"/>
              </a>
              <a href={footerData.githubUrl} className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
                <FaGithub className="text-2xl"/>
              </a>
              <a href={footerData.instagramUrl} className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
                <FaInstagram className="text-2xl"/>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6 dark:border-gray-800">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="block sm:inline">All rights reserved.</span>
              <a className="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75" href="#">
                Terms & Conditions
              </a>
              <span>&middot;</span>
              <a className="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75" href="#">
                Privacy Policy
              </a>
            </p>
            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0 dark:text-gray-400">
              &copy; ShopTrackrr
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
