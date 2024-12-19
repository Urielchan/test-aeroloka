import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
      //navbar nanti disini
        <main className="mx-auto min-h-[80vh]">
            <Outlet />
        </main>

        //footer nanti disini
    );
};

export default PublicLayout;
