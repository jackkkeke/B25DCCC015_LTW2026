
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                Rung Chuông Vàng
            </div>

            <div className="navbar-links">
                <NavLink to="/">
                    Trang chủ
                </NavLink>

                <NavLink to="/questions">
                    Ngân hàng câu hỏi
                </NavLink>

                <NavLink to="/history">
                    Lịch sử
                </NavLink>
            </div>
        </nav>
    );
}

export default NavBar;
