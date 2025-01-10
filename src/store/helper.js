export function getAuthHeaders() {
  const accessToken = localStorage.getItem("accessToken");
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": "81429b07-b6cd-4bfb-9a53-f842fd2000e8",
    "Content-Type": "application/json",
  });
  return headers;
}
