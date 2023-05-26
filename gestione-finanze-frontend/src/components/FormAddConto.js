import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';
import Alert from 'react-bootstrap/Alert';

const FormAddConto = ({ setRefreshTable }) => {

    const [isValidatedNomeConto, setIsValidatedNomeConto] = useState(null);
    const [isValidatedSaldo, setIsValidatedSaldo] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const { auth } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.nomeConto.value) {
            setIsValidatedNomeConto(false);
        } else {
            setIsValidatedNomeConto(true);
        }

        if (!form.saldo.value) {
            setIsValidatedSaldo(false);
        } else {
            setIsValidatedSaldo(true);
        }

        if (!form.nomeConto.value || !form.saldo.value) {
            return;
        }
    
        try {
            const response = await api.post('/conti',
                {
                    nomeConto: form.nomeConto.value,
                    saldo: form.saldo.value,
                },
                {
                    auth: {
                        username: auth.username,
                        password: auth.password,
                    }
                },);
            if (response.status === 201) {
                setIsValidatedNomeConto(true);
                setIsValidatedSaldo(true);
                setRefreshTable(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setShowAlert(true);
            } else {
                console.error(`Error: ${error}`);
            }
        }
    };

    const alert = () => {
        return (
            <>
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading>Attenzione!</Alert.Heading>
                    <p>L'utente non ha i permessi per questa operazione, passa a un account admin!</p>
                </Alert>
            </>
        )
    }

    return (
        <div className="container mt-3 mb-2">
            {showAlert && alert()}
            <h3 className="mb-3">Aggiungi o Modifica Conto</h3>
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="gap-0 mb-3 d-flex align-items-baseline">
                    <Form.Group as={Col} md="4" controlId="validationDate">
                        <Form.Label>Nome Conto:</Form.Label>
                        <Form.Control
                            required
                            isValid={isValidatedNomeConto === true}
                            isInvalid={isValidatedNomeConto === false}
                            type="text"
                            name="nomeConto"
                            placeholder="Inserisci nome"
                        />
                        <Form.Control.Feedback type="invalid">Inserisci un nome conto.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationMoviment">
                        <Form.Label>Saldo</Form.Label>
                        <Form.Control
                            required
                            isValid={isValidatedSaldo === true}
                            isInvalid={isValidatedSaldo === false}
                            type="number"
                            name="saldo"
                            placeholder="Saldo"
                        />
                        <Form.Control.Feedback type="invalid">Inserisci un saldo.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2"  className="mt-auto" controlId="validationSaldo">                            <Button type="submit" >Invia</Button>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
};

export default FormAddConto;