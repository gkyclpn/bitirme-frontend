import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class CityEditModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: null,
        startPrice: null,
        perKmPrice: null,
        city_id: null
      };
    }

    componentDidUpdate(prevProps) {
      if(this.props.city_id !== prevProps.city_id) {
        this.getCity();
      }
    } 
  
    getCity = async () => {
      const res1 = await axios.get(`/cities/one/${this.props.city_id}`)
      if (res1) 
        this.setState({name: res1.data.name, startPrice: res1.data.startPrice, perKmPrice: res1.data.perKmPrice})
    }

    handleClick = async () => {
      const data = {
        id: String(this.props.city_id),
        name: this.state.name,
        perKmPrice: String(this.state.perKmPrice),
        startPrice: String(this.state.startPrice)

      }
      console.log(data)
      const res1 = await axios.put("/cities/update",data)
      if (res1) 
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
                  Edit City
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-8'>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Name</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}  />
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Start Price</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' value={this.state.startPrice} onChange={(e) => this.setState({startPrice: e.target.value})}  />
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Per KM Price</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' value={this.state.perKmPrice} onChange={(e) => this.setState({perKmPrice: e.target.value})}  />
                  </div>
              </Modal.Body>
              <Modal.Footer>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Update</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default CityEditModal