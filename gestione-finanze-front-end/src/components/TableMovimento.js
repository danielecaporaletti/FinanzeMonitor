import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';
import { useInView } from 'react-intersection-observer';

const TableMovimento = ({ refreshTable, setRefreshTable, newData, resetPage, setResetPage }) => {

    const { auth } = useAuth();
    const [data, setData] = useState('');
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 1,
        rootMargin: '200px 0px',
    });

    useEffect(() => {
        if (resetPage) {
            setPage(0);
            setResetPage(false);
        }
    }, [resetPage, setResetPage]);

    useEffect(() => {
        if (inView && data && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    }, [inView, data, hasMore]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/movimenti?projection=inlineMovimenti&sort=data,desc&page=${page}`, {
                    auth: {
                        username: auth.username,
                        password: auth.password,
                    },
                });
    
                if (response.data._links && response.data._links.next) {
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }


                if (newData == null) {
                    setData(prevData => {
                        const existingIds = prevData ? prevData._embedded.movimentis.map(mov => mov.id) : [];
                        const newMovimentis = response.data._embedded.movimentis.filter(mov => !existingIds.includes(mov.id));
                        return {
                            ...response.data,
                            _embedded: {
                                movimentis: prevData
                                    ? [...prevData._embedded.movimentis, ...newMovimentis]
                                    : newMovimentis,
                            },
                        };
                    });
                } else {
                    setData(newData);
                }
    
                setRefreshTable(false);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };
    
        fetchData();
    }, [refreshTable, auth, newData, page, hasMore]);

    return (
        <>
            {data ? (
                <Container className="mt-4">
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Movimento</th>
                                    <th>Categoria</th>
                                    <th>NomeConto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data._embedded.movimentis.map((movimento) => {
                                    return (
                                        <tr key={movimento.id}>
                                            <td>{movimento.data.substring(0, 10)}</td>
                                            {movimento.movimento >= 0 ? (
                                                <td className="text-success">+{movimento.movimento}</td>
                                            ) : (
                                                <td className="text-danger">{movimento.movimento}</td>
                                            )}
                                            <td>{movimento.categoriaMovimento.categoriaMovimento}</td>
                                            <td>{movimento.conto.nomeConto}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            ) : (
                <div className="d-flex align-items-center">
                    <h1 className="text-center flex-grow-1">Loading</h1>
                </div>
            )}
            <div ref={ref}></div>
        </>
    );
};

export default TableMovimento;
