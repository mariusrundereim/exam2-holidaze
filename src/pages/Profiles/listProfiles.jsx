import { Grid } from "@mantine/core";
import ProfilesCard from "../../components/cards/ProfilesCard";
function ListProfiles({ profiles }) {
  return (
    <>
      <h2>List of profiles:</h2>

      <Grid>
        {profiles.map((profile) => (
          <Grid.Col key={profile.name}>
            <ProfilesCard profile={profile} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default ListProfiles;
