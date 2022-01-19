import { MainPage } from "./pages/main-page";
import { ImagePage } from "./pages/image-page";
import { UserProfilePage } from "./pages/user-profile-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/images/:id" element={<ImagePage/>}></Route>
          <Route path="/users/:id" element={<UserProfilePage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
