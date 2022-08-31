import './DraggablePopup.css';

import React from 'react';
import { DraggableCore } from 'react-draggable';
import { Popup } from 'react-map-gl';
import type { DraggableEvent } from 'react-draggable';
import type { PopupProps } from 'react-map-gl';

import { startDragging, stopDragging } from '../draggableState';

export type DraggablePopupProperties = {
  offset: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number,
  },
  color?: string,
} & PopupProps;

export type DraggablePopupState = {
  offsetX: number,
  offsetY: number,
  startX: number,
  startY: number,
};

export default class DraggablePopup extends
  React.Component<DraggablePopupProperties, DraggablePopupState> {
  constructor(properties: DraggablePopupProperties) {
    super(properties);

    const { offset } = properties;
    const { x, y } = offset;

    this.state = {
      offsetX: x,
      offsetY: y,
      startX: 0,
      startY: 0,
    };
  }

  onDragStart(event: DraggableEvent): void {
    if (!('clientX' in event && 'clientX' in event)) {
      return;
    }
    const { clientX, clientY } = event;
    const { offsetX, offsetY } = this.state;
    this.setState({
      startX: clientX - offsetX,
      startY: clientY - offsetY,
    });
    startDragging();
  }

  onDrag(event: DraggableEvent): void {
    if (!('clientX' in event && 'clientX' in event)) {
      return;
    }
    const { clientX, clientY } = event;
    const { startX, startY } = this.state;
    const diffX = clientX - startX;
    const diffY = clientY - startY;
    this.setState({
      offsetX: diffX,
      offsetY: diffY,
    });
  }

  static onStop(/* event , data */): void {
    stopDragging();
  }

  render(): JSX.Element {
    const {
      className, children, offset, color, size, ...otherProperties
    } = this.props;
    const { offsetX, offsetY } = this.state;

    // Compute the length of the line from the offset,
    // use pytagore
    const planeIconRadius = 10;
    const planeIconIntersectRadius = 15;

    const coreWidth = size.width;
    const coreHeight = size.height;
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
            onStart={(event): void => this.onDragStart(event)}
            onDrag={(event): void => this.onDrag(event)}
            onStop={(): void => DraggablePopup.onStop()}
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
            background: color,
          }}
        />
      </Popup>
    );
  }
}
