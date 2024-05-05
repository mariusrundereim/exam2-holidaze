import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../../store/profiles/profilesSlice";
import { useEffect } from "react";
import ListProfiles from "./listProfiles";
import SearchPanelProfiles from "./SearchBar";

function Profiles() {
  const dispatch = useDispatch();

  const allProfiles = useSelector((state) => state.profiles.allProfilesList);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
    <>
      <h2>All profiles</h2>
      <SearchPanelProfiles />
      <ListProfiles profiles={allProfiles} />
    </>
  );
}

export default Profiles;
