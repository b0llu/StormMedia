import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const RestrictAuth = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.currentUser);

  return currentUser._id ? (
    <Navigate
      to={location.state !== null ? location.state.from.pathname : "/home"}
      state={{ from: location }}
      replace
    />
  ) : (
    <Outlet />
  );
};
