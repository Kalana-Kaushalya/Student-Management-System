// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

//pages & Components
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import AddStudent from "./pages/AddStudent";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:studentId" element={<Profile />} />
              <Route path="/AddStudent" element={<AddStudent/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
