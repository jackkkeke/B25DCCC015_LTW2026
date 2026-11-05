import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export const Layout = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Trò chơi: Rung chuông vàng</h1>
        <NavBar />
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};