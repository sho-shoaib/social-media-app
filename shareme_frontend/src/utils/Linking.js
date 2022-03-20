import { navigate } from "../App";
import { list } from "../Components/Sidebar";

export const handleNav = (listItem, userId) => {
  if (list.includes(listItem)) {
    navigate(`/category/${listItem}`);
  } else if (listItem === "home") {
    navigate("/");
  } else if (listItem === "create") {
    navigate(`/profile/${userId}/create`);
  } else if (listItem === "profile") {
    navigate(`/profile/${userId}`);
  } else if (listItem === "search") {
    navigate("/search");
  }
};
