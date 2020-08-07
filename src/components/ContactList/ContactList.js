import React from "react";
import { connect } from "react-redux";
import phonebookActions from "../../redux/phonebook/phonebook-actions";
//Styles:
import "./ContactList.scss";
import { ListGroup, Button } from "react-bootstrap";

const ContactList = ({ phonebook, onDeleteContact }) => (
  <ListGroup variant="flush" className="contact-list">
    {phonebook.map(({ name, number, id }) => (
      <ListGroup.Item key={id} className="contact-list__item">
        <p className="contact-list__text">
          {name}: {number}
        </p>
        <Button
          className="contact-list__button"
          variant="outline-danger"
          size="sm"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

const mapStateToProps = ({ phonebook: { contacts, filter } }) => ({
  phonebook: getVisibleContacts(contacts, filter),
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteContact: (id) => dispatch(phonebookActions.deleteContatc(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
