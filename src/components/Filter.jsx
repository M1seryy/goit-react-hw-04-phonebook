import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onFilter }) => {
  return (
    <>
      <input onChange={onFilter} type="text" />
    </>
  );
};

export default Filter;

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
