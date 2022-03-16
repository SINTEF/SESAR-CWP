import PropTypes from 'prop-types';
import React from 'react';
import { useAccordionButton } from 'react-bootstrap';

export default function CustomToggle({ children, eventKey }) {
  const smallerButton = useAccordionButton(eventKey);
  return (
    <button
      type="button"
      style={{ backgroundColor: 'rgb(34, 34, 34)', color: '#fff' }}
      onClick={smallerButton}
    >
      {children}
    </button>
  );
}
CustomToggle.propTypes = {
  children: PropTypes.string.isRequired,
  eventKey: PropTypes.string.isRequired,
};
