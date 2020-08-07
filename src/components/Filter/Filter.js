import React from "react";
import { connect } from "react-redux";
import phonebookActions from "../../redux/phonebook/phonebook-actions";
//Styles:
import "./Filter.scss";
import { InputGroup, FormControl } from "react-bootstrap";

const Filter = ({ filter, onChange }) => (
  <InputGroup size="sm" className="filter-wrapp">
    <InputGroup.Prepend>
      <InputGroup.Text>Find contact:</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl type="text" name="filter" value={filter} onChange={onChange} />
  </InputGroup>
);

const mapStateToProps = (state) => ({
  value: state.phonebook.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => dispatch(phonebookActions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
