import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // Logic for handling the login submission
    // (for example, calling an API to verify the user)
    console.log('Logging in with:', { email, password, rememberMe });

    // Clear fields on successful login (for this example, we just log the data)
    setEmail('');
    setPassword('');
    setRememberMe(false);
  };
  return (
   

      <>
        
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            
              {/* <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a> */}
            </p>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
            {errorMessage && (
              <div className="bg-red-100 text-red-800 px-4 py-2  mb-4">
                {errorMessage}
              </div>
            )}
              <form className="space-y-6 h-70 w-95" action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 text-black" >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                    onChange={(e) => setEmail(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border-2 border-blue-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 text-black">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                    onChange={(e) => setPassword(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border-2 border-blue-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </button>
                </div>
              </form>
  
              
            </div>
          </div>
        </div>
      </>
    )
  }
  
  

export default Login



// import React, { useState } from 'react';
// import axios from 'axios'; // Import Axios

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage('Please fill out all fields.');
//       return;
//     }

//     setLoading(true); // Set loading state to true before making the request

//     try {
//       // Replace 'https://your-api-endpoint.com/login' with your actual API endpoint
//       const response = await axios.post('https://your-api-endpoint.com/login', {
//         email,
//         password,
//         rememberMe,
//       });

//       if (response.status === 200) {
//         // Successful login, handle response as needed
//         console.log('Login successful:', response.data);
//         // Optionally, clear the form or redirect the user
//         setEmail('');
//         setPassword('');
//         setRememberMe(false);
//       }
//     } catch (error) {
//       // Handle errors here (e.g., invalid login credentials)
//       console.error('Login error:', error);
//       setErrorMessage('Invalid email or password. Please try again.');
//     } finally {
//       setLoading(false); // Reset loading state after request completes
//     }
//   };

//   return (
//     <>
//       <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <img
//             className="mx-auto h-12 w-auto"
//             src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
//             alt="Workflow"
//           />
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{' '}
//             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//               start your 14-day free trial
//             </a>
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             {errorMessage && (
//               <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
//                 {errorMessage}
//               </div>
//             )}
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={() => setRememberMe(!rememberMe)}
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                     Forgot your password?
//                   </a>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#c8190ccf] hover:bg-[#b6180a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   disabled={loading} // Disable button while loading
//                 >
//                   {loading ? 'Logging in...' : 'Sign in'}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-3 gap-3">
//                 <div>
//                   <a
//                     href="#"
//                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                   >
//                     <span className="sr-only">Sign in with Facebook</span>
//                     <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </div>

//                 <div>
//                   <a
//                     href="#"
//                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                   >
//                     <span className="sr-only">Sign in with Twitter</span>
//                     <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
//                     </svg>
//                   </a>
//                 </div>

//                 <div>
//                   <a
//                     href="#"
//                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                   >
//                     <span className="sr-only">Sign in with GitHub</span>
//                     <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.986 1.029-2.684-.103-.253-.445-1.273-.138-2.658 0 0 .836-.269 2.73 1.031.79-.22 1.64-.327 2.477-.33.834 0 1.688.108 2.477.33 1.892-1.3 2.728-1.031 2.728-1.031.31 1.385-.035 2.405-.138 2.658.64.698 1.029 1.591 1.029 2.684 0 3.849-2.336 4.698-4.555 4.951.413.355.776.98.776 1.967 0 1.418-.013 2.544-.013 2.885 0 .268.183.578.684.482C17.137 18.197 20 14.425 20 10.017 20 4.484 15.523 0 10 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
