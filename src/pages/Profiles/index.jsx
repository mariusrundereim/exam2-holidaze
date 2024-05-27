import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../../store/profiles/profilesSlice";

function AllProfilesPage() {
  const dispatch = useDispatch();
  const allProfiles = useSelector((state) => state.profiles.allProfiles);
  const loading = useSelector((state) => state.profiles.loading);
  const error = useSelector((state) => state.profiles.error);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  console.log("All profiles in state:", allProfiles); // Debugging log

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2>All profiles</h2>
      {allProfiles.length > 0 ? (
        allProfiles.map((profile) => (
          <div key={profile.id}>{profile.owner.name}</div>
        ))
      ) : (
        <p>No profiles found.</p>
      )}
    </>
  );
}

export default AllProfilesPage;
