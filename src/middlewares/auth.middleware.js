import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const checkAuth = (store) => () => {
    const user = store.getState().userState.user;
    if(!user) {
        setTimeout(() => {
            toast.warn("You must log in first!");
        }, 100);
        return redirect("/login");
    }
    return null
}