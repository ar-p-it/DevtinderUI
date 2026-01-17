import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

// const Profile = () => {
//   const user = useSelector((store) => store.user);
//   return (
//     user && (
//       <div>
//         {/* <div>Pfp</div>
//          */}
//         <EditProfile user={user} />
//       </div>
//     )
//   );
// };
// export default Profile;
const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Please login to view your profile
      </div>
    );
  }

  return <EditProfile user={user} />;
};

export default Profile;

