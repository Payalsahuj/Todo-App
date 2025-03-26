import { cookies } from "next/headers";
import Home from "./Component/HomePage";
import { Login } from "./Component/LoginPage";
import { verifyAndDecodeToken } from "../lib/verifyToken";

const AppHolder = async () => {
  const pageCookies = await cookies();
  let isValidToken = false;
  let user = null;
  if (pageCookies.get("token")) {
    user = await verifyAndDecodeToken(pageCookies.get("token")?.value);

    if (user?.email) {
      isValidToken = true;
    }
  }

  if (!isValidToken) {
    return <Login />;
  }

  return <Home email={user?.email} username={user?.split?.("@")?.[0]} />;
};

export default AppHolder;
