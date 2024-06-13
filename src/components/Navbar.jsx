import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, NavbarMenuToggle } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';
import SearchByCity from '../components/SearchByCity';

const NavbarComponent = () => {
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  const profilePic = useSelector(state => state.auth.data.profilePicURL);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
    } finally {
      window.location.reload();
    }
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
      <NavbarContent className={`nav-links ${isMenuOpen ? 'sm:flex sm:flex-col sm:items-start' : 'hidden sm:flex sm:flex-row sm:justify-center'}`}>
        <NavbarItem>
          <Link className="text-blue-600 mr-4 font-bold hover:underline focus:underline" color="foreground" href="/buyvehicle">
            Buy
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-blue-600 mr-4 font-bold hover:underline focus:underline" color="foreground" href="/sellvehicle">
            Sell
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-blue-600 mr-4 font-bold hover:underline focus:underline" color="foreground" href="/vehiclelist">
            Vehicle List
          </Link>
        </NavbarItem>
        <NavbarItem>
          <SearchByCity />
        </NavbarItem>
        {loggedIn ? (
          <>
            <NavbarItem>
              <Link className="text-blue-600 mr-4 font-bold hover:underline focus:underline" color="foreground" href="/myvehicle">
                My Vehicles
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button className="border border-blue-900 text-blue-600 font-bold" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Link className="ml-2" color="foreground" href="/editprofile">
                <Avatar src={profilePic} />
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link className="text-blue-600 font-bold hover:underline focus:underline" color="foreground" href="/signin">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="text-blue-600 font-bold hover:underline focus:underline" color="foreground" href="/signup">
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
