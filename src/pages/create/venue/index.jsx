import VenueForm from "../../../components/forms/VenueForm";
import { Container, Title } from "@mantine/core";

function CreateVenue() {
  return (
    <>
      <Container>
        <Title order={3} mb={20}>
          Create venue
        </Title>
        <VenueForm />
      </Container>
    </>
  );
}

export default CreateVenue;
