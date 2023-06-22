import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import logo from "../../assets/logoBranca.png";

import { grey } from "@mui/material/colors";

import { RxExit } from "react-icons/rx";
import { FaBars, FaTimes } from "react-icons/fa";

import "./styles.css";

export default function Header() {
  const { singOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 55;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    singOut();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/home">
        <img src={logo} alt="" />
      </Link>
      <div className="containerInicio">
        <ul className={isMobile ? "headerLinksMobile" : "headerLinks"}>
          <Link to="/home" className="link">
            Home
          </Link>
          <Link to="/sobre" className="link">
            Sobre
          </Link>
          <Link to="/novo_projeto" className="link">
            Novo Projeto
          </Link>
        </ul>
        <div className="containerIcone">
          <IconButton
            size="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle sx={{ fontSize: 30, color: grey[100] }} />
          </IconButton>

          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 5.5,
                maxWidth: "45%",
                minWidth: "14%",
                display: "block",
              },
            }}
          >
            <MenuItem onClick={handleLogout} id="menuIcone">
              <RxExit />
              Sair
            </MenuItem>
          </Menu>
        </div>
      </div>
      <button className="btnMenuMobile" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}
