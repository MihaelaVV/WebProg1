document.getElementById('ticketHTMLForm').addEventListener('submit', erstelleTicket);

function erstelleTicket(e) { // Input Info holen
  var ticketBeschr = document.getElementById('tBeschreibungInput').value;
  var ticketPrio = document.getElementById('ticketPrioInput').value;
  var ticketTitel = document.getElementById('ticketTitelInput').value;
  var ticketVerfasser = document.getElementById('ticketVerfasserInput').value;
  var ticketDatum = document.getElementById('ticketDatumInput').value;
  var ticketId = chance.guid();
  var ticketStatus = 'Nicht erledigt';

  var ticket = {
    id: ticketId,
    beschr: ticketBeschr,
    titel: ticketTitel,
    prior: ticketPrio,
    verf: ticketVerfasser,
    dat: ticketDatum,
    stat: ticketStatus
  }

  if (localStorage.getItem('tickets') == null) {
    var tickets = [];
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
  } else {
    var tickets = JSON.parse(localStorage.getItem('tickets'));
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }

  document.getElementById('ticketHTMLForm').reset();

  auflisten(); 
  e.preventDefault();
}

function setStatusClosed(id) {
  var tickets = JSON.parse(localStorage.getItem('tickets'));

  for (var i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id) {
      tickets[i].stat = 'Erledigt';
    }
  }

  localStorage.setItem('tickets', JSON.stringify(tickets));
  auflisten();
}

function deleteIssue(id) {
  var tickets = JSON.parse(localStorage.getItem('tickets'));

  for (var i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id) {
      tickets.splice(i, 1);
    }
  }

  localStorage.setItem('tickets', JSON.stringify(tickets));

  auflisten();
}

function auflisten() { 
  var tickets = JSON.parse(localStorage.getItem('tickets'));
  var ticketListe = document.getElementById('ticketListe'); //ändern des Inhaltes

  ticketListe.innerHTML = ''; // am Anfang kein Inhalt

  for (var i = 0; i < tickets.length; i++) {
    var id = tickets[i].id;
    var beschreibung = tickets[i].beschr;
    var priorität = tickets[i].prior;
    var titel = tickets[i].titel;
    var verfasser = tickets[i].verf;
    var datum = tickets[i].dat;
    var status = tickets[i].stat;

    ticketListe.innerHTML +=   
                              '<div class="jumbotron text-center col-md-4 style="margin-bottom: 1em"">'+       //so wird ein Ticket nach dem Userinput aussehen
                              '<h6>Ticket ID: ' + id + '</h6>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + verfasser + '</p>'+
                              '<h3>' + titel + '</h3>' +
                              '<h3>' + datum + '</h3>' +
                              '<h3>' + beschreibung + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + priorität + '</p>'+
                              '<p><span class="label label-success">' + status + '</span></p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\'); return false;" class="btn btn-warning">Erledigt</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\'); return false;" class="btn btn-danger">Löeschen</a>'+
                              '<a href="#" class = "btn btn-primary">Bearbeiten</a>' 
                              '</div>';
                              
  }
}
