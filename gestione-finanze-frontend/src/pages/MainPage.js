import React from 'react';
import TableMain from '../components/TableMain';
import NavBar from '../components/NavBar';
import "../components/css.css";
import Footer from '../components/Footer';

const MainPage = () => {

    return (
        <>
            <div className="main-container">
            <NavBar acive={"MainPage"}/>
            <div className="main-container-lg mt-4 mb-4">
                <div className="d-flex align-items-center">
                <h1 className="text-center flex-grow-1 display-1">Finanze Personali</h1>
                </div>
            </div>
            <TableMain />
            <Footer />
            </div>
        </>
    )
}

export default MainPage