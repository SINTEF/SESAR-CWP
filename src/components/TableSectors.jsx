import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';

export default function TableSectors({ sectorsOfArray }) {
  return (
    <Table borderless>
      <tr>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 1][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="primary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 1][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 1][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 1][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>
        </td>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 2][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="secondary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 2][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 2][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 2][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>

        </td>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 3][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="secondary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 3][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 3][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 3][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>

        </td>
      </tr>
      <tr>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 4][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="secondary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 4][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 4][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 4][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>

        </td>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 5][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="secondary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 5][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 5][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 5][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>

        </td>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 6][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="secondary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 6][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 6][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 6][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>

        </td>
      </tr>
      <tr>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 7][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="secondary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 7][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 7][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 7][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>

        </td>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 8][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="secondary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 8][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 8][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 8][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>

        </td>
        <td>
          <Button id={sectorsOfArray[sectorsOfArray.length - 9][0]} style={{ height: '50%', width: '100%', backgroundcolor: '#ffffff !important' }}>
            <Card.Body variant="secondary">
              <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 9][0].slice(-14)}</Card.Title>
              <Card.Text className="sector-body">
                {`FL ${sectorsOfArray[sectorsOfArray.length - 9][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 9][1].topFlightLevel}`}
              </Card.Text>
            </Card.Body>
          </Button>

        </td>
      </tr>
    </Table>
  );
}
TableSectors.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sectorsOfArray: PropTypes.array.isRequired,
};
