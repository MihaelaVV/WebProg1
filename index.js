// index.js
const express = require('express');
const app = express();
const tickets = require('./tickets.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/tickets', (req, res) => {
  const ticket = req.body;
  let ticketId = 0;

  if (tickets !== undefined){
    ticketId = tickets.length;
  }

  ticket.id = ticketId;

  tickets.push(ticket);

  console.log(tickets);
  res.status(201).json(ticket);
});

app.get('/ticket/:ticketId', (req, res) => {
  let data = tickets[req.params.ticketId];
  res.json({data});
});

app.put('/ticket/:id', (req, res) => {
  const editedTicket = req.body;
  let ticketId = req.params.id;

  let ticketObj = tickets[ticketId];
  if (ticketObj === undefined || ticketObj === null) {
    res.status(404).json({"error": "Ticket not found!"});
  } else {

    ticketObj.titel = editedTicket.titel;
    ticketObj.verf = editedTicket.verf;
    ticketObj.dat = editedTicket.dat;
    ticketObj.beschr = editedTicket.beschr;
    ticketObj.prior = editedTicket.prior;
    ticketObj.stat = editedTicket.stat; 

    tickets.splice(ticketId, 1, ticketObj);

    console.log(tickets);
    res.status(200).json(tickets);
  }
});

app.get('/tickets', (req, res) => {
  res.json({tickets});
});

app.delete('/tickets/:id', (req, res) => {
  const ticketId = req.params.id;


  //console.log("Ticket " + ticket);
  tickets.splice(ticketId, 1);

  console.log(tickets);
  res.status(201).json(tickets);
});

app.listen(3000);
console.log("Server läuft auf 3000");