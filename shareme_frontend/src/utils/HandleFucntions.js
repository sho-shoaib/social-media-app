import { navigate } from "../App";

export const handleSearch = (inputRef) => {
  if (inputRef.current.value === "") {
    navigate("/");
  } else {
    navigate(`/search?${inputRef.current.value}`);
  }
};
