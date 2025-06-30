import { Facebook, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl">FALCON</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Experience new Services & Easy
              <br />
              way to build your next project
              <br />
              with us.
            </p>
            <div className="space-y-2 text-sm">
              <p>📧 www.falcon.com</p>
              <p>📞 www.falcon.com</p>
              <p>📍 www.falcon.com</p>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cancellation & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of use
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4">HELP</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  My Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold mb-4">Need Support?</h3>
            <p className="text-sm text-gray-400 mb-4">📞 1700-FALCON</p>

            <h4 className="font-semibold mb-2">DOWNLOAD APP</h4>
            <div className="space-y-2">
              <div className="bg-black rounded-lg p-2 flex items-center space-x-2">
                <span className="text-xs">📱 Google Play</span>
              </div>
              <div className="bg-black rounded-lg p-2 flex items-center space-x-2">
                <span className="text-xs">🍎 App Store</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-gray-400">Follow us on</span>
              <div className="flex space-x-3">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">PAYMENTS ACCEPTED</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center">VISA</div>
                <div className="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center">MC</div>
                <div className="w-8 h-5 bg-blue-800 rounded text-xs flex items-center justify-center">AMEX</div>
                <div className="w-8 h-5 bg-orange-600 rounded text-xs flex items-center justify-center">DC</div>
                <div className="w-8 h-5 bg-yellow-600 rounded text-xs flex items-center justify-center">PP</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500">Falcon ©2024. Design by v0.dev</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
