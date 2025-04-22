import React from 'react';
import { useAccordionButton } from 'react-bootstrap';

export default function CustomToggle(
  { children, eventKey }: { children: React.ReactNode; eventKey: string },
): React.ReactElement {
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
