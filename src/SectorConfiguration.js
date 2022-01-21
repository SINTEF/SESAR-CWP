import * as React from 'react';
import { ButtonGroup, ListGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Draggable from 'react-draggable';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';

const SectorConfiguration = ({ sectorConfiguration }) => (
    <Draggable>
    <div className='control-panel'>
    <Accordion defaultActiveKey={['0']} alwaysOpen>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Configuration Time #1</Accordion.Header>
    <Accordion.Body>
    <CardGroup>
  <Card><Button variant="primary">
    <Card.Body>
      <Card.Title>Sector</Card.Title>
      <Card.Text>
        Additional Info
      </Card.Text>
    </Card.Body>
  </Button></Card>
 <Card><Button variant="danger">
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        Infomation
      </Card.Text>
    </Card.Body>
  </Button></Card>
  <Card><Button variant="warning">
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        More Info
      </Card.Text>
    </Card.Body>
  </Button></Card>
</CardGroup>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Configuration Time #2</Accordion.Header>
    <Accordion.Body>
    <CardGroup>
  <Card><Button variant="primary">
    <Card.Body>
      <Card.Title>Sector</Card.Title>
      <Card.Text>
        Additional Info
      </Card.Text>
    </Card.Body>
  </Button></Card>
 <Card><ListGroup><Button style={{height:'4rem'}} variant="danger">
    <Card.Body> Card Title
      {/* <Card.Title>Card title</Card.Title> */}
      {/* <Card.Text>
        Infomation
      </Card.Text> */}
    </Card.Body>
  </Button>
  <Button style={{height:'3.9rem'}} variant="success">
    <Card.Body> Sector
      {/* <Card.Title>Card title</Card.Title> */}
      {/* <Card.Text>
        Infomation
      </Card.Text> */}
    </Card.Body>
  </Button>
  </ListGroup>
  </Card>
  <Card><Button variant="warning">
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        More Info
      </Card.Text>
    </Card.Body>
  </Button></Card>
</CardGroup>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
</div>
</Draggable>
);

export default React.memo(SectorConfiguration);