import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

var navigate;

function App() {
  navigate = useNavigate();

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
}

export default App;
export { navigate };
