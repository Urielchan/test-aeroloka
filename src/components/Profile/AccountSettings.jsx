import React from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/profile.service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";

const AccountSettings = () => {
    const { email } = useSelector((state) => state.userState.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            await deleteUser(email);
            toast.info("user deleted successfully");
            dispatch(logoutUser())
            navigate("/");
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };
    return (
        <div>
            <>
                <h2 className="text-xl font-bold mb-4 mt-4">
                    Account Settings
                </h2>
                <div>
                    <p>
                        This action cannot be undone. Please continue with
                        caution
                    </p>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        onClick={handleDelete}
                        className="bg-red-500 text-white rounded-md py-2 px-8 hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </>
        </div>
    );
};

export default AccountSettings;