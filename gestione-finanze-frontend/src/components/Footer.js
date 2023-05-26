import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Footer = () => {
  return (
    <Card className="text-center">
        <Card.Body className='bg-light'>
        <Card.Title>Money Monitor</Card.Title>
        <Card.Text>
            Gestore di Spese e Movimenti Finanziari
        </Card.Text>
        <Button
            variant="primary"
            onClick={() => {
                window.location.href = "http://www.danielecaporaletti.it/#projects";
            }}
            >
            Torna ai progetti
            </Button>
        </Card.Body>
        <Card.Footer className="text-muted">Daniele Caporaletti</Card.Footer>
    </Card>
  )
}

export default Footer