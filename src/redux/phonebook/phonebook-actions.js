import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const addContact = createAction("phonebook/add", ({ name, number }) => {
  return {
    payload: {
      name,
      number,
      id: uuidv4(),
    },
  };
});

const deleteContatc = createAction("phonebook/delete");
const changeFilter = createAction("phonebook/changeFilter");

export default { addContact, deleteContatc, changeFilter };
