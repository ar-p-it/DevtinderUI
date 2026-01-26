import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("Arpita");
  const [lastName, setLastName] = useState("Kesari");
  const [emailId, setEmailId] = useState("arpita@gmail.com");
  const [password, setPassword] = useState("Arpita@123");
  const [confirmPassword, setConfirmPassword] = useState("Arpita@123");
  const [age, setAge] = useState("24");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEwxM34CYR2Xt28HrDYLo2gjWc4pOlDO2AWFJcrlKWMcDzFDlI5DBUdts&s",
  );
  const [about, setAbout] = useState("Crazyyy");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // basic validation
    if (!firstName || !lastName || !emailId || !password) {
      setErrorMsg("Please fill all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (!gender) {
      setErrorMsg("Please select a gender.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age: age ? Number(age) : undefined,
          gender,
          photoUrl: photoUrl || undefined,
          about: about || undefined,
        },
        { withCredentials: true },
      );

      // Signup successful, show toast and redirect to login
      setErrorMsg("");
      setSuccessMsg(res.data?.message || "Signup successful!");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Signup successful! Please login." },
        });
      }, 2000);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Signup failed. Please try again.";
      setErrorMsg(message);
      setSuccessMsg("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 via-pink-50 to-purple-100 p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Join devTinder
            </h1>
            <p className="text-gray-600 text-lg">
              Create your profile in minutes
            </p>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            onSubmit={handleSignup}
          >
            {/* First Name */}
            <label className="form-control">
              <span className="label-text font-semibold text-gray-700 mb-2">
                First Name *
              </span>
              <input
                type="text"
                className="input input-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
              />
            </label>

            {/* Last Name */}
            <label className="form-control">
              <span className="label-text font-semibold text-gray-700 mb-2">
                Last Name *
              </span>
              <input
                type="text"
                className="input input-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </label>

            {/* Email */}
            <label className="form-control md:col-span-2">
              <span className="label-text font-semibold text-gray-700 mb-2">
                Email Address *
              </span>
              <input
                type="email"
                className="input input-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            {/* Password */}
            <label className="form-control">
              <span className="label-text font-semibold text-gray-700 mb-2">
                Password *
              </span>
              <input
                type="password"
                className="input input-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>

            {/* Confirm Password */}
            <label className="form-control">
              <span className="label-text font-semibold text-gray-700 mb-2">
                Confirm Password *
              </span>
              <input
                type="password"
                className="input input-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>

            {/* Age */}
            <label className="form-control">
              <span className="label-text font-semibold text-gray-700 mb-2">
                Age
              </span>
              <input
                type="number"
                className="input input-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
              />
            </label>

            {/* Gender */}
            <label className="form-control">
              <span className="label-text font-semibold text-gray-700 mb-2">
                Gender
              </span>
              <select
                className="select select-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </label>

            {/* Photo URL */}
            <label className="form-control md:col-span-2">
              <span className="label-text font-semibold text-gray-700 mb-2">
                Photo URL
              </span>
              <input
                type="text"
                className="input input-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
            </label>

            {/* About */}
            <label className="form-control md:col-span-2">
              <span className="label-text font-semibold text-gray-700 mb-2">
                About
              </span>
              <textarea
                className="textarea textarea-bordered bg-white dark:bg-white text-gray-900 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself..."
                rows="3"
              />
            </label>

            {/* Error Message */}
            {errorMsg && (
              <div className="md:col-span-2 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                {errorMsg}
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="md:col-span-2 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                {successMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="md:col-span-2 py-3 px-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
