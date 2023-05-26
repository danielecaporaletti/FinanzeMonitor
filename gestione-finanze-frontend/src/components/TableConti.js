import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';
import GraficoMese from './GrficoMese';

const TableConti = ({ refreshTable, setRefreshTable }) => {

    const { auth } = useAuth();
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/conti', {
                    auth: {
                        username: auth.username,
                        password: auth.password,
                    },
                });
                setData(response.data);
                setRefreshTable(false);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };
    
        fetchData();
    }, [refreshTable, auth]);

    return (
        <>
        {data? (
            <Container className="mt-4">
                <div className="table-responsive">
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Nome Conto</th>
                        <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data._embedded.contis.map( (conto) => {
                            return (
                                <tr key={conto.nomeConto}>
                                <td>{conto.nomeConto}</td>
                                <td>{conto.saldo}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </Table>
                </div>
            </Container>
        ):(
            <div className="d-flex align-items-center"><h1 className="text-center flex-grow-1">Loading</h1></div>
        )}
        </>
    );
};

export default TableConti;
