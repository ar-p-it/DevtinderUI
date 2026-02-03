import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  // Pre-filled demo data (REMOVE IN PRODUCTION)
  const [firstName, setFirstName] = useState("Arpita");
  const [lastName, setLastName] = useState("Kesari");
  const [emailId, setEmailId] = useState("arpita@example.com");
  const [password, setPassword] = useState("SecurePass123!");
  const [confirmPassword, setConfirmPassword] = useState("SecurePass123!");
  const [age, setAge] = useState("24");
  const [gender, setGender] = useState("female");
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5cd?auto=format&fit=crop&w=200&h=200&dpr=2"
  );
  const [about, setAbout] = useState("Passionate developer building meaningful connections through code 💻✨");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!emailId.trim()) {
      errors.emailId = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(emailId)) {
      errors.emailId = "Invalid email format";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = "Include uppercase, lowercase & numbers";
    }
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!gender) errors.gender = "Please select a gender";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    
    if (!validateForm()) {
      const container = document.querySelector('.signup-container');
      container.classList.add('animate-shake');
      setTimeout(() => container.classList.remove('animate-shake'), 500);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          emailId: emailId.trim(),
          password,
          age: age ? Number(age) : undefined,
          gender,
          photoUrl: photoUrl.trim() || undefined,
          about: about.trim() || undefined,
        },
        { withCredentials: true }
      );

      setSuccessMsg(res.data?.message || "Account created successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login", {
          state: { 
            success: "Signup successful! Please login to continue.", 
            email: emailId 
          }
        });
      }, 2500);
    } catch (error) {
      const message = 
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Signup failed. Please try again.";
      
      setErrorMsg(message);
      const container = document.querySelector('.signup-container');
      container.classList.add('animate-shake');
      setTimeout(() => container.classList.remove('animate-shake'), 500);
    } finally {
      setLoading(false);
    }
  };

  const getFieldAnimation = (value) => 
    value ? "animate-fadeInUp" : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 -left-16 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div 
        className={`signup-container max-w-4xl w-full mx-auto transform transition-all duration-700 ${
          isMounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center border border-white/30">
                  <span className="text-2xl font-bold">❤️</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 animate-fadeIn">
                Create Your Profile
              </h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto animate-fadeIn animation-delay-200">
                Join thousands of developers finding meaningful connections
              </p>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={getFieldAnimation(firstName)}>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-800 mb-1.5">First Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (fieldErrors.firstName) validateForm();
                      }}
                      autoComplete="given-name"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-xl border ${
                        fieldErrors.firstName 
                          ? 'border-rose-400 bg-rose-50 text-gray-900' 
                          : 'border-gray-300 text-gray-900 focus:border-indigo-600'
                      } placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
                      placeholder="Arpita"
                      aria-required="true"
                      aria-invalid={!!fieldErrors.firstName}
                    />
                  </div>
                  {fieldErrors.firstName && (
                    <p className="mt-1 text-sm text-rose-600 flex items-center" role="alert">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>
                
                <div className={getFieldAnimation(lastName)}>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-800 mb-1.5">Last Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (fieldErrors.lastName) validateForm();
                      }}
                      autoComplete="family-name"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-xl border ${
                        fieldErrors.lastName 
                          ? 'border-rose-400 bg-rose-50 text-gray-900' 
                          : 'border-gray-300 text-gray-900 focus:border-indigo-600'
                      } placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
                      placeholder="Kesari"
                      aria-required="true"
                      aria-invalid={!!fieldErrors.lastName}
                    />
                  </div>
                  {fieldErrors.lastName && (
                    <p className="mt-1 text-sm text-rose-600 flex items-center" role="alert">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className={getFieldAnimation(emailId)}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1.5">Email Address *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={emailId}
                    onChange={(e) => {
                      setEmailId(e.target.value);
                      if (fieldErrors.emailId) validateForm();
                    }}
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-3.5 rounded-xl border ${
                      fieldErrors.emailId 
                        ? 'border-rose-400 bg-rose-50 text-gray-900' 
                        : 'border-gray-300 text-gray-900 focus:border-indigo-600'
                    } placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
                    placeholder="arpita@example.com"
                    aria-required="true"
                    aria-invalid={!!fieldErrors.emailId}
                  />
                </div>
                {fieldErrors.emailId && (
                  <p className="mt-1 text-sm text-rose-600 flex items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {fieldErrors.emailId}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={getFieldAnimation(password)}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1.5">Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password || fieldErrors.confirmPassword) validateForm();
                      }}
                      autoComplete="new-password"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-xl border ${
                        fieldErrors.password 
                          ? 'border-rose-400 bg-rose-50 text-gray-900' 
                          : 'border-gray-300 text-gray-900 focus:border-indigo-600'
                      } placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
                      placeholder="••••••••"
                      aria-required="true"
                      aria-invalid={!!fieldErrors.password}
                    />
                  </div>
                  {fieldErrors.password && (
                    <p className="mt-1 text-sm text-rose-600 flex items-center" role="alert">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.password}
                    </p>
                  )}
                </div>
                
                <div className={getFieldAnimation(confirmPassword)}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1.5">Confirm Password *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (fieldErrors.confirmPassword) validateForm();
                      }}
                      autoComplete="new-password"
                      className={`w-full pl-10 pr-4 py-3.5 rounded-xl border ${
                        fieldErrors.confirmPassword 
                          ? 'border-rose-400 bg-rose-50 text-gray-900' 
                          : 'border-gray-300 text-gray-900 focus:border-indigo-600'
                      } placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200`}
                      placeholder="••••••••"
                      aria-required="true"
                      aria-invalid={!!fieldErrors.confirmPassword}
                    />
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-rose-600 flex items-center" role="alert">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={getFieldAnimation(age)}>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-800 mb-1.5">Age</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="age"
                      type="number"
                      min="18"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      autoComplete="bday"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="24"
                    />
                  </div>
                </div>
                
                <div className={getFieldAnimation(gender)}>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-800 mb-1.5">Gender *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 5a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        if (fieldErrors.gender) validateForm();
                      }}
                      autoComplete="sex"
                      className={`w-full pl-10 pr-10 py-3.5 rounded-xl border appearance-none ${
                        fieldErrors.gender 
                          ? 'border-rose-400 bg-rose-50 text-gray-900' 
                          : 'border-gray-300 text-gray-900 focus:border-indigo-600'
                      } placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white`}
                      aria-required="true"
                      aria-invalid={!!fieldErrors.gender}
                    >
                      <option value="" className="text-gray-500">Select your gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Non-binary / Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  {fieldErrors.gender && (
                    <p className="mt-1 text-sm text-rose-600 flex items-center" role="alert">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.gender}
                    </p>
                  )}
                </div>
              </div>

              {/* Photo URL */}
              <div className={getFieldAnimation(photoUrl)}>
                <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-800 mb-1.5">Profile Photo URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="photoUrl"
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    autoComplete="photo"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>
                <p className="mt-1 text-xs text-indigo-600 font-medium">
                  ✨ Pro tip: Professional photos get 40% more matches!
                </p>
              </div>

              {/* About */}
              <div className={getFieldAnimation(about)}>
                <label htmlFor="about" className="block text-sm font-medium text-gray-800 mb-1.5">About Yourself</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <textarea
                    id="about"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows="3"
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
                    placeholder="Tell us about your passions and what you're looking for..."
                    aria-describedby="about-helper"
                  />
                </div>
                <p id="about-helper" className="mt-1 text-xs text-gray-600 flex justify-between font-medium">
                  <span>Share what makes you unique!</span>
                  <span className={about.length > 230 ? "text-rose-500" : "text-indigo-600"}>{about.length}/250</span>
                </p>
              </div>

              {/* Messages */}
              {errorMsg && (
                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-xl animate-fadeIn" role="alert">
                  <div className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-rose-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-3 text-sm text-rose-700 font-medium">{errorMsg}</p>
                  </div>
                </div>
              )}
              
              {successMsg && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-xl animate-fadeIn" role="status">
                  <div className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-emerald-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-3 text-sm text-emerald-700 font-medium">{successMsg}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  loading
                    ? 'bg-indigo-400 cursor-wait'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 active:scale-[0.98]'
                } text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                aria-busy={loading}
                aria-disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" aria-hidden="true"></span>
                    Creating your profile...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Create Account
                  </span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600 font-medium">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Link
                to="/login"
                className="group inline-flex items-center text-indigo-700 font-bold hover:text-indigo-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Sign in to your account"
              >
                <span>Sign in to your account</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100 text-sm text-gray-600">
            <p>By signing up, you agree to our <a href="#" className="text-indigo-700 hover:text-indigo-900 font-medium hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-label="Terms of Service">Terms of Service</a> and <a href="#" className="text-indigo-700 hover:text-indigo-900 font-medium hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-label="Privacy Policy">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;