import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import phonebookActions from "../redux/phonebook/phonebook-actions";
//Styles:
import "./ContactForm.scss";
import { Button, Form, Col, Row } from "react-bootstrap";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  //Переменные
  nameInputId = uuidv4();
  phoneInputId = uuidv4();
  // Функции событий
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
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
      <Form className="form">
        <Row>
          <Col>
            <Form.Control
              className="form__item"
              type="text"
              name="name"
              value={name}
              id={this.nameInputId}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (name, number) =>
    dispatch(phonebookActions.addContact(name, number)),
});

export default connect(null, mapDispatchToProps)(ContactForm);
