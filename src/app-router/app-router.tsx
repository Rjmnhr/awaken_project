import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstPage from "../pages/first-page";
import LoginPage from "../pages/login-page";

import OtpValidationPage from "../pages/otp-validation-page";
import SuccessfulRegistration from "../pages/success-registration";
import LibraryPage from "../pages/library-page";
import AccountPage from "../pages/account-page";
import CheckoutComponent from "../components/payment-checkout/Checkout";
import ProductPurchasePage from "../pages/product-purchase";
import Success from "../components/payment-checkout/Success";
import PrivacyPolicy from "../pages/privacy-policy";
import ForgotPasswordPage from "../pages/forgot-password-page";

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
        <Route
          path="/create-account"
          element={
            <>
              <ProductPurchasePage />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <ForgotPasswordPage />
            </>
          }
        />
        <Route
          path="/payment-checkout"
          element={
            <>
              <CheckoutComponent price="price_1OZX1JDNZni9rE7FwOOVnP5N" />
            </>
          }
        />
        <Route
          path="/success.html"
          element={
            <>
              <Success />
            </>
          }
        />
        <Route
          path="/canceled.html"
          element={
            <>
              <Success />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
