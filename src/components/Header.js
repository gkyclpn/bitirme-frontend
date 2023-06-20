import React, { Component } from "react";
import logo from "../img/logicon4.png"
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uri: window.location.href.split('/')[3]
    };
  }
  render() {
    return (
      <div className="w-full flex bg-gray-700 p-12 shadow-lg justify-between sticky top-0 z-20">
        <div className="flex items-center justify-center gap-x-8" onClick={() => window.location.href = "/"}>
          <img src={logo} className="w-24 h-24"/>
          <div className="flex flex-col gap-y-1 text-white">
              <span className="text-white font-bold text-2xl cursor-pointer">Accounting Management System</span>
              <span>{this.state.uri === "" ? "Users" : this.state.uri.charAt(0).toUpperCase() + this.state.uri.slice(1)}</span>
          </div>
        </div>
        <div className="font-semibold flex gap-x-8 text-gray-400 shadow-xl px-4 items-center">
            <a href="/" className={"hover:text-gray-500 " + (this.state.uri === "" ? "text-gray-200 hover:text-gray-300" : null)}>Users</a>
            <a href="/travels" className={"hover:text-gray-500 " + (this.state.uri === "travels" ? "text-gray-200 hover:text-gray-300" : null)}>Travels</a>
            <a href="/cities" className={"hover:text-gray-500 " + (this.state.uri === "cities" ? "text-gray-200 hover:text-gray-300" : null)}>Cities</a>
            
        </div>
      </div>
    );
  }
  
}

export default Header;
