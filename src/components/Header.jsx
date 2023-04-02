import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <div id="main-navbar" className="navbar">
                <h2 className="logo">Create Quiz</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/quiz">Create</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};