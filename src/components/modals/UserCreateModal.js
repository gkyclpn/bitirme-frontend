import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class UserCreateModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
          role: "-1",
          name: null,
          mail: null,
          username: null,
          password: null
      };
    }


    handleClick = async () => {
        const data = {
            fullName: this.state.name,
            email: this.state.mail,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }
        const res = await axios.post("/users/register",data)
        console.log(res)
            if (res)
                window.location.href = "/"
    }
    onChangeRole = (e)=>{
        this.setState({role:e.target.value});
    }


    render() {
        return (
            <Modal
              {...this.props}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add User
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-8'>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Full Name</label>
                      <input type="text" name="name" className='w-full py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({name: e.target.value})}}/>
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Mail</label>
                      <input type="email" name="name" className='w-full py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({mail: e.target.value})}}/>
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Username</label>
                      <input type="text" name="name" className='w-full py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({username: e.target.value})}}/>
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Password</label>
                      <input type="password" name="name" className='w-full py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({password: e.target.value})}}/>
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Role</label>
                      <select value={this.state.role} onChange={(e) => this.onChangeRole(e)} >
                          <option value="-1" disabled>Select</option>
                          <option value="0">Employee</option>
                          <option value="1">Accounting</option>
                      </select>

                  </div>

                
              </Modal.Body>
              <Modal.Footer>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Add</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default UserCreateModal