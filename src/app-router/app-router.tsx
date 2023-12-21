import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstPage from "../pages/first-page";
import LoginPage from "../pages/login-page";

import OtpValidationPage from "../pages/otp-validation-page";
import SuccessfulRegistration from "../pages/success-registration";
import LibraryPage from "../pages/library-page";
import AccountPage from "../pages/account-page";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/mid-life-journey"
          element={
            <>
              <FirstPage />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path="/otp-validation"
          element={
            <>
              <OtpValidationPage />
            </>
          }
        />
        <Route
          path="/success-registration"
          element={
            <>
              <SuccessfulRegistration />
            </>
          }
        />
         <Route
          path="/library"
          element={
            <>
              <LibraryPage />
            </>
          }
        />
        <Route
          path="/account"
          element={
            <>
              <AccountPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
