import TableMovimento from '../components/TableMovimento';
import FormChangeMovement from '../components/FormChangeMovement';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Accordion from 'react-bootstrap/Accordion';
import FormAddMovement from '../components/FormAddMovement';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import "../components/css.css"

const Movimenti = () => {

    const [refreshTable, setRefreshTable] = useState(false);
    const [newData, setNewData] = useState(null);
    const [resetPage, setResetPage] = useState(false);
    const [key, setKey] = useState(0); // Aggiungi questa riga

    const refreshData = () => {
        setKey((prevKey) => prevKey + 1); // Aggiungi questa riga
        setResetPage(true);
    };

  return (
    <> 
        <div className="main-container"> 
        <NavBar />
        <div className="container mt-4 mb-4">
            <div className="d-flex align-items-center">
            <h1 className="text-center flex-grow-1 display-1">Movimenti</h1>
            </div>
        </div>
        <Container fluid="lg" >
        <Accordion defaultActiveKey="0" className='shadow-sm rounded'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Aggiungi Movimento</Accordion.Header>
                <Accordion.Body>
                    <FormAddMovement setRefreshTable={setRefreshTable} refreshData={refreshData}/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ricerca Personlizzata</Accordion.Header>
                <Accordion.Body>
                    <FormChangeMovement setNewData={setNewData} setRefreshTable={setRefreshTable} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </Container>
        <div className="mt-3">
            <TableMovimento 
                refreshTable={refreshTable} 
                setRefreshTable={setRefreshTable} 
                newData={newData} 
                setNewData={setNewData} 
                resetPage={resetPage} 
                setResetPage={setResetPage}
                key={key}
                />
        </div>
        <Footer />
        </div>
    </>
  )
}

export default Movimenti