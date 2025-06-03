
// Mock user data component - in a real app, this would come from auth context or API
export const getUserData = () => ({
  name: localStorage.getItem("userName") || "John Driver",
  email: localStorage.getItem("userEmail") || "john.driver@example.com",
  avatar: "https://d2kde5ohu8qb21.cloudfront.net/files/6839e7e53277480008013d30/greg.jpg",
  joined: "January 2023"
});
