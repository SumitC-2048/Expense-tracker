import "./auth.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const SignIn = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");
        const navigate = useNavigate();
        
        const handleSignIn = async (e) => {
            try {
                e.preventDefault();
                const response = await axios.post('http://localhost:3000/auth/signin',{
                    email: email,
                    password: password
                });
                console.log("response: ",response);
                if(response.data.success){
                    console.log("User logged in successfully");
                    setError("");
                    localStorage.setItem('email',email);
                    navigate('/DashBoard');
                }else{
                    setError(response.data.message);
                    console.log("Error in Sign in");
                }
            } catch (error) {
                console.log('inside catch block');
                console.log(error.message);
                setError(error.message);
            }
        }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your expense tracker account</p>
          </div>

          {/* Divider
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
           */}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              onClick={handleSignIn}
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default SignIn;
 