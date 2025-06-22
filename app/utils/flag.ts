export function getFlagManagementSystem() {
  return import.meta.env.VITE_FLAG_MANAGEMENT_SYSTEM === "true";
}
