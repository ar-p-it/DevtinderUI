import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
// import requestReducer from "./requestSlice"; //
import { removeRequest } from "../utils/requestSlice";
const Requests = () => {
  const requests = useSelector((store) => store.requests);
  console.log(requests);
  const dispatch = useDispatch();

  // const reviewRequests = async (status, _id) => {
  //   try {
  //     const res = axios.post(
  //       BASE_URL + "/request/review/" + status + "/" + _id,
  //       {},
  //       { withCredentials: true },
  //     );
  //         // remove request from UI
  // *NoT the Best way to do so
  //   const updatedRequests = requests.filter(
  //     (req) => req._id !== _id
  //   );
  //   dispatch(addRequests(updatedRequests));
  //   } catch (error) {
  //     console.error(error);   
  //   }
  // };

const reviewRequests = async (status, _id) => {
  try {
    await axios.post(
      BASE_URL + "/request/review/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );

    dispatch(removeRequest(_id)); // ✅ clean
  } catch (error) {
    console.error(error);
  }
};

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      // console.log(res);
      // console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return <div className="text-white text-center">Loading...</div>;
  if (requests.length === 0)
    return (
      <div className="text-center text-violet-300 text-xl mt-20">
        No pending requests 💜
      </div>
    );

  return (
    <div className="min-h-screen bg-[#1F1B2E] py-10 px-4">
      {/* Title */}
      <h1
        className="
          text-center text-4xl md:text-5xl font-extrabold mb-12
          bg-gradient-to-r from-violet-400 to-fuchsia-400
          bg-clip-text text-transparent
        "
      >
        Connection Requests
      </h1>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {requests.map((req) => {
          const user = req.fromUserId;

          return (
            <div
              key={req._id}
              className="
                bg-white/95 backdrop-blur-xl
                rounded-3xl p-6 flex gap-5 items-center
                shadow-[0_20px_60px_rgba(124,58,237,0.35)]
                hover:scale-[1.03]
                transition-all duration-300
              "
            >
              {/* Avatar */}
              <img
                src={user.photoUrl}
                alt={user.firstName}
                className="w-24 h-24 rounded-full object-cover border-4 border-violet-300"
              />

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {user.firstName}, {user.age}
                </h2>

                <p className="text-violet-600 font-semibold">
                  {user.gender} • {user.height} (hright)cm
                </p>

                <p className="text-gray-600 mt-1 line-clamp-2">{user.about}</p>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button
                    className="
                      flex-1 py-2 rounded-xl font-semibold text-white
                      bg-gradient-to-r from-violet-500 to-fuchsia-500
                      hover:from-violet-600 hover:to-fuchsia-600
                      transition
                    "
                    onClick={() => {
                      console.log(requests);

                      reviewRequests("accepted", req._id);
                    }}
                  >
                    Accept
                  </button>

                  <button
                    className="
                      flex-1 py-2 rounded-xl font-semibold
                      border border-violet-400
                      text-violet-600
                      hover:bg-violet-50
                      transition
                    "
                    onClick={() => {
                      reviewRequests("rejected", req._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
