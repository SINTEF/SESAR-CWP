import './DraggablePopup.css';

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';
import { Popup } from 'react-map-gl';

import { startDragging, stopDragging } from '../draggableState';

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
    startDragging();
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

  // eslint-disable-next-line class-methods-use-this
  onStop(/* event , data */) {
    stopDragging();
  }

  render() {
    const {
      className, children, offset, ...otherProperties
    } = this.props;
    const { offsetX, offsetY } = this.state;

    // Compute the length of the line from the offset,
    // use pytagore
    const planeIconRadius = 10;
    const planeIconIntersectRadius = 15;

    const coreWidth = 110;
    const coreHeight = 55;
    const popupIsLower = offsetY > -coreHeight / 2;
    const popupIsOnLeft = offsetX < -coreWidth / 2;

    let adjustedLineX = offsetX;
    let adjustedLineY = offsetY;

    if (popupIsLower) {
      adjustedLineY -= planeIconRadius;
    } else {
      adjustedLineY += coreHeight + planeIconRadius;
    }

    if (popupIsOnLeft) {
      adjustedLineX += coreWidth + planeIconRadius;
    } else {
      adjustedLineX -= planeIconRadius;
    }

    const width = Math.sqrt(adjustedLineX * adjustedLineX
      + adjustedLineY * adjustedLineY);
    const angle = Math.atan2(adjustedLineY, adjustedLineX);

    // we have two boxes, one is coreWidth x coreHeight, the other is
    // planeIconIntersectRadius x planeIconIntersectRadius
    // We check if they intersects using old school maths
    const planeIconTopLeftX = -planeIconIntersectRadius;
    const planeIconTopLeftY = -planeIconIntersectRadius;
    const planeIconBottomRightX = planeIconIntersectRadius;
    const planeIconBottomRightY = planeIconIntersectRadius;

    const coreTopLeftX = offsetX;
    const coreTopLeftY = offsetY;
    const coreBottomRightX = offsetX + coreWidth;
    const coreBottomRightY = offsetY + coreHeight;

    const planeIconAndCoreIntersects = (
      (planeIconTopLeftX < coreBottomRightX) && (planeIconBottomRightX > coreTopLeftX)
      && (planeIconTopLeftY < coreBottomRightY) && (planeIconBottomRightY > coreTopLeftY)
      && (planeIconTopLeftX < coreBottomRightX) && (planeIconBottomRightX > coreTopLeftX)
    );

    const displayLine = !planeIconAndCoreIntersects;

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Popup {...otherProperties} className="draggable-popup">
        <div
          className={`draggable-popup-core ${className ?? ''}`}
          style={{
            top: `${offsetY}px`,
            left: `${offsetX}px`,
            width: `${coreWidth}px`,
            height: `${coreHeight}px`,
          }}
        >
          <DraggableCore
            onStart={this.onDragStart}
            onDrag={this.onDrag}
            onStop={this.onStop}
          >
            {children}
          </DraggableCore>
        </div>
        <div
          className="draggable-popup-line"
          style={{
            display: displayLine ? 'block' : 'none',
            top: `${popupIsLower ? planeIconRadius : -planeIconRadius}px`,
            left: `${popupIsOnLeft ? -planeIconRadius : planeIconRadius}px`,
            width: `${width}px`,
            transform: `rotate(${angle}rad)`,
          }}
        />
      </Popup>
    );
  }
}

DraggablePopup.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  offset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};
