import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Palette } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Palette className="h-6 w-6 mr-2" />
              Ashm Verma
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-400" />
                <a href="tel:+17636077480" className="hover:text-gray-300 transition-colors">
                  +1.763.607.7480
                </a>
              </div>

              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-400" />
                <a
                  href="mailto:ashmverma@gmail.com"
                  className="hover:text-gray-300 transition-colors"
                >
                  ashmverma@gmail.com
                </a>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-gray-400 flex-shrink-0" />
                <div>
                  <p>825 Meander Ct</p>
                  <p>Medina, MN 55446</p>
                  <p>USA</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
                asChild
              >
                <a href="https://www.instagram.com/ashm_artorium" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
                asChild
              >
                <a href="https://www.facebook.com/ashmartorium" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
                asChild
              >
                <a href="https://www.youtube.com/user/ashmverma" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Shop Artwork
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-400 hover:text-white transition-colors">
                  Art Classes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Ashm
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Original Artwork
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-400 hover:text-white transition-colors">
                  Kids Art Classes
                </Link>
              </li>
              <li>
                <Link href="/parties" className="text-gray-400 hover:text-white transition-colors">
                  Birthday Parties
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                  Sip & Paint Events
                </Link>
              </li>
              <li>
                <Link href="/commissions" className="text-gray-400 hover:text-white transition-colors">
                  Custom Commissions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-lg font-semibold mb-2">Stay Connected</h4>
              <p className="text-gray-400 text-sm">
                Get updates on new artwork, upcoming classes, and special events!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />
              <Button className="bg-gray-700 hover:bg-gray-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Ashm ARTorium. All rights reserved. | Art that speaks, inspires and transforms!
          </p>
        </div>
      </div>
    </footer>
  );
}
