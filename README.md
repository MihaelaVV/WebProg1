# Beschreibung

PoC eines Ticketing-Systems

Es handelt sich um eine Anwendung, die für eine WebProgrammierung-Vorlesung entwickelt wurde.    
Die Anwendung verfügt über die einzelnen CRUD-Operationen.

# QuickStart
1. git http location https://github.com/MihaelaVV/WebProg1.git
2. download the project 
3. open the project in vs code <br>
4. npm install
5. express install
6. npm start
7. go to http://localhost:3000
8. Username : wwi2018d
9. Password : dhbw

# Architektur

Es handelt sich um eine HTML-CSS-JS Anwendung.   
Das FrontEnd und das BackEnd interagieren miteinanders mittels Fetch API.    
Die HTML-Struktur der Webseite kommuniziert mit entsprechenden CSS-Dateien, um ein vernünftiges Design darzustellen.       


# Datenmodell

[ {
    "id":0, "titel":"Ticket Nr1", "beschr": "Ticketbeschreibung", "verf" : "Verfasser", "dat": "2019-10-12", "prior" : "hoch", "stat": "Nicht erledigt"
}]

# Inhalt

REST API mit Node.js und Express

# Frontend
-	Durchlaufende Menü-Bar für jede Ansicht, Navigationsfunktion
-	Startseite mit Logo und Programmnamen
-	SocialMedia zum Abruf weiterer Informationen der Creator
-	Log-in-Maske zur Verifizierung des Benutzers
 o	Weiterleitung nach Anmeldung
 o	Hinweis auf Datenschutzerklärung
 o	Erzeugen von Tickets
 o	Bei Abmeldung werden sämtliche Tickets gespeichert und für eine spätere Bearbeitung zur Verfügung gestellt
 o	Abruf von Tickets über „Tickets anzeigen“ -Button
-	Informationen zu verwendeten Tools
-	Impressum mit allen relevanten Informationen zur Benachrichtigung der Creator, Haftungserklärung
-   Zugriff auf das BackEnd mittels fetch API

# Durchlaufene Tests
-	Mögliche Navigation durch die Menü-Bar
-	Abrufbare Links zur Erreichung von SocialMedia
-	Möglichkeit der Benutzeranmeldung
-	Benutzeranlage
-	Sichtbarkeit des Passworts
-	Sichere Übertragung der Benutzerdaten
-	Weiterleitung auf entsprechende GUI’s
-	Popups bei Fehlverhalten des Benutzers
-	Sichtbarkeit der Tickets
-	Hinzufügen, Bearbeiten und Abspeichern von Tickets

