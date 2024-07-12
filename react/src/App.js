// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import DashBord from "./pages/DashBord";
// import PageNotFound from "./pages/PageNotFound";
// import Protected from "./components/Protected";
// import { useCookies } from "react-cookie";

// function App() {
//   // const [cookies, setCookie] = useCookies(["jwt"]);

//   return (
//     <div className="App">
//       <main>
//         <Routes>

//           <Route element={<Protected />}>
//             <Route
//               path="/"
//               element={
//                 <Header>
//                   <DashBord />
//                 </Header>
//               }
//             />
//             <Route path="*" element={<PageNotFound />} />
//           </Route>

//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />

//         </Routes>
//       </main>
//       {/* <DashBord /> */}
//     </div>
//   );
// }

// export default App;

// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import DashBord from "./pages/DashBord";
// import PageNotFound from "./pages/PageNotFound";
// import Protected from "./components/Protected";
// import { useCookies } from "react-cookie";

// function App() {
//   // const [cookies, setCookie] = useCookies(["jwt="]); // Ensure cookies are being read
//   const [cookies] = useCookies(["jwt"]); // Read the 'jwt' cookie
//   console.log(cookies);

//   console.log("JWT Cookie:", cookies); // For debugging

//   return (
//     <div className="App">
//       <main>
//         <Routes>
//           {/* Protected routes */}
//           <Route element={<Protected />}>
//             <Route
//               path="/"
//               element={
//                 <Header>
//                   <DashBord />
//                 </Header>
//               }
//             />
//             <Route path="*" element={<PageNotFound />} />
//           </Route>

//           {/* Public routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBord from "./pages/DashBord";
import PageNotFound from "./pages/PageNotFound";
import Protected from "./components/Protected";
import EmployeeList from "./pages/EmployeeList";

function App() {
  // let result = Cookies.get("user");
  // console.log(result);

  return (
    <>
      <div className="App">
        <main>
          <Routes>
            <Route element={<Protected />}>
              <Route
                path="/"
                element={
                  <Header>
                    <DashBord />
                  </Header>
                }
              />

              <Route
                path="/employeeList"
                element={
                  <Header>
                    <EmployeeList />
                  </Header>
                }
              />

              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
