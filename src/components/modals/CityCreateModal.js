import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';


class CityCreateModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
          name: null,
          startPrice: null,
          perKmPrice: null
      };
    }
    handleClick = async () => {
        const data = {
            name: this.state.name,
            startPrice: this.state.startPrice,
            perKmPrice: this.state.perKmPrice
        }
        const res = await axios.post("/cities/create",data)
        console.log(res)
            if (res)
                window.location.reload()
    }
    render() {
        return (
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add City
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body >
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Name</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({name: e.target.value})}}/>
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Start Price</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({startPrice: e.target.value})}}/>
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Per KM Price</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({perKmPrice: e.target.value})}}/>
                  </div>
              </Modal.Body>
              <Modal.Footer>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Add</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default CityCreateModal