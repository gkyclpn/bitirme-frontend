import React, { Component } from "react";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import CityCreateModal from "./modals/CityCreateModal";
import CityTable from "./tables/CityTable";
import CityEditModal from "./modals/CityEditModal"
class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalShow: false,
        modalCityEdit: false,
    };
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalCityEdit = this.setModalCityEdit.bind(this)
  }

  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setModalCityEdit = (value) => { 
    this.setState({modalCityEdit: value})
  }
  setClickedCityId = (id) => {
    this.setState({clickedCityId: id})
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add City</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <CityTable setClickedCityId={this.setClickedCityId} setModalCityEdit={this.setModalCityEdit} />
            </div>
        </div>
        <div></div>
        <CityCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
        />
        <CityEditModal
            show={this.state.modalCityEdit}
            onHide={() => this.setModalCityEdit(false)}
            city_id={this.state.clickedCityId}
        />
      </div>
    );
  }
  
}

export default Cities;
