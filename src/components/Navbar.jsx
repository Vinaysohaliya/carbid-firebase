import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';

const NavbarComponent = () => {
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const userData = useSelector(state => state.auth.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <div className="logo">
          <h1>My App</h1>
        </div>
      </NavbarBrand>
      <NavbarContent className="nav-links" justify="center">
      <NavbarItem>
          <Link color="foreground" href="/buyvehicle">
            Buy
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/sellvehicle">
            Sell
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
        
        {loggedIn ? (
          <>
            <NavbarItem>
              <Link color="foreground" href="/profile">
                Profile
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button color="error" onClick={handleLogout}>
                Logout
              </Button>
            </NavbarItem>
            <NavbarItem>
              <span>Welcome, {userData.name}</span>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link color="foreground" href="/signin">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/signup">
                Sign Up
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu open={isMenuOpen} onChange={setIsMenuOpen}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 0 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={`/${item}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;
