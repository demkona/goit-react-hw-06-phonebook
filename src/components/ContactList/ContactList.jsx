import {
  ContactListBox,
  ContactListItem,
  ContactListBtn,
  ContactListLink,
} from './ContactList.styled';
import { getContacts, getFilterValue } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(getContacts);
  const filter = useSelector(getFilterValue);

  const filterContactsOnChange = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toUpperCase().includes(filter.toUpperCase())
    );
  };

  const sortContactsByName = () =>
    [...filterContactsOnChange()].sort((firstContact, secondContact) =>
      firstContact.name.localeCompare(secondContact.name)
    );

  return (
    <ContactListBox>
      {sortContactsByName().map(({ id, name, number }) => (
        <ContactListItem key={id}>
          <ContactListLink href="tel:{number}">{name}</ContactListLink>
          <ContactListLink href="tel:{number}">{number}</ContactListLink>
          <ContactListBtn
            type="button"
            onClick={() => {
              dispatch(deleteContact(id));
            }}
          >
            Delete
          </ContactListBtn>
        </ContactListItem>
      ))
      }
    </ContactListBox>
  );
};

export default ContactList;
