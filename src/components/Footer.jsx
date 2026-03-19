import React from 'react'
import { FaDumbbell, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-darker py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaDumbbell className="text-primary text-2xl" />
              <span className="text-2xl font-bold gradient-text">Amaan's GYM</span>
            </div>
            <p className="text-gray-400 text-sm">
              Elite fitness studio built for warriors who want real results. Strength, community, evolution.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#classes" className="hover:text-primary transition-colors">Classes</a></li>
              <li><a href="#trainers" className="hover:text-primary transition-colors">Trainers</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Membership</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <FaInstagram className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-2xl" />
              <FaFacebook className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-2xl" />
              <FaTwitter className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-2xl" />
              <FaYoutube className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-2xl" />
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">© 2025 Amaan's GYM — Built for the relentless. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer