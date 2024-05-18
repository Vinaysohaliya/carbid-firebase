import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Avatar } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';

const NavbarComponent = () => {
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 

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
          <Link color="foreground" href="/vehiclelist">
            vehiclelist
          </Link>
        </NavbarItem>
       

        {loggedIn ? (
          <>
            <NavbarItem>
              <Button color="error" onClick={handleLogout}>
                Logout
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/profile">
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/myvehicle">
               MyVehicles
              </Link>
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
      
    </Navbar>
  );
};

export default NavbarComponent;
