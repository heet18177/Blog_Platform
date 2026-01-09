import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 dark:bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/myLogo.svg" alt="ArticalX logo" className="w-9" />
              <span className="text-white dark:text-black font-semibold text-lg">
                ArticalX
              </span>
            </div>

            <p className="mt-3 text-sm dark:text-black text-neutral-400 max-w-sm">
              A technical publication focused on modern web development,
              software engineering, and best practices.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-4">
              <FaInstagram className="w-5 h-5 hover:text-white transition dark:text-black" />
              <FaTwitter className="w-5 h-5 hover:text-white transition dark:text-black" />
              <FaFacebookF className="w-5 h-5 hover:text-white transition dark:text-black" />
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-white dark:text-black mb-3">
              About
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed dark:text-black">
              Learn, build, and grow with carefully curated content for
              developers and technology professionals.
            </p>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <IoCallOutline className="dark:text-black" />
                <span className="dark:text-black">+91 9957614357</span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineMail className="dark:text-black" />
                <span className="dark:text-black">abc123@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 dark:text-black">
              Information
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer dark:text-black">
                Articles
              </li>
              <li className="hover:text-white transition cursor-pointer dark:text-black">
                Tutorials
              </li>
              <li className="hover:text-white transition cursor-pointer dark:text-black">
                Events
              </li>
              <li className="hover:text-white transition cursor-pointer dark:text-black">
                Community
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 dark:text-black">
              Helpful Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer dark:text-black">
                Services
              </li>
              <li className="hover:text-white transition cursor-pointer dark:text-black">
                Support
              </li>
              <li className="hover:text-white transition cursor-pointer dark:text-black">
                Terms & Conditions
              </li>
              <li className="hover:text-white transition cursor-pointer dark:text-black">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3 dark:text-black">
              Newsletter
            </h3>

            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neutral-500"
            />

            <Button variant="outline" className="w-full mt-2 text-sm">
              Subscribe
            </Button>
          </div>
        </div>

        {/* HR */}
        <hr className="border-neutral-800 my-3 dark:text-black" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 py-3 dark:text-black">
          <span className="dark:text-black">
            © 2026 ArticalX. All rights reserved.
          </span>
          <span className="dark:text-black">Built for developers</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
