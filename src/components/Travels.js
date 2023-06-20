import React, { Component } from "react";
import Header from "./Header";
import TravelTable from "./tables/TravelTable"
import TravelShowModal from "./modals/TravelShowModal"

class Travels extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalTravelShow: false,
        clickedTravelId: null,
        image: null
    };
    this.setImage = this.setImage.bind(this)
    this.setModalTravelShow = this.setModalTravelShow.bind(this)
  }

  setClickedTravelId = (id) => {
    this.setState({clickedTravelId: id})
  }
  setModalTravelShow = (value) => { 
    this.setState({modalTravelShow: value})
  }
  setImage = (value) => { 
    this.setState({image: value})
  }
  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex items-center justify-center">
                <TravelTable setImage={this.setImage} setModalTravelShow={this.setModalTravelShow} />
            </div>
        </div>
        <div></div>
        <TravelShowModal
            show={this.state.modalTravelShow}
            onHide={() => this.setModalTravelShow(false)}
            image={this.state.image}
        />
      </div>
    );
  }
  
}

export default Travels;
