import React from "react";

const Footer = () => {
  return (
    // Background, text, and border updated for dark theme
    <footer id="f" className="bg-neutral-900 text-gray-300 pt-12 pb-6 border-t border-gray-700 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* About */}
          <div>
            {/* Heading text color updated */}
            <h3 className="text-2xl font-bold mb-4 text-orange-500 tracking-wide">Information</h3>
            {/* Body text color adjusted for readability */}
            <p className="text-gray-400 text-sm leading-relaxed">
              STBG is one of the best counseling channels with experienced mentors
              dedicated to guiding students to achieve their academic and career goals.
              We provide personalized support, expert advice, and comprehensive resources
              to help every student succeed.
            </p>
          </div>

          {/* Important Links */}
          <div>
            {/* Heading text color updated */}
            <h3 className="text-2xl font-bold mb-4 text-orange-500 tracking-wide">Important Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition">Courses</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Result</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Faculty</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Counseling</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Feedback</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">E-book</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Our Counseling */}
          <div>
            {/* Heading text color updated */}
            <h3 className="text-2xl font-bold mb-4 text-orange-500 tracking-wide">Our Counseling</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition">JOSAA & CSAB 2025</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">AKTU/UPTU 2025</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">CUET BTECH 2025</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">JAC DELHI 2025</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">WBJEE 2025</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">JAC CHANDIGARH 2025</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">MPDTE 2025</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Reap Rajasthan 2025</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            {/* Heading text color updated */}
            <h3 className="text-2xl font-bold mb-4 text-orange-500 tracking-wide">Get In Touch</h3>
            <p className="mb-3 text-gray-400">Set Time Bound Goal</p>
            <p className="mb-3 text-gray-400">Aligarh, Uttar Pradesh</p>
            {/* Links updated for dark theme contrast */}
            <p className="mb-3 text-gray-400">Phone: <a href="tel:6394866895" className="text-orange-400 hover:text-orange-300 transition">6394866895</a></p>
            <p className="text-gray-400">Email: <a href="mailto:stbgonline@gmail.com" className="text-orange-400 hover:text-orange-300 transition">stbgonline@gmail.com</a></p>
          </div>

        </div>

        {/* Bottom Footer - Border and text color updated */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} STBG Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;