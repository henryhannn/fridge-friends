import React from "react"; 
import moment from "moment"; 
import UpdateExpirationModalForm from "./update_expiration_modal"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

class FridgeItem extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      showModal: false,
    };
    this.removeItem = this.removeItem.bind(this); 
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  countQuantity(quantity, num) {
    let itemCount = quantity + num;
    return () => {
      this.props.editFridgeItemQuantity(this.props.fridgeId, {
        quantity: itemCount,
        fridgeItemId: this.props.fridgeItem._id,
      });
    }
  }

  quantity(quantity) {
    if (quantity === 1) {
      return (
        <div className="fridge-quantity-container">
          <p className="fridge-quantity-min">
            <FontAwesomeIcon icon={faMinus} />
          </p>
          <p className="fridge-quantity-num">{quantity}</p>
          <div
            className="fridge-quantity-minus"
            onClick={this.countQuantity(quantity, 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="fridge-quantity-container">
          <div
            className="fridge-quantity-minus"
            onClick={this.countQuantity(quantity, -1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </div>
          <p className="fridge-quantity-num">{quantity}</p>
          <div
            className="fridge-quantity-minus"
            onClick={this.countQuantity(quantity, 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      );
    }
  }

  daysUntilExp() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const currentDate = yyyy + "-" + mm + "-" + dd;
    const expDate = this.props.expirationDate; // get item expiration date

    const diffDays = (expirationDate, currentDate) =>
      Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60 * 24));

    //will return the num of days until expiration as pos int, and days passed expiration as neg int
    return diffDays(new Date(expDate), new Date(currentDate));
  }

  expiration() {
    if (this.props.expirationDate === null) return "Add Expiration";
    const exp = this.daysUntilExp();
    if (exp > 0) {
      return exp;
    } else {
      const date = moment(this.props.expirationDate).format("MM/DD/YYYY");
      return `Expired On ${date}`;
    }
  }

  removeItem() {
    this.props.removeFridgeItem(this.props.fridgeId, this.props.fridgeItem._id); 
  }

   openModal() {
    this.setState({ showModal: true }, () => {
      const modalBackground = document.querySelector(
        ".fooditem-modal-background"
      );
    
      modalBackground.addEventListener("click", this.closeModal);
    });
  }

  closeModal() {
    const modalBackground = document.querySelector(
      ".fooditem-modal-background"
    );
    modalBackground.removeEventListener("click", this.closeModal);
    this.setState({ showModal: false });
  }

  renderUpdateExpirationModal() {
    if (this.state.showModal) {
      return (
        <div className="fooditem-modal-container">
          <div className="fooditem-modal-background">
            <div className="fooditem-modal-background-icon">
              <FontAwesomeIcon icon={faTimesCircle} />
            </div>
          </div>
          <div
            className="fooditem-modal-form-container"
            id="updateExpContainer"
          >
            <UpdateExpirationModalForm
              fridgeItem={this.props.fridgeItem}
              fridgeId={this.props.fridgeId}
              editFridgeItemExpDate={this.props.editFridgeItemExpDate}
              closeModal={() => this.closeModal()}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.names === null) {return null};
    const expDays = this.daysUntilExp();

    let expColor;
    if (!this.props.expirationDate || expDays > 7) {
      expColor = "greenExpColor";
    } else if (expDays > 0 && expDays <= 7) {
      expColor = "yellowExpColor";
    } else {
      expColor = "redExpColor";
    }

    return (
      <li className="fridge-item-details">
        <div className="fridge-left">
          <p className="fridge-item-name">{this.props.fridgeItem.name}</p>
          <p className="fridge-item-owner">
            {this.props.userName}
          </p>
          
        </div>
        <div className="fridge-center">
          <p className="fridge-item-ex">Days to Exp</p>
          <div
            className={`fridge-item-time ${expColor}`}
            onClick={this.openModal}
          >
            {this.expiration()}
          </div>
        </div>

        <div className="fridge-right">
          {this.quantity(this.props.fridgeItem.quantity)}
            <FontAwesomeIcon 
              className="fridge-item-delete-button"
              icon={faTimesCircle} 
              onClick={this.removeItem} />
        </div>
        {this.renderUpdateExpirationModal()}

      </li>
    );
  }
}

export default FridgeItem; 