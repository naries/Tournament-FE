import { useSelector } from "react-redux";
import { Signin, Signup } from "./features/authentication";
import { RootState } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFound } from "./features/not-found";
import { Home } from "./features/home";

function App() {
  const authentication = useSelector((state: RootState) => state.auth);

  return (
    <div className="App">
      <Router>
        <Routes>
          {authentication.status !== "logged-in" && (
            <>
              <Route path="/" element={<Signin />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
          {authentication.status === "logged-in" && (
            <Route path="/" element={<Home />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
