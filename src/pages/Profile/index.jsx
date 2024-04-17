import { useParams } from "react-router-dom";
import { useGetProfileByIdQuery } from "../../store/api/apiSlice";

function ProfilePage() {
  const { data: profile, error, isLoading } = useGetProfileByIdQuery();

  let params = useParams();
  console.log(params.profileId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;
  return (
    <>
      <h1>Profile page</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>No profile found</p>
      )}
    </>
  );
}

export default ProfilePage;
