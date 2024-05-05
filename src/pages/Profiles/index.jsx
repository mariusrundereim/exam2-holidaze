import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../../store/profiles/profilesSlice";
import ListProfiles from "./listProfiles";
import SearchPanelProfiles from "./SearchBar";
import PaginationProfiles from "./PaginationControls";

function Profiles() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const allProfiles = useSelector((state) => state.profiles.allProfilesList);

  useEffect(() => {
    dispatch(getAllProfiles(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <h2>All profiles</h2>
      <SearchPanelProfiles />
      {/* <ListProfiles profiles={allProfiles} /> */}
      {/* <PaginationProfiles /> */}
    </>
  );
}

export default Profiles;
