//   componentDidUpdate(prepvProps, prevState) {
//     if (prevState.contacts.length !== this.state.contacts.length) {
// localStorage.setItem('items', JSON.stringify(this.state.contacts));
// console.log('update');
//     }
//   }

import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('items')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const onFilterHandler = e => {
    const newArr = contacts.filter(item => {
      if (e.target.value === '') {
        return e.target.value;
      } else {
        return item.name.toLowerCase().includes(e.target.value);
      }
    });

    setFilter(newArr);
  };

  const onCheckDublicate = obj => {
    contacts.map(item => {
      if (item.name === obj.name) {
        alert(`${obj.name} is already in contact list`);
        setContacts(
          contacts.filter(contact => contact.name !== obj.name)
        );
      }
      return item.name;
    });
  };

  const onDeleteItem = id => {
    const filteredArr = contacts.filter(item => item.id !== id);
    setContacts(filteredArr);
  };

  const onAddContacts = newContact => {
    if (newContact.name !== '' && newContact.number !== '') {
      onCheckDublicate(newContact);
      setContacts(prev => [...prev, newContact]);
    }
  };

  useEffect(() => {
    window.localStorage.setItem('items', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('items'));
    if (data) {
      setContacts(data);
    }
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ContactForm onAdd={onAddContacts} />
      <h1>Contacts</h1>
      <Filter onFilter={onFilterHandler} />

      <ContactList
        filter={filter}
        contacts={contacts}
        onFilter={onDeleteItem}
      />
    </div>
  );
}

export default App;
