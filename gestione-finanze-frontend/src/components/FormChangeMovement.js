import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useContiGetCall } from '../getCalls/ContiGetCall';
import { useCategorieGetCall } from '../getCalls/CategoriaGetCall';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';

const FormChangeMovement = ({ setNewData, setRefreshTable }) => {

    const { conti } = useContiGetCall();
    const { categorie } = useCategorieGetCall();
    const { auth } = useAuth();

    const [validationStatus, setValidationStatus] = useState({
        anno: null,
        mese: null,
        movimento: null,
        categoria: null,
        conto: null,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const yearString = form.anno.value;
        let year = null;
        if (/^\d{4}$/.test(yearString)) {year = parseInt(yearString);if (year === 0 || isNaN(year)) { year = null;}}
        const month = form.mese.value !== "0" ? parseInt(form.mese.value) : null;
        const sign = form.movimento.value !== "0" ? (form.movimento.value === "entrate" ? 1 : -1) : null;
        const categoria = form.categoria.value !== "0" ? form.categoria.value : null;
        const conto = form.conto.value !== "0" ? form.conto.value : null;

        try {
            const queryParams = new URLSearchParams();
            if (year) {
                queryParams.append("year", year);
                setValidationStatus(prevState => ({ ...prevState, anno: true }))
            } else {
                setValidationStatus(prevState => ({ ...prevState, anno: null }))
            }
            if (month) {
                queryParams.append("month", month);
                setValidationStatus(prevState => ({ ...prevState, mese: true }))
            } else {
                setValidationStatus(prevState => ({ ...prevState, mese: null }))
            }
            if (sign !== null) {
                queryParams.append("sign", sign);
                setValidationStatus(prevState => ({ ...prevState, movimento: true }))
            } else {
                setValidationStatus(prevState => ({ ...prevState, movimento: null }))
            }
            if (categoria !== null) {
                queryParams.append("categoria", categoria);
                setValidationStatus(prevState => ({ ...prevState, categoria: true }))
            } else {
                setValidationStatus(prevState => ({ ...prevState, categoria: null }))
            }
            if (conto !== null) {
                queryParams.append("nomeConto", conto);
                setValidationStatus(prevState => ({ ...prevState, conto: true }))
            } else {
                setValidationStatus(prevState => ({ ...prevState, conto: null }))
            }

            const response = await api.get(`/movimenti/search/findByYearAndMonthAndSignAndCategoriaAndNomeConto?${queryParams}`, 
            {
                auth: {
                username: auth.username,
                password: auth.password,
                }
            },);
            if (response.status === 200) {
                setNewData(response.data);
                setRefreshTable(true);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
    

    const form = () => {
        return (
            <div className="container mt-3 mb-2">
                <h3 className="mb-3">Personalizza i risultati:</h3>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="gap-0 mb-3 d-flex align-items-baseline">
                        <Form.Group as={Col} md="2" controlId="anno">
                            <Form.Label>Anno:</Form.Label>
                            <Form.Control
                                type="text"
                                name="anno"
                                placeholder="Inserisci l'anno"
                                min="1900"
                                max="2099"
                                step="1"
                                isValid={validationStatus.anno}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="mese">
                            <Form.Label>Mese:</Form.Label>
                            <Form.Control as="select" name="mese" isValid={validationStatus.mese}>
                                <option value="0">Seleziona il mese</option>
                                <option value="1">Gennaio</option>
                                <option value="2">Febbraio</option>
                                <option value="3">Marzo</option>
                                <option value="4">Aprile</option>
                                <option value="5">Maggio</option>
                                <option value="6">Giugno</option>
                                <option value="7">Luglio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Settembre</option>
                                <option value="10">Ottobre</option>
                                <option value="11">Novembre</option>
                                <option value="12">Dicembre</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="movimento">
                            <Form.Label>Movimento:</Form.Label>
                            <Form.Control as="select" name="movimento" isValid={validationStatus.movimento}>
                                <option value="0">Seleziona il movimento</option>
                                <option value="entrate">Entrate</option>
                                <option value="uscite">Uscite</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="categoria">
                            <Form.Label>Tipo Categoria:</Form.Label>
                            <Form.Control as="select" name="categoria" isValid={validationStatus.categoria}>
                                <option value="0">Seleziona la categoria</option>
                                 {categorie._embedded.categorieMovimentis.map( (categoria) => {
                                    return (
                                        <option value={categoria.categoriaMovimento}>{categoria.categoriaMovimento}</option>
                                    )
                                 })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="conto">
                            <Form.Label>Nome Conto:</Form.Label>
                            <Form.Control as="select" name="conto" isValid={validationStatus.conto}>
                            <option value="0">Seleziona un conto</option>
                            {conti._embedded.contis.map( (conto) => {
                                return (
                                <option value={conto.nomeConto}>{conto.nomeConto}</option>
                                )
                            })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="2" className="mt-auto" controlId="invia">
                            <Button type="submit">Invia</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        );                          
    }

  return (
    <>
        {form()}
    </>
  )
}

export default FormChangeMovement