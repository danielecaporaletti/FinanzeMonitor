import React, { useEffect, useState } from "react";
import api from '../api/api';
import { useAuth } from "../api/AuthContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const GraficoPieEntrate = ({ annoSelezionatoEntrate, selectedCategoriesEntrate  }) => {
    const { auth } = useAuth();
    const FILL_COLORS = [
      '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658',
      '#f45b69', '#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c', '#6a4c93',
      '#e63946', '#f1fa8c', '#a8dadc', '#457b9d', '#1d3557', '#e76f51',
      '#2a9d8f', '#264653', '#e9c46a', '#f4a261', '#e07a5f', '#3d405b',
      '#81b29a', '#f2cc8f', '#4ea8de', '#9a031e'
    ];
    

    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const allCategoriesValid = selectedCategoriesEntrate.every(
            (categoria) => categoria && categoria.trim() !== ""
          );
      
          if (annoSelezionatoEntrate && allCategoriesValid) {
            const requests = selectedCategoriesEntrate.map(async (categoria, index) => {
              const url = `/sommaEntrate?categoria=${categoria}&year=${annoSelezionatoEntrate}`;
              const response = await api.get(url, {
                auth: {
                  username: auth.username,
                  password: auth.password,
                },
              });
              return response.data[0];
            });
      
            try {
              const results = await Promise.all(requests);
              const data = results.map((result, index) => {
                return {
                  name: selectedCategoriesEntrate[index],
                  somma: Math.abs(result.somma) || 0,
                };
              });
              setPieData(data);
            } catch (error) {
              console.error(`Error: ${error}`);
            }
          }
        };
      
        fetchData();
    }, [selectedCategoriesEntrate, auth]);
      
    const CustomLegend = ({ payload }) => {
        return (
          <ul style={{ listStyleType: "none" }}>
            {payload.map((entry, index) => (
              <li key={`legend-item-${index}`} style={{ fontSize: '14px', fontWeight: '700', marginBottom: '1.5px' }}>
                <span style={{ color: FILL_COLORS[index % FILL_COLORS.length], marginRight: '7px' }}>■</span>
                <span style={{ color: FILL_COLORS[index % FILL_COLORS.length] }}>
                  {entry.value} ({entry.payload.somma})
                </span>
              </li>
            ))}
          </ul>
        );
    };

  return (
    <>
    {pieData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
        <PieChart width={730} height={250}>
            <Pie data={pieData} dataKey="somma" cx="50%" cy="50%" outerRadius={90} label>
                {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={FILL_COLORS[index % FILL_COLORS.length]} />
                ))}
            </Pie>
            <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value, entry, index) => value}
                content={<CustomLegend />}
            />
        </PieChart>
        </ResponsiveContainer>
    ):(
        <p className="text-center display-6 mt-4 text-info">Prego inserisci l'anno e le categorie per visualizzare il grafico</p>
    )}
    </>
  );
};

export default GraficoPieEntrate;
