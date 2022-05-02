import { MainPage } from "./pages/main";
import { ImagePage } from "./pages/image";
import { UserProfilePage } from "./pages/userProfile";
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
