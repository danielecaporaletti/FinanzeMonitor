package it.danielecaporaletti.applicationJar.insertGenerator;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.Random;

public class InsertDataGenerator {
    private static final String[] CATEGORIA_MOVIMENTO_USCITE = {
            "Affitto", "Alimenti", "Assicurazione", "Automobile", "Bollette", "Carburante",
            "Casa", "Elettronica", "Entertainment", "Farmacia", "Fitness", "Gas", "Istruzione",
            "Lavoro", "Medico", "Mutuo", "Parcheggio", "Pulizie", "Ristorante", "Salute",
            "Shopping", "Spesa", "Sport", "Telecomunicazioni", "Trasporti", "Vacanze", "Vestiti",
            "Viaggi", "Intrattenimento", "Animali domestici", "Abbonamenti", "Arredamento", "Bambini",
            "Bellezza", "Corsi", "Donazioni", "Famiglia", "Feste", "Giardinaggio", "Hobby",
            "Imprevisti", "Investimenti", "Libri", "Matrimonio", "Prestiti", "Regali", "Risparmio",
            "Tasse", "Utenze", "Varie", "Commissioni bancarie", "Multe", "Servizi legali", "Contributi politici",
            "Manutenzione veicoli", "Manutenzione bicicletta", "Tecnologia",
            "Cinema", "Teatro", "Concerti", "Eventi sportivi", "Giochi d'azzardo", "App", "Giochi",
            "Depositi", "Servizi per la casa", "Terapia", "Consulenza"
    };
    private static final String[] CATEGORIA_MOVIMENTO_ENTRATE = {
            "Stipendio", "Bonus", "Dividendi", "Interessi bancari", "Affitti percepiti",
            "Vendita di beni", "Vendita di azioni", "Pensione", "Rimborsi fiscali", "Rimborsi spese",
            "Indennità di disoccupazione", "Assegni familiari",
            "Assegno di mantenimento", "Borse di studio", "Premi assicurativi", "Eredità",
            "Lotterie e vincite al gioco", "Regali in denaro", "Pagamenti per lavori occasionali",
            "Pagamenti per lavori freelance", "Pagamenti per consulenze", "Pagamenti per lezioni private",
            "Vendita di prodotti artigianali", "Vendita di oggetti usati",
            "Incassi da attività di crowdfunding", "Sponsorizzazioni"
    };
    private static final String[] NOME_CONTO = {
            "Conto Bancario", "Carta di Credito", "Carta di Debito", "Risparmi", "PayPal"
    };
    public static void main(String[] args) {

        Random random = new Random();
        Calendar calendar = Calendar.getInstance();
        calendar.set(2013, 0, 1); // Inizia dal 1 gennaio 2013

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.US);

        System.out.println("INSERT INTO movimenti (data, movimento, categoria_movimento, nome_conto) VALUES");

        for (int i = 0; i < 3650; i++) { // 10 anni = 3650 giorni circa
            String data = dateFormat.format(calendar.getTime());

            double biasedRandom = Math.pow(random.nextDouble(), 4.5 / 1.0);
            int leftPart = (int) (biasedRandom * 300); // Genera un intero casuale con una distribuzione non uniforme
            int rightPart = random.nextInt(100); // Genera un intero casuale a 2 cifre
            String formattedNumber;

            String categoriaMovimento;
            String nomeConto = NOME_CONTO[random.nextInt(NOME_CONTO.length)];

            if (random.nextBoolean()) { // Aggiungi un segno negativo a circa il 50% dei numeri generati
                leftPart = -leftPart;
                formattedNumber = String.format("%d.%02d", leftPart, rightPart); // Concatena i numeri con un punto tra di loro
                categoriaMovimento = CATEGORIA_MOVIMENTO_USCITE[random.nextInt(CATEGORIA_MOVIMENTO_USCITE.length)];
            } else {
                formattedNumber = String.format("%d.%02d", leftPart, rightPart);
                categoriaMovimento = CATEGORIA_MOVIMENTO_ENTRATE[random.nextInt(CATEGORIA_MOVIMENTO_ENTRATE.length)];
            }

            String insertQuery = String.format(
                    "('%s', %s, '%s', '%s'),",
                    data, formattedNumber, categoriaMovimento, nomeConto
            );

            System.out.println(insertQuery);

            calendar.add(Calendar.DAY_OF_YEAR, 1); // Incrementa di un giorno
        }
    }
}
