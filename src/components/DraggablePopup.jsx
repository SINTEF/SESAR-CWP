import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';
import { Popup } from 'react-map-gl';

export default class DraggablePopup extends Component {
  constructor(properties) {
    super(properties);

    const { offset } = properties;
    const { x, y } = offset;

    this.state = {
      offsetX: x,
      offsetY: y,
      startX: 0,
      startY: 0,
    };

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  onDragStart(event/* , data */) {
    const { clientX, clientY } = event;
    const { offsetX, offsetY } = this.state;
    this.setState({
      startX: clientX - offsetX,
      startY: clientY - offsetY,
    });
  }

  onDrag(event/* , data */) {
    const { clientX, clientY } = event;
    const { startX, startY } = this.state;
    const diffX = clientX - startX;
    const diffY = clientY - startY;
    this.setState({
      offsetX: diffX,
      offsetY: diffY,
    });
  }

  render() {
    const { children, offset, ...otherProperties } = this.props;
    const { offsetX, offsetY } = this.state;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Popup {...otherProperties} offset={[offsetX, offsetY]}>
        <DraggableCore onStart={this.onDragStart} onDrag={this.onDrag}>
          {children}
        </DraggableCore>
      </Popup>
    );
  }
}

DraggablePopup.propTypes = {
  children: PropTypes.node.isRequired,
  offset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};
