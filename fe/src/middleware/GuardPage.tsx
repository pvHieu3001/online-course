import { popupError } from "@/page/shared/Toast";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";

export default function GuardPage({children}: { children: React.ReactNode }){
  
    const [user] = useLocalStorage('user', undefined);
    if(!user){
         popupError('Vui lòng đăng nhập trước!')
         return <Navigate to="/" />;
    }
    return <> {children}</>

}