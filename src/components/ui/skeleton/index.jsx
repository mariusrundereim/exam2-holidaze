import { Skeleton } from "@mantine/core";
function VenueSkeleton() {
  return (
    <>
      <Skeleton height={170} />
      <Skeleton height={40} mt={20} />
      <Skeleton height={14} mt={6} />
      <Skeleton height={14} mt={6} />
    </>
  );
}

export default VenueSkeleton;
