import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import phonebookActions from "../../redux/phonebook/phonebook-actions";
//Styles:
import "./ContactForm.scss";
import { Button, Form, Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  //Переменные
  nameInputId = uuidv4();
  phoneInputId = uuidv4();
  // Функции событий

  updateContact = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  existName = (name) => {
    const { contacts } = this.props;
    return contacts.find((cnt) => cnt.name === name);
  };

  existNumber = (number) => {
    const { contacts } = this.props;
    return contacts.find((cnt) => cnt.number === number);
  };

  handleSubmit = (event) => {
    const { name, number } = this.state;
    event.preventDefault();
    if (name === "" || number === "") {
      toast.warn("Please,  fill in all fields", {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (this.existName(name)) {
      toast.info(`Contact with name ${name} is already on your list`, {
        position: "top-center",
        autoClose: 3000,
      });
    } else if (this.existNumber(number)) {
      toast.info(
        `Contact with phone number ${number} is already on your list`,
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } else {
      this.props.onSubmit(this.state);
      this.reset();
    }
  };

  reset = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <Form className="form">
          <Row>
            <Col>
              <Form.Control
                className="form__item"
                type="text"
                name="name"
                value={name}
                id={this.nameInputId}
                onChange={this.updateContact}
                placeholder="Contact name:"
              />
            </Col>
            <Col>
              <Form.Control
                className="form__item"
                type="phone"
                name="number"
                value={number}
                id={this.phoneInputId}
                onChange={this.updateContact}
                placeholder="Phone number:"
              />
            </Col>
          </Row>
          <Button
            size="sm"
            className="form__submit"
            type="submit"
            name="contact"
            onClick={this.handleSubmit}
            variant="outline-info"
          >
            Add Contact
          </Button>
        </Form>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = ({ phonebook: { contacts } }) => ({
  contacts,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (name, number) =>
    dispatch(phonebookActions.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
