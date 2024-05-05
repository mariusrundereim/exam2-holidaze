import { Pagination, Text } from "@mantine/core";
import { useState } from "react";

function PaginationProfiles() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(false);

  return (
    <>
      <Pagination />
    </>
  );
}

export default PaginationProfiles;
