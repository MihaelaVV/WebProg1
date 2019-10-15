$(function() {
  $("#addTicketButton").click(function(e) {
    var ticketBeschr = $('#tBeschreibungInput').val();
    var ticketPrio = $('#ticketPrioInput').val();
    var ticketTitel = $('#ticketTitelInput').val();
    var ticketVerfasser = $('#ticketVerfasserInput').val();
    var ticketDatum = $('#ticketDatumInput').val();
    var ticketStatus = 'Nicht erledigt';

    var ticket = {
      beschr: ticketBeschr,
      titel: ticketTitel,
      prior: ticketPrio,
      verf: ticketVerfasser,
      dat: ticketDatum,
      stat: ticketStatus
    }

    erstelleTicket(e, ticket);
  });

  $("#saveTicketBtn").click(function(e) {
    e.preventDefault();
    var ticketId = $('#editedTicketId').val(); 
    var ticketBeschr = $('#editTicketBeschr').val();
    var ticketPrio = $('#editTicketPrio').val();
    var ticketTitel = $('#editTicketTitel').val();
    var ticketVerfasser = $('#editTicketVerfasser').val();
    var ticketDatum = $('#editTicketDatum').val();
    var ticketStatus = $('#editTicketStatus').val();

    var ticket = {
      id: ticketId,
      beschr: ticketBeschr,
      titel: ticketTitel,
      prior: ticketPrio,
      verf: ticketVerfasser,
      dat: ticketDatum,
      stat: ticketStatus
    }

    saveTicket(ticket);
  });
  
  $("#addTicketsBtn").click(function() {
    $("#submitTicket").show();
  });

  $("#listTicketsBtn").click(function() {
    auflisten();
  });


  function edit(editId) {
    var parent = $(editId).parentNode.parentNode;
    var child = parent.firstChild.firstChild;
    child.removeAttribute('disabled');
    console.log(child);
  }

  window.updateToggle = function(updateId) {
    $("#submitTicket").hide();
    $("#editTicket").show();

    getTicket(updateId).then(resp => {
      console.log(resp);
      let data = resp.data;

      var ticket = {
        id: data.id,
        beschr: data.beschr,
        titel: data.titel,
        prior: data.prior,
        verf: data.verf,
        dat: data.dat,
        stat: data.stat
      }
  
      $("#editTicket #editTicketId").html(updateId);
  
      $("#editTicket #editTicketVerfasser").val(ticket.verf);
      $("#editTicket #editTicketTitel").val(ticket.titel);
      $("#editTicket #editTicketBeschr").val(ticket.beschr);
      $("#editTicket #editTicketDatum").val(ticket.dat);
      $("#editTicket #editTicketStatus").val(ticket.stat);
      $("#editTicket #editedTicketId").val(ticket.id);
      
    });

  }

  window.saveTicket = function(ticket) {
    if (ticket === undefined || ticket === null) {
      console.log("Ticket not found!");
    } else {
      updateTicket(ticket).then( resp => {
        auflisten();
      });
    }
  }

  window.erstelleTicket = function(e, ticket) { // Input Info holen
    e.preventDefault();

    if (ticket === undefined || ticket === null) {
      var ticketBeschr = $('#tBeschreibungInput').val();
      var ticketPrio = $('#ticketPrioInput').val();
      var ticketTitel = $('#ticketTitelInput').val();
      var ticketVerfasser = $('#ticketVerfasserInput').val();
      var ticketDatum = $('#ticketDatumInput').val();
      var ticketStatus = 'Nicht erledigt';
  
      var ticket = {
        beschr: ticketBeschr,
        titel: ticketTitel,
        prior: ticketPrio,
        verf: ticketVerfasser,
        dat: ticketDatum,
        stat: ticketStatus
      }
    }
    sendTicket(ticket).then( resp => {
      $('#ticketHTMLForm').trigger("reset");

      auflisten();
    });
  }

  async function getTicket(ticketId) {
    let response = await fetch('/ticket/' + ticketId);
    let data = await response.json().then(resData => { return resData });
    console.log(data);
    return data;
  }

  async function getTickets() {
    let response = await fetch('/tickets');
    let data = await response.json().then(resData => { return resData });
    console.log(data);
    return data;
  }

  async function updateTicket(ticket) {
    await fetch('/ticket/' + ticket.id, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(ticket)
    })
    .then(res => res.json())
    .then(tickets => {
      console.log(tickets);
    });
  }

  async function sendTicket(ticket) {
    await fetch('/tickets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(ticket)
    })
    .then(res => res.json())
    .then(ticket => {
      console.log(ticket);
    });
  }

  async function deleteTicket(ticketId) {
    await fetch('/tickets/' + ticketId, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(tickets => {
      console.log(tickets);
    });
  }

  
  window.setStatusClosed = function(id) {
    var tickets = JSON.parse(localStorage.getItem('tickets'));

    for (var i = 0; i < tickets.length; i++) {
      if (tickets[i].id == id) {
        tickets[i].stat = 'Erledigt';
      }
    }

    localStorage.setItem('tickets', JSON.stringify(tickets));
    auflisten();
  }

  window.deleteIssue = function(id) {
    deleteTicket(id).then(resp => {
      auflisten();
    });
  }

  window.auflisten = function() {
    getTickets().then(data => {
      let tickets = data.tickets;

      var ticketListe = $('#ticketListe').html(""); 

      ticketListe.innerHTML = ''; 
    
      if (tickets !== null && tickets !== undefined) {
        for (var i = 0; i < tickets.length; i++) {
          var id = tickets[i].id;
          var beschreibung = tickets[i].beschr;
          var priorität = tickets[i].prior;
          var titel = tickets[i].titel;
          var verfasser = tickets[i].verf;
          var datum = tickets[i].dat;
          var status = tickets[i].stat;
    
          ticketListe.append(
            '<div class="overflow-auto text-left col-md-4 style="margin-bottom: 1em "" >' +       //so wird ein Ticket nach dem Userinput aussehen
            '<h6 style =" color:white"> ' + id + '</h6>' +
            '<p style =" color:white"><span class="glyphicon glyphicon-user" style =" color:white"></span> ' + verfasser + '</p>' +
            '<h3 style="color:white" >' + titel + '</h3>' +
            '<h3 style =" color:white">' + datum + '</h3>' +
            '<h3 style =" color:white">' + beschreibung + '</h3>' +
            '<p style =" color:white"><span class="glyphicon glyphicon-time" style =" color:white"></span> ' + priorität + '</p>' +
            '<p><span class="label label-success">' + status + '</span></p>' +
            '<a href="#" onclick="deleteIssue(\'' + id + '\'); return false;" class="btn btn-danger">Löschen</a>' +
            '<a href="#" onclick="updateToggle(\'' + id + '\')" class = "btn btn-primary">Bearbeiten</a>' +
            '</div>');
    
        }
      }
    });

  }
});
