import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/connections",
        { withCredentials: true }
      );
      dispatch(addConnection(res.data.data));
// console.log(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <div>Loading...</div>;
  if (connections.length === 0) return <div>No Connections</div>;

return (
  <div className="min-h-screen bg-[#1F1B2E] py-10 px-4">
    {/* Page Title */}
    <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-12
      bg-gradient-to-r from-violet-400 to-fuchsia-400
      bg-clip-text text-transparent">
      My Connections
    </h1>

    {/* Cards Grid */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {connections.map((conn) => (
        <div
          key={conn._id}
          className="
            bg-white/95 backdrop-blur-xl
            rounded-3xl overflow-hidden
            shadow-[0_20px_60px_rgba(124,58,237,0.35)]
            hover:scale-[1.04]
            transition-all duration-300
          "
        >
          {/* Image */}
          <img
            src={conn.photoUrl}
            alt={conn.firstName}
            className="w-full h-80 object-cover"
          />

          {/* Info */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {conn.firstName}, {conn.age}
            </h2>

            <p className="text-violet-600 font-semibold mt-1">
              {conn.gender} • {conn.height} cm
            </p>

            <p className="text-gray-600 mt-3 line-clamp-3">
              {conn.about}
            </p>

            <p className="mt-4 font-semibold text-gray-700">
              💜 Looking for{" "}
              <span className="text-violet-600">
                {conn.lookingFor}
              </span>
            </p>

            <p className="text-sm text-gray-400 mt-3">
              {conn.email}
            </p>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <button
                className="
                  flex-1 py-2 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-violet-500 to-fuchsia-500
                  hover:from-violet-600 hover:to-fuchsia-600
                  transition
                "
              >
                Message
              </button>

              <button
                className="
                  flex-1 py-2 rounded-xl font-semibold
                  border border-violet-400
                  text-violet-600
                  hover:bg-violet-50
                  transition
                "
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default Connections;
