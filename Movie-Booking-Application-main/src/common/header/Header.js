import { Button } from "@material-ui/core";
import React, { Component } from "react";
import "./Header.css";
class Header extends Component {
  render() {
    return (
      <div className="header">
        <img
          src="https://cdn.upgrad.com/uploads/production/286e1f11-1897-4d0c-ab0f-6b2bfc1ce642/logo.svg"
          alt="Logo"
          className="logo"
        />
        {this.props.isDetails ? (
          <Button variant="contained" color="primary">
            Book Now
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Header;
