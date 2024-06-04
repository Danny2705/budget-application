// import React, { useState, useEffect } from "react";
// import { useSearchParams, Link, useNavigate } from "react-router-dom";
// import { auth } from "../../utils/firebase"; 
// import { confirmPasswordReset } from "firebase/auth";
// import toast from "react-hot-toast";

// //reference: chatgpt: I want to build a reset password form with the same layout as signup form

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [oobCode, setOobCode] = useState("");
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const code = searchParams.get("oobCode");
//     if (code) {
//       setOobCode(code);
//     } else {
//       toast.error("Invalid or missing reset code.");
//       navigate("/login");
//     }
//   }, [searchParams, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!password || !oobCode) {
//         toast.error("Please fill in all fields");
//         return;
//       }

//       await confirmPasswordReset(auth, oobCode, password);

//       setPassword("");
//       setOobCode("");

//       toast.success("Password reset successful! Please log in with your new password.");
//       navigate("/login");
//     } catch (error) {
//       if (error.code === "auth/expired-action-code") {
//         toast.error("The password reset code has expired.");
//       } else if (error.code === "auth/invalid-action-code") {
//         toast.error("The password reset code is invalid.");
//       } else {
//         console.error(error);
//         toast.error("Failed to reset password. Please try again.");
//       }
//     }
//   };

//   return (
//     <div>
//       <div className='blur-circle'></div>
//       <div className='max-w-[1200px] flex items-center justify-center h-[100vh] mx-auto'>
//         <div className=' bg-main-lightPurple px-4 py-6 rounded-xl relative'>
//           <div className='left-circle w-[50px] h-[50px] bg-main-lightPink absolute -left-5 -top-6 -z-10 rounded-full'></div>
//           <div className='form flex'>
//             <div className='left px-4 z-10 w-[250px] mt-[30px]'>
//               <h1 className='font-bold text-2xl text-center'>Reset Password</h1>
//               <div className='login-form bg-main-darkPurple rounded-e-[2rem] mt-4 absolute left-6 w-[270px]'>
//                 <form className='p-4 flex flex-col gap-3' onSubmit={handleSubmit}>
//                   <div className='flex flex-col gap-1'>
//                     <label className='text-pink-600'>New Password:</label>
//                     <input
//                       type='password'
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className='bg-transparent border-2 rounded-sm px-2 border-main-lightPink outline-none text-white py-1 text-sm'
//                     />
//                   </div>
//                   <button
//                     type='submit'
//                     className='bg-white py-1 hover:bg-slate-300 duration-300 rounded-full mt-[20px]'
//                   >
//                     Reset Password
//                   </button>
//                 </form>
//                 <p className='px-4 pb-4 flex items-center justify-between'>
//                   <span className='text-[10px] text-white'>
//                     Remembered your password?
//                   </span>
//                   <span className='text-[10px] text-yellow-300'>
//                     <Link to='/login'>Log in</Link>
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <div className='right'>
//               <img
//                 src='/loginImage.jpg'
//                 alt='profile'
//                 width={500}
//                 height={500}
//                 className='rounded-xl'
//               />
//             </div>
//           </div>
//           <div className='right-circle w-[50px] h-[50px] bg-main-lightPink absolute -right-5 -bottom-6 -z-10 rounded-full'></div>
//         </div>
//       </div>
//     </div>
//   );
// }
