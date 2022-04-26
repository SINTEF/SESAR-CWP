import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';

const fillColors = ['#fff', '#f59', '#0bb', '#94a', '#b00', '#f80', '#f63', '#3c0', '#40f', '#0bb', '#94a', '#b00', '#f80', '#f63'];

export default function TableSectors({ sectorsOfArray }) {
  return (
    <Table size="sm" id="table-of-config" borderless>
      <tbody>
        <tr>
          <td>
            <Button id={sectorsOfArray[sectorsOfArray.length - 1][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[2] }}>
              <Card.Body>
                <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 1][0].slice(-14)}</Card.Title>
                <Card.Text className="sector-body">
                  {`FL ${sectorsOfArray[sectorsOfArray.length - 1][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 1][1].topFlightLevel}`}
                </Card.Text>
              </Card.Body>
            </Button>
          </td>
          <td>
            <Button id={sectorsOfArray[sectorsOfArray.length - 2][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[3] }}>
              <Card.Body variant="secondary">
                <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 2][0].slice(-14)}</Card.Title>
                <Card.Text className="sector-body">
                  {`FL ${sectorsOfArray[sectorsOfArray.length - 2][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 2][1].topFlightLevel}`}
                </Card.Text>
              </Card.Body>
            </Button>

          </td>
          <td>
            <Button id={sectorsOfArray[sectorsOfArray.length - 3][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[4] }}>
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
            <Button id={sectorsOfArray[sectorsOfArray.length - 4][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[5] }}>
              <Card.Body variant="secondary">
                <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 4][0].slice(-14)}</Card.Title>
                <Card.Text className="sector-body">
                  {`FL ${sectorsOfArray[sectorsOfArray.length - 4][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 4][1].topFlightLevel}`}
                </Card.Text>
              </Card.Body>
            </Button>

          </td>
          <td>
            <Button id={sectorsOfArray[sectorsOfArray.length - 5][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[6] }}>
              <Card.Body variant="secondary">
                <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 5][0].slice(-14)}</Card.Title>
                <Card.Text className="sector-body">
                  {`FL ${sectorsOfArray[sectorsOfArray.length - 5][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 5][1].topFlightLevel}`}
                </Card.Text>
              </Card.Body>
            </Button>

          </td>
          <td>
            <Button id={sectorsOfArray[sectorsOfArray.length - 6][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[7] }}>
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
            <Button id={sectorsOfArray[sectorsOfArray.length - 7][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[8] }}>
              <Card.Body variant="secondary">
                <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 7][0].slice(-14)}</Card.Title>
                <Card.Text className="sector-body">
                  {`FL ${sectorsOfArray[sectorsOfArray.length - 7][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 7][1].topFlightLevel}`}
                </Card.Text>
              </Card.Body>
            </Button>

          </td>
          <td>
            <Button id={sectorsOfArray[sectorsOfArray.length - 8][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[9] }}>
              <Card.Body variant="secondary">
                <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 8][0].slice(-14)}</Card.Title>
                <Card.Text className="sector-body">
                  {`FL ${sectorsOfArray[sectorsOfArray.length - 8][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 8][1].topFlightLevel}`}
                </Card.Text>
              </Card.Body>
            </Button>

          </td>
          <td>
            <Button id={sectorsOfArray[sectorsOfArray.length - 9][0]} style={{ height: '50%', width: '100%', backgroundColor: fillColors[10] }}>
              <Card.Body variant="secondary">
                <Card.Title className="sector-title">{sectorsOfArray[sectorsOfArray.length - 9][0].slice(-14)}</Card.Title>
                <Card.Text className="sector-body">
                  {`FL ${sectorsOfArray[sectorsOfArray.length - 9][1].bottomFlightLevel}-${sectorsOfArray[sectorsOfArray.length - 9][1].topFlightLevel}`}
                </Card.Text>
              </Card.Body>
            </Button>

          </td>
        </tr>
      </tbody>
    </Table>
  );
}
TableSectors.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sectorsOfArray: PropTypes.array.isRequired,
};
