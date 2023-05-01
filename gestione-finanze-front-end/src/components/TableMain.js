import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import './css.css';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';
import { useInView } from 'react-intersection-observer';

const TableMain = () => {
    const { auth } = useAuth();
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 1,
        rootMargin: '200px 0px',
    });

    useEffect(() => {
        if (inView && data && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, data, hasMore]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            console.log("Fetching page:", page);
            const response = await api.get(`/movimenti_mensili?&sort=id.anno,id.mese,desc&page=${page}`, {
            auth: {
                username: auth.username,
                password: auth.password,
            },
            });
            console.log(response.data);

            if (response.data._links && response.data._links.next) {
            setHasMore(true);
            } else {
            setHasMore(false);
            }

            setData((prevData) => {
            return prevData
                ? {
                    ...response.data,
                    _embedded: {
                    movimenti_mensili: [
                        ...prevData._embedded.movimenti_mensili,
                        ...response.data._embedded.movimenti_mensili,
                    ],
                    },
                }
                : response.data;
            });
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

        fetchData();
    }, [auth, page]);

    function getMonthName(monthNumber) {
        const months = [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settembre',
        'Ottobre',
        'Novembre',
        'Dicembre',
        ];
        return months[monthNumber - 1];
    }

    function groupByMonth(movimenti) {
        const groupedData = [];
      
        movimenti.forEach((movimento) => {
          const existingMonth = groupedData.find(
            (item) =>
              item.anno === movimento.id.anno && item.mese === movimento.id.mese
          );
      
          if (existingMonth) {
            existingMonth.entrate += movimento.entrate;
            existingMonth.uscite += movimento.uscite;
            existingMonth.totalEntrate += movimento.entrate;
            existingMonth.totalUscite += movimento.uscite;
            existingMonth.totalAnno = existingMonth.totalEntrate + existingMonth.totalUscite;
            existingMonth.movimenti.push(movimento);
          } else {
            groupedData.push({
              anno: movimento.id.anno,
              mese: movimento.id.mese,
              entrate: movimento.entrate,
              uscite: movimento.uscite,
              totalEntrate: movimento.entrate,
              totalUscite: movimento.uscite,
              totalAnno: movimento.entrate + movimento.uscite,
              movimenti: [movimento],
            });
          }
        });
      
        return groupedData;
    }

    function renderTable() {

        if (!data || !data._embedded) {
            return null;
        }
        
        const groupedData = groupByMonth(data._embedded.movimenti_mensili)
        return (
            <Container className="mt-4">
                <div className="table-responsive">
                    <Table bordered hover>
                    <thead>
                    </thead>
                    <tbody>
                        {groupedData.map((monthData) => (
                        <React.Fragment key={`${monthData.anno}-${monthData.mese}`}>
                            <tr className="month-header">
                            <td colSpan="6">
                                <h5>{getMonthName(monthData.mese)} {monthData.anno}</h5>
                            </td>
                            </tr>
                            <tr>
                            <th>Anno</th>
                            <th>Mese</th>
                            <th>Entrate</th>
                            <th>Uscite</th>
                            <th>Nome Conto</th>
                            <th>Totale</th>
                            </tr>
                            {monthData.movimenti.map((movimento, index) => (
                            <tr key={`${movimento.id}-${index}`} className="movement-row">
                                <td>{movimento.anno}</td>
                                <td>{getMonthName(movimento.mese)}</td>
                                <td>{movimento.entrate}</td>
                                <td>{movimento.uscite}</td>
                                <td>{movimento.id.nomeConto}</td>
                                <td>{parseInt(movimento.entrate) + parseInt(movimento.uscite)}</td>
                            </tr>
                            ))}
                            <tr className="total-row">
                                <td colSpan="2"></td>
                                <td>Entrate: {Number(monthData.entrate).toFixed(2)}</td>
                                <td>Uscite: {Number(monthData.uscite).toFixed(2)}</td>
                                <td>Totale:</td>
                                <td>{Number(monthData.totalAnno).toFixed(2)}</td>
                            </tr>
                        </React.Fragment>
                        ))}
                    </tbody>
                    </Table>
                </div>
            </Container>
        );
    }

  return (
    <>
        {data? (
            <>
                {renderTable()}
                <div ref={ref}>{hasMore && <span>Caricamento in corso...</span>}</div>
            </>
        ):(
            <div className="d-flex align-items-center"><h1 className="text-center flex-grow-1">Loading</h1></div>
        )}
    </>
  );
};

export default TableMain;
