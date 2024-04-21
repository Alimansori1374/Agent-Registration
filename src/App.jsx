import React from "react";
import logoImg from "./assets/Day.png";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetPhone from "./components/GetPhone";
import CodePhone from "./components/CodePhone";
import NameCompo from "./components/NameCompo";
import CompeleteCompo from "./components/CompeleteCompo";
import FinallStep from "./components/FinallStep";
const App = () => {
  return (
    <div className="relative">
      <div className="h-[30vh] bg-customBlue rounded-b-[25px] flex justify-center items-start">
        <img src={logoImg} className="h-16 w-16" />
      </div>

      <div className="absolute w-[80%] top-20 left-0 right-0 mx-auto  flex flex-col items-center ">
        <Router>
          <Routes>
            <Route path="/" element={<GetPhone />} />
            <Route path="/CodePhone" element={<CodePhone />} />
            <Route path="/NameCompo" element={<NameCompo />} />
            <Route path="/CompeleteCompo" element={<CompeleteCompo />} />
            <Route path="/FinallStep" element={<FinallStep />} />
          </Routes>
        </Router>
      </div>

       {/* some changes haaa haaha */}


      
    </div>
  );
};

export default App;
