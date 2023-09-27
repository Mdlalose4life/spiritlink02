import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Sidebar() {
  const rooms = ["Groups", "private"];
  return (
    <>
      <h2>Rooms</h2>
      <ListGroup>
        {rooms.map((room, i) => (
          <ListGroup.Item key={i}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;