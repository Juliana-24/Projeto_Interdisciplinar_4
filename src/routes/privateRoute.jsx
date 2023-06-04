import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  let userid = sessionStorage.getItem("@Auth:token") == null ? false : true;
  return <>{userid ? <Outlet /> : <Navigate to="/" />}</>;
}
