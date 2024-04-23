export function getAuthHeaders() {
  const accessToken = localStorage.getItem("accessToken");
  const headers = new Headers({
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": "189d0a84-4f38-4944-8e5e-60946f5eba57",
    "Content-Type": "application/json",
  });
  return headers;
}
