import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, Bell, Globe, Moon, ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

// Header Component
const Header = () => {
  return (
    <div className="w-full bg-white shadow-md">
      {/* Top Section - White Background */}
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Left Side - Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden">
            <img 
              src="frsme.png" 
              alt="Home"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-2xl font-bold text-black">Fito<span className="text-red-500">coach</span></span>
        </div>

        {/* Center - Main Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link to="/signup" className="text-red-500 font-medium hover:text-red-600">Join Us</Link>
            <span className="text-gray-400">or</span>
          </div>
          <Link to="/login" className="text-sm text-gray-600 hover:text-red-500">Login</Link>
          
          <div className="h-8 w-px bg-gray-300"></div>
          
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">Notification</span>
          </div>
          
          <div className="h-8 w-px bg-gray-300"></div>
          
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-800" />
            <span className="text-sm text-gray-600">ENG</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
            Advanced
          </button>
        </div>
      </div>

      {/* Bottom Section - Dark Background */}
      <div className="bg-gray-900 px-8 py-3 flex items-center justify-between">
        {/* Left Side - Icon Grid */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 rounded-lg p-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-3 w-80">
            <input 
              type="text" 
              placeholder="All categories"
              className="flex-1 outline-none text-sm text-gray-700"
            />
            <ChevronDown className="w-4 h-4 text-gray-400" />
            <div className="h-6 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-400">Search</span>
          </div>
        </div>

        {/* Center - Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-white text-sm hover:text-red-500 transition-colors">Home</Link>
          <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Our services</a>
          <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Categories</a>
          <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Contact us</a>
          <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Guide</a>
        </nav>

        {/* Right Side - Icons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Login Component
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Back Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Or <Link to="/signup" className="text-red-500 hover:text-red-600 font-semibold">sign up</Link>
            </p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your email address"
                    required
                  />
                  <Eye className="absolute right-3 top-3.5 text-gray-400" size={20} />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm text-gray-600 hover:text-red-500">
                  Forgot your password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-red-600 hover:to-pink-700 transition duration-200 shadow-md"
              >
                Login
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign in using</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-4 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">G</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl"><svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"></path> </g></svg></span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">𝕏</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">f</span>
                </button>
              </div>

              {/* Terms */}
              <p className="text-xs text-center text-gray-500 mt-6">
                By continuing, you agree to FitCoach's{' '}
                <a href="#" className="text-red-500 hover:text-red-600">
                  Terms of Service
                </a>{' '}
                and acknowledge that you've read our{' '}
                <a href="#" className="text-red-500 hover:text-red-600">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-red-500 hover:text-red-600 font-semibold">
                Create new account
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 FitCoach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

