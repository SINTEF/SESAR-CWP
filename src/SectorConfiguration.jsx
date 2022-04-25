import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Draggable from 'react-draggable';

// eslint-disable-next-line no-unused-vars
import { configurationStore, simulatorStore } from './state';

function SectorConfiguration() {
  // const simulatorTime = simulatorStore.timestamp;
  // const onlyAbove = [configurationStore.configurationPlan]
  //   .filter(([, time]) => time.startTime > simulatorTime);
  // const sortedList = onlyAbove.sort();
  // const nextConfigurationIndex = sortedList[0];
  // console.log(nextConfigurationIndex);

  return (
    <Draggable>
      <div className="control-panel">
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>From 12:00 to 12:30</Accordion.Header>
            <Accordion.Body>
              <CardGroup variant="secondary">
                <Card>
                  <Button variant="primary">
                    <Card.Body variant="secondary">
                      <Card.Title>Sector 7</Card.Title>
                      <Card.Text>
                        FI 250-999
                      </Card.Text>
                    </Card.Body>
                  </Button>
                </Card>
                <Card>
                  <Button variant="danger">
                    <Card.Body>
                      <Card.Title>Sector 6</Card.Title>
                      <Card.Text>
                        FI 250-999
                      </Card.Text>
                    </Card.Body>
                  </Button>
                </Card>
                <Card>
                  <Button variant="warning">
                    <Card.Body>
                      <Card.Title>Sector 4</Card.Title>
                      <Card.Text>
                        FI 250-999
                      </Card.Text>
                    </Card.Body>
                  </Button>
                </Card>
              </CardGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>From 12:30 to 13:00</Accordion.Header>
            <Accordion.Body>
              <CardGroup>
                <Card>
                  <Button style={{ height: '8rem' }} variant="primary">
                    <Card.Body>
                      <Card.Title>Sector</Card.Title>
                      <Card.Text>
                        FI 250-999
                      </Card.Text>
                    </Card.Body>
                  </Button>
                </Card>
                <Card>
                  <ListGroup>
                    <Button style={{ height: '4rem' }} variant="danger">
                      <Card.Body>
                        {' '}
                        Sector 6
                        {/* <Card.Title>Card title</Card.Title> */}
                        {/* <Card.Text>
        Infomation
      </Card.Text> */}
                      </Card.Body>
                    </Button>
                    <Button style={{ height: '4rem' }} variant="success">
                      <Card.Body>
                        {' '}
                        Sector 4
                        {/* <Card.Title>Card title</Card.Title> */}
                        {/* <Card.Text>
        Infomation
      </Card.Text> */}
                      </Card.Body>
                    </Button>
                  </ListGroup>
                </Card>
                <Card>
                  <Button style={{ height: '8rem' }} variant="warning">
                    <Card.Body>
                      <Card.Title>Sector 3</Card.Title>
                      <Card.Text>
                        More Info
                      </Card.Text>
                    </Card.Body>
                  </Button>
                </Card>
              </CardGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </Draggable>
  );
}

export default React.memo(SectorConfiguration);
