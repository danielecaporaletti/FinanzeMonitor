import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import GraficoMese from '../components/GrficoMese';
import GraficoAnno from '../components/GraficoAnno';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import "../components/css.css";
import { useAnniGetCall } from '../getCalls/AnniGetCall';
import GraficoPieEntrate from '../components/GraficoPieEntrate';
import GraficoPieUscite from '../components/GraficoPieUscite';
import api from '../api/api';
import { useAuth } from "../api/AuthContext";
import "../components/css.css"
import Footer from '../components/Footer';
import Button from 'react-bootstrap/Button';

const Grafici = () => {

    const { anni } = useAnniGetCall();
    const { auth } = useAuth();

    // anno che viene richiesto di rappresentare nel grafico mese
    const [annoSelezionato, setAnnoSelezionato] = useState(anni[0].year);

    const [numCaselleEntrate, setNumCaselleEntrate] = useState(2);
    const [numCaselleUscite, setNumCaselleUscite] = useState(2);

    const [annoSelezionatoEntrate, setAnnoSelezionatoEntrate] = useState(anni[0].year);
    const [categorieSelezionateEntrate, setCategorieSelezionateEntrate] = useState([]);
    const [selectedCategoriesEntrate, setSelectedCategoriesEntrate] = useState([]);

    const [annoSelezionatoUscite, setAnnoSelezionatoUscite] = useState(anni[0].year);
    const [categorieSelezionateUscite, setCategorieSelezionateUscite] = useState([]);
    const [selectedCategoriesUscite, setSelectedCategoriesUscite] = useState([]);

    const handleCategoriaChangeEntrate = (e, index) => {
        const newCategories = [...selectedCategoriesEntrate];
        newCategories[index] = e.target.value;
        setSelectedCategoriesEntrate(newCategories);
      
        if (e.target.value && index === numCaselleEntrate - 1) {
          setNumCaselleEntrate(numCaselleEntrate + 1);
        } else if (!e.target.value && index === numCaselleEntrate - 2) {
          setNumCaselleEntrate(numCaselleEntrate - 1);
        }
    };
      
      const handleCategoriaChangeUscite = (e, index) => {
        const newCategories = [...selectedCategoriesUscite];
        newCategories[index] = e.target.value;
        setSelectedCategoriesUscite(newCategories);
      
        if (e.target.value && index === numCaselleUscite - 1) {
          setNumCaselleUscite(numCaselleUscite + 1);
        } else if (!e.target.value && index === numCaselleUscite - 2) {
          setNumCaselleUscite(numCaselleUscite - 1);
        }
    };

    const handleResetCategorieEntrate = () => {
        setSelectedCategoriesEntrate([]);
        setNumCaselleEntrate(2);
    };

    const handleResetCategorieUscite = () => {
        setSelectedCategoriesUscite([]);
        setNumCaselleUscite(2);
    };

    useEffect(() => {
        setSelectedCategoriesEntrate([]);
    }, [annoSelezionatoEntrate]);

    useEffect(() => {
        setSelectedCategoriesUscite([]);
    }, [annoSelezionatoUscite]);

    useEffect(() => {
        if(annoSelezionatoEntrate){
            const fetchData = async () => {
                try {
                const response = await api.get(`/categorie_entrate?year=${annoSelezionatoEntrate}`, {
                    auth: {
                    username: auth.username,
                    password: auth.password,
                    },
                });
                setCategorieSelezionateEntrate(response.data);
                } catch (error) {
                console.error(`Error: ${error}`);
                }
            }
            fetchData();
        }

    }, [annoSelezionatoEntrate]);

    useEffect(() => {
        if(annoSelezionatoUscite){
            const fetchData = async () => {
                try {
                const response = await api.get(`/categorie_uscite?year=${annoSelezionatoUscite}`, {
                    auth: {
                    username: auth.username,
                    password: auth.password,
                    },
                });
                setCategorieSelezionateUscite(response.data);
                } catch (error) {
                console.error(`Error: ${error}`);
                }
            }
            fetchData();
        }

    }, [annoSelezionatoUscite]);

    const selezionaCategoriaEntrate = (index) => {
        return (
          <Form.Select
            className='mb-2'
            id="categoria"
            name="categoria"
            key={`${annoSelezionatoEntrate}-${index}`}
            onChange={(e) => handleCategoriaChangeEntrate(e, index)}
          >
            <option value="">Seleziona la categoria</option>
            {categorieSelezionateEntrate.map((categoria) => {
              return (
                <option value={categoria.categoria}>{categoria.categoria}</option>
              );
            })}
          </Form.Select>
        );
    };

    const selezionaCategoriaUscite = (index) => {
        return (
          <Form.Select
            className='mb-2'
            id="categoria"
            name="categoria"
            key={`${annoSelezionatoUscite}-${index}`}
            onChange={(e) => handleCategoriaChangeUscite(e, index)}
          >
            <option value="">Seleziona la categoria</option>
            {categorieSelezionateUscite.map((categoria) => {
              return (
                <option value={categoria.categoria}>{categoria.categoria}</option>
              );
            })}
          </Form.Select>
        );
    };

  return (
    <>
        <NavBar />
        <div className="main-container">
        <Container fluid="lg" className="main-content">
            <Row>
                <div className="mt-4 mb-4">
                    <div className="d-flex align-items-center">
                        <h1 className="text-center flex-grow-1 display-1">Grafici</h1>
                    </div>
                </div>
            </Row>
            <Row >
                <Col xs={12} lg={2}>
                    <h4 className='text-center mt-2'>Andatura Totale</h4>
                    <p className='text-center'>Questo grafico mostra l'andatura delle tue entrate e uscite a fine anno</p>
                </Col>
                <Col className='p-0' xs={12} lg={10}>
                    <GraficoAnno />
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col xs={12} lg={2}>
                    <h4 className='text-center mt-2'>Andatura Annua</h4>
                    <p className='text-center'>Questo grafico mostra l'andatura delle tue entrare e uscite durante un anno specifico</p>
                        <Form.Label>Seleziona l'anno:</Form.Label>
                        <Form.Select 
                        className='mb-4'
                        required 
                        id="anno" 
                        name="anno"
                        onChange={(e) => setAnnoSelezionato(e.target.value)}
                        >
                        {anni.map( (anno) => {
                            return (
                                <option key={anno.year} value={anno.year}>{anno.year}</option>
                            )
                        })}
                        </Form.Select>
                </Col>
                <Col className='p-0' xs={12} lg={10}>
                    <GraficoMese annoSelezionato={annoSelezionato}/>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Row>
                    <Col xs={12} lg={2}>
                        <h4 className='text-center mt-2'>Categorie Annue Uscite</h4>
                        <p className='text-center'>Questo grafico mostrano l'andatura delle tue uscite durante un anno specifico</p>

                    </Col>
                    <Col xs={6} lg={2}>
                        <Form.Label>Seleziona l'anno:</Form.Label>
                        <Form.Select 
                            className='mb-4'
                            required 
                            id="anno" 
                            name="anno"
                            onChange={(e) => setAnnoSelezionatoUscite(e.target.value)}
                            value={annoSelezionatoUscite}
                            >
                            {anni.map( (anno) => {
                                return (
                                    <option key={anno.year} value={anno.year}>{anno.year}</option>
                                )
                            })}
                        </Form.Select>
                    </Col>
                    <Col xs={6} lg={3}>
                        <Form.Label>Seleziona le Uscite:</Form.Label>
                        {Array.from({ length: numCaselleUscite }, (_, index) => selezionaCategoriaUscite(index))}
                        <Button onClick={handleResetCategorieUscite}>Ripulisci</Button>
                    </Col>
                    <Col className='p-0' xs={12} lg={5}>
                        <GraficoPieUscite annoSelezionatoUscite={annoSelezionatoUscite} selectedCategoriesUscite={selectedCategoriesUscite}/>
                    </Col>
                </Row>
            </Row>
            <hr/>
            <Row>
                <Row className='mt-4'>
                    <Col xs={12} lg={2}>
                        <h4 className='text-center mt-2'>Categorie Annue Entrate</h4>
                        <p className='text-center'>Questo grafico mostrano l'andatura delle tue entrare durante un anno specifico</p>

                    </Col>
                    <Col xs={6} lg={2}>
                        <Form.Label>Seleziona l'anno:</Form.Label>
                        <Form.Select 
                            className='mb-4'
                            required 
                            id="anno" 
                            name="anno"
                            onChange={(e) => setAnnoSelezionatoEntrate(e.target.value)}
                            value={annoSelezionatoEntrate}
                            >
                            {anni.map( (anno) => {
                                return (
                                    <option key={anno.year} value={anno.year}>{anno.year}</option>
                                )
                            })}
                        </Form.Select>
                    </Col>
                    <Col xs={6} lg={3}>
                        <Form.Label>Seleziona le Entrate:</Form.Label>
                        {Array.from({ length: numCaselleEntrate }, (_, index) => selezionaCategoriaEntrate(index))}
                        <Button onClick={handleResetCategorieEntrate}>Ripulisci</Button>
                    </Col>
                    <Col className='p-0' xs={12} lg={5}>
                        <GraficoPieEntrate annoSelezionatoEntrate={annoSelezionatoEntrate} selectedCategoriesEntrate={selectedCategoriesEntrate}/>
                    </Col>
                </Row>
            </Row>
        </Container>
        <Footer />
        </div>
    </>
    )
}

export default Grafici