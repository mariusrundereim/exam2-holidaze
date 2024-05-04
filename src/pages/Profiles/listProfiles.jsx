import ProfilesCard from "../../components/cards/ProfilesCard";

function ListProfiles({ profiles }) {
  return (
    <>
      <h2>List of profiles:</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.name}>
            <ProfilesCard profile={profile} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListProfiles;
