import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstPage from "../pages/first-page";

const AppRoute:React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FirstPage />
            </>
          }
        />
     
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;