import React, { PropsWithChildren } from "react";
import Footer from "./footer";
import Header from "./header";

const Page: React.FC<PropsWithChildren> = ({ children }) => (
    <div className="h-screen w-screen bg-white flex flex-col select-none overflow-hidden border border-slate-200">
        <Header />
        <div className="flex-1 flex flex-col px-8 pt-10">
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
            <Footer />
        </div>
    </div>
);

export default Page;
    