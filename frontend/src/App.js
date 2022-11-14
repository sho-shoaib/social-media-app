import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Authentication from "./pages/Authentication";
import CreatePost from "./pages/CreatePost";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='w-full'>
          <Navbar />
          <div className='p-8'>
            <Routes>
              <Route element={<Homepage />} path='/' />
              <Route
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
                path='/profile'
              />
              <Route
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
                path='/create'
              />
              <Route element={<Authentication />} path='/auth' />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
