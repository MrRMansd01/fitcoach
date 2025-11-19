import { useState } from 'react';
import { Eye, EyeOff, ChevronDown, Bell, Globe, Moon, ShoppingCart, Search } from 'lucide-react';

// Header Component
const Header = () => {
  return (
    <div className="w-full bg-white shadow-md">
      {/* Top Section - White Background */}
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Left Side - Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-red-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-2xl font-bold text-black">Fito<span className="text-red-500">coach</span></span>
        </div>

        {/* Center - Main Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <button className="text-red-500 font-medium hover:text-red-600">Join Us</button>
            <span className="text-gray-400">or</span>
          </div>
          <button className="text-sm text-gray-600 hover:text-red-500">Login</button>
          
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
              <div className="w-2 h-2 bg-gray-900 rounded-sm"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-sm"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-sm"></div>
              <div className="w-2 h-2 bg-gray-900 rounded-sm"></div>
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
          <a href="#" className="text-white text-sm hover:text-red-500 transition-colors">Home</a>
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
export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isSignup && password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(isSignup ? 'Signup' : 'Login', 'submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {isSignup ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {isSignup ? (
                <>Already have an account? <button onClick={() => setIsSignup(false)} className="text-red-500 hover:text-red-600 font-semibold">Sign in</button></>
              ) : (
                <>Or <button onClick={() => setIsSignup(true)} className="text-red-500 hover:text-red-600 font-semibold">sign up</button></>
              )}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            <div className="space-y-6">
              {/* Name Input - Only for Signup */}
              {isSignup && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

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
                  />
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
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password - Only for Signup */}
              {isSignup && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password - Only for Login */}
              {!isSignup && (
                <div className="text-right">
                  <a href="#" className="text-sm text-gray-600 hover:text-red-500">
                    Forgot your password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-red-600 hover:to-pink-700 transition duration-200 shadow-md"
              >
                {isSignup ? 'Create Account' : 'Login'}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or sign {isSignup ? 'up' : 'in'} using</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-4 gap-3">
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
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
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignup ? (
                <>Already have an account? <button onClick={() => setIsSignup(false)} className="text-red-500 hover:text-red-600 font-semibold">Sign in</button></>
              ) : (
                <>Don't have an account? <button onClick={() => setIsSignup(true)} className="text-red-500 hover:text-red-600 font-semibold">Create new account</button></>
              )}
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