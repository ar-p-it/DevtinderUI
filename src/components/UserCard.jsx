const UserCard = ({ user }) => {
  if (!user) return null;

  const {
    firstName,
    lastName,
    gender,
    age,
    photoUrl,
    about,
    interests = [],
    location,
    verified,
  } = user;

  return (
    <div className="card card-side bg-base-100 shadow-md w-full max-w-xl">
      {/* Profile Image */}
      <figure className="w-1/3">
        <img
          src={photoUrl}
          alt={`${firstName}'s profile`}
          className="h-full w-full object-cover"
        />
      </figure>

      {/* Profile Info */}
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
          {verified && <span className="ml-2 text-blue-500">✔</span>}
        </h2>

        <p className="text-sm text-gray-600">
          {age} • {gender}
          {location?.city && ` • ${location.city}`}
        </p>

        <p className="mt-2">{about}</p>

        {/* Interests */}
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {interests.map((interest, idx) => (
              <span key={idx} className="badge badge-outline badge-sm">
                {interest}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-outline btn-error">❌</button>
          <button className="btn btn-outline btn-success">❤️</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
