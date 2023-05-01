import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';
import { useContiGetCall } from '../getCalls/ContiGetCall';
import { useCategorieGetCall } from '../getCalls/CategoriaGetCall';
import Alert from 'react-bootstrap/Alert';

const FormAddMovement = ({ setRefreshTable, refreshData }) => {

    const [isValidatedData, setIsValidatedData] = useState(null);
    const [isValidatedMovimento, setIsValidatedMovimento] = useState(null);
    const [isValidatedCategoria, setIsValidatedCategoria] = useState(null);
    const [isValidatedConto, setIsValidatedConto] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const { auth } = useAuth();
    const { conti } = useContiGetCall() || { conti: { _embedded: { contis: [] } } };
    const { categorie } = useCategorieGetCall() || { categorie: { _embedded: { categorieMovimentis: [] } } };    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        if (!form.data.value) {
            setIsValidatedData(false);
        } else {
            setIsValidatedData(true);
        }

        if (!form.movimento.value) {
            setIsValidatedMovimento(false);
        } else {
            setIsValidatedMovimento(true);
        }

        if (!form.categoria.value) {
            setIsValidatedCategoria(false);
        } else {
            setIsValidatedCategoria(true);
        }

        if (!form.conto.value) {
            setIsValidatedConto(false);
        } else {
            setIsValidatedConto(true);
        }

        if (!form.data.value || !form.movimento.value || !form.categoria.value || !form.conto.value) {
            return;
        }
    
        try {
            const response = await api.post('/movimenti', 
            {
                data: form.data.value,
                categoriaMovimento: form.categoria.value,
                conto: form.conto.value,
                movimento: form.movimento.value,
            },
            {
                auth: {
                  username: auth.username,
                  password: auth.password,
                }
            },);
            if (response.status === 201) {
                setIsValidatedData(true);
                setIsValidatedMovimento(true);
                setIsValidatedCategoria(true);
                setIsValidatedConto(true);
                setRefreshTable(true);
                refreshData();
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
        <div className="mt-3 mb-2">
            {showAlert && alert()}
            <h3 className="mb-3">Aggiungi Movimento</h3>
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="gap-0 mb-3 d-flex align-items-baseline">
                    <Form.Group as={Col} md="3" controlId="validationDate">
                        <Form.Label>Data:</Form.Label>
                        <Form.Control
                            required
                            isValid={isValidatedData === true}
                            isInvalid={isValidatedData === false}
                            type="date"
                            name="data"
                        />
                        <Form.Control.Feedback type="invalid">Inserisci una data valida.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationMoviment">
                        <Form.Label>Movimento</Form.Label>
                        <Form.Control
                            required
                            isValid={isValidatedMovimento === true}
                            isInvalid={isValidatedMovimento === false}
                            type="number"
                            name="movimento"
                            placeholder="Movimento"
                        />
                        <Form.Control.Feedback type="invalid">Inserisci un movimento.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationcategoria">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select 
                        required 
                        isValid={isValidatedCategoria === true}
                        isInvalid={isValidatedCategoria === false}
                        id="categoria" 
                        name="categoria"
                        >
                            <option value="">Seleziona la categoria</option>
                                {categorie && categorie._embedded && categorie._embedded.categorieMovimentis.map((categoria) => {
                                    return (
                                        <option value={categoria._links.self.href}>{categoria.categoriaMovimento}</option>
                                    )
                                })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Inserisci una categoria.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationcategoria">
                        <Form.Label>Conto</Form.Label>
                        <Form.Select 
                        required
                        isValid={isValidatedConto === true}
                        isInvalid={isValidatedConto === false} 
                        id="conto" 
                        name="conto"
                        >
                            <option value="">Seleziona un conto</option>
                            {conti && conti._embedded && conti._embedded.contis.map((conto) => {
                                return (
                                    <option value={conto._links.self.href}>{conto.nomeConto}</option>
                                )
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Inserisci un conto.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="1"  className="mt-auto" controlId="validationSaldo">
                        <Button type="submit" >Invia</Button>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )

}

export default FormAddMovement