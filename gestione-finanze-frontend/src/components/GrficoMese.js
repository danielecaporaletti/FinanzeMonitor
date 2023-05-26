import React, { useState, useEffect } from "react";
import api from '../api/api';
import { useAuth } from "../api/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GraficoMese = ({ annoSelezionato }) => {
    const { auth } = useAuth();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await api.get(`/monthly_summary?year=${annoSelezionato}`, {
                auth: {
                username: auth.username,
                password: auth.password,
                },
            });
            setData(response.data);
            } catch (error) {
            console.error(`Error: ${error}`);
            }
        }
        fetchData();
    }, [annoSelezionato, auth]);

    const convertiMese = (numeroMese) => {
        const mesi = [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
        ];

    return mesi[numeroMese - 1];
  };

    const mappedData = data
        ? data.map((item) => ({
            ...item,
            mese: convertiMese(item.mese),
        }))
        : [];

    return (
        <>
        {data !== null ? (
            <Container fluid>
                <Row>
                    <Col className="p-0">
                    <ResponsiveContainer width="100%" height={450}>
            <LineChart
                width={500}
                height={300}
                data={mappedData}
                margin={{
                top: 5,
                right: 30,
                left: -10,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mese" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="entrate" stroke="#32CD32" activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="uscite" stroke="#A52A2A" />
            </LineChart>
            </ResponsiveContainer>
                    </Col>
                </Row>
            </Container>
        ) : (
            <h1 className="text-center">Loading</h1>
        )}
        </>
    );
};

export default GraficoMese;
