import { MainPage } from "./pages/main-page";
import { ImagePage } from "./pages/image-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="/image/:id" element={<ImagePage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
