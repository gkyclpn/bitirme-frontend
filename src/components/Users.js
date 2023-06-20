import React, { Component } from "react";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import UserCreateModal from "./modals/UserCreateModal";
import UserTable from "./tables/UserTable";
import axios from '../config/axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
        countries: [],
        modalShow: false,
    };
    this.setModalShow = this.setModalShow.bind(this)
  }

  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setClickedUserId = (id) => {
    this.setState({clickedUserId: id})
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add User</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <UserTable setClickedCustomerId={this.setClickedUserId} />
            </div>
        </div>
        <div></div>
        <UserCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
        />
   
    
      </div>
    );
  }
  
}

export default Users;
