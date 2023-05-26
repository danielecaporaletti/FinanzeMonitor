import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Accordion from 'react-bootstrap/Accordion';
import FormAddConto from '../components/FormAddConto';
import TableConti from '../components/TableConti';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import "../components/css.css"

const Conti = () => {

    const [refreshTable, setRefreshTable] = useState(false);

    return (
        <>
        <NavBar />
        <div className="container mt-4 mb-4">
            <div className="d-flex align-items-center">
            <h1 className="text-center flex-grow-1 display-1">Conti</h1>
            </div>
        </div>
        <div className="main-container">
          <Container fluid="lg" className="main-content">
            <Accordion defaultActiveKey="0" className="shadow-sm rounded">
                <Accordion.Item eventKey="0">
                <Accordion.Header>Aggiungi Conto</Accordion.Header>
                <Accordion.Body>
                    <FormAddConto setRefreshTable={setRefreshTable} />
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="mt-3">
                <TableConti refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
            </div>
          </Container>
          <Footer />
        </div>
        </>
    )
};


export default Conti;
