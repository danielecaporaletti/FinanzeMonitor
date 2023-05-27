**Note: This document is available in two languages, <a href="#english">English</a> and <a href="#italian">Italian<a>.**

<a id="english"></a>
**ENGLISH VERSION**

# Local Installation

The project employs Docker Compose to facilitate the simultaneous start of necessary services. The entire suite of services can be executed through a single command from the root of the project:

```
docker-compose up -d
```

This action will initiate three Docker containers:

1. Front-end (React)
2. Back-end (Spring)
3. Database (MySQL)

# Application Usage

The application can be accessed at the address http://localhost:80 from any browser.

The first page you encounter will be the login screen, followed by the financial management dashboard. Here you can view all your financial transactions, apply custom filters to inspect specific movements, and add new transactions. In the graph section, you can observe income and expenditure trends over time.

## Front-end

The front-end is built using the React framework with the following dependencies:

- axios: for REST calls
- react-bootstrap: for handling CSS styling
- react-router-dom: for routing management
- recharts: for graph display

## Back-end

The back-end is a Spring3 application that includes the following modules:

- Spring Data JPA: for creating JPA-based data repositories
- Rest repositories: an extension of Spring Data that makes repositories available as RESTful services
- Spring Data JDBC & JDBC API: to simplify database access and interaction
- Spring Security: to ensure authentication, authorization, and protection from attacks
- Spring Web: for essential features in web application creation

## Database

The database is implemented with MySQL5 and connected to the back-end via Hibernate. All transactions are stored in the database.

---

<a id="italian"></a>
**VERSIONE ITALIANA**

# Installazione in locale

Il progetto impiega Docker Compose per facilitare l'avvio simultaneo dei servizi necessari. È possibile eseguire l'intero insieme di servizi attraverso un unico comando nella root del progetto:

```
docker-compose up -d
```

Questa azione avvierà tre container Docker:


1. Front-end (React)
2. Back-end (Spring)
3. Dabatase (MySQL)

# Uso dell'Applicazione

L'applicazione può essere raggiunta all'indirizzo http://localhost:80 da qualsiasi browser.

La prima pagina che si presenterà sarà quella di accesso, seguita dal pannello di controllo delle tue finanze. Qui potrai visualizzare tutte le tue transazioni finanziarie, applicare filtri personalizzati per ispezionare specifici movimenti e aggiungere nuove transazioni. Nella sezione dei grafici, potrai osservare le tendenze di entrate e uscite nel corso del tempo.

## Front-end

Il front-end è sviluppato utilizzando il framework React con le seguenti dipendenze:


- axios: per le chiamate REST
- react-bootstrap: per la gestione dello stile CSS
- react-router-dom: per il controllo del routing
- recharts: per la visualizzazione dei grafici

## Back-end

Il back-end è un'applicazione Spring3 che include i seguenti moduli:


- Spring Data JPA: per la creazione dei repository di dati basati su JPA
- Rest repositories: un'estensione di Spring Data che rende disponibili i repository come servizi RESTful
- Spring Data JDBC & JDBC API: per semplificare l'accesso e l'interazione con il database
- Spring Security: per garantire l'autenticazione, l'autorizzazione e la protezione da attacchi
- Spring Web: per le funzionalità fondamentali nella creazione di applicazioni web

## Database

Il database è stato implementato con MySQL5 e collegato al back-end tramite Hibernate. Tutte le transazioni vengono memorizzate nel database.