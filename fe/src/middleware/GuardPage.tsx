import { useEffect, useState } from "react";
import { popupError } from "@/page/shared/Toast";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Navigate, Outlet } from "react-router-dom";

export default function GuardPage() {
  const [user] = useLocalStorage("user", undefined);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!user) {
      popupError("Vui lòng đăng nhập trước!");
      setShowError(true);
    }
  }, [user]);

  if (!user && showError) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
