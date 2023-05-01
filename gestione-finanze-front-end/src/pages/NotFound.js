import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={2} md={1} lg={4}></Col>
        <Col xs={12} sm={8} md={10} lg={4}>
          <h1 className="display-1 text-center">404</h1>
          <h3 className="text-center">Pagina non trovata</h3>
          <p className="text-center mt-3">
            La pagina che stai cercando potrebbe essere stata rimossa, il suo nome cambiato o non è temporaneamente disponibile.
          </p>
          <div className="text-center">
            <Button variant="primary" onClick={goBack}>
              Torna indietro
            </Button>
          </div>
        </Col>
        <Col xs={12} sm={2} md={1} lg={4}></Col>
      </Row>
    </Container>
  );
};

export default NotFound;
