// Mock user data component - in a real app, this would come from auth context or API
export const getUserData = () => ({
  name: localStorage.getItem("userName") || "John Driver",
  email: localStorage.getItem("userEmail") || "john.driver@example.com",
  avatar: "https://d2kde5ohu8qb21.cloudfront.net/files/684f27791210320008016dfd/profile3-greg.jpg",
  joined: "January 2023"
});
