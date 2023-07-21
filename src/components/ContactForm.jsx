import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onFormHandler = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: Math.random(),
      name,
      number,
    };
    this.props.onAdd(contact);
    this.setState({
      name: '',
      number: '',
    });
  };

  onHandleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <form onSubmit={this.onFormHandler}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.onHandleChange}
            value={this.state.name}
          />
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Phone number"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            multiline
            maxRows={4}
            onChange={this.onHandleChange}
            type="tel"
            value={this.state.number}
          />
        </Box>
        <input type="submit" value={'Send'} />
      </form>
    );
  }
}
ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default ContactForm;
