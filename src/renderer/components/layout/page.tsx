import React, { PropsWithChildren } from 'react';
import Header from './header';

const Page: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="h-full w-screen bg-white flex flex-col select-none overflow-hidden border border-slate-200">
    <Header />
    <div className="app-container">
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  </div>
);

export default Page;
