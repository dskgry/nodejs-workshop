# Outline

1. "Was Euch erwartet"
2. Intro
3. Speaker
4. Timeline
5. Agenda
6. Web APIs im Allgemeinen
	1. Moderne Applikationsarchitektur
	2. "REST does not model real world"
	3. UseCase basierte Interfaces 
	4. Applikationspush (Socket.io, SignalR)
7. Intro zu Cross Plattform
	1. Was bedeutet es?
	2. Warum ist es wichtig?
	3. Bezug zur modernen Applikationsarchitektur
	4. Spotify/Google Docs Sample
8. Vorstellung WebStack
	1. HTML5
	2. CSS3
	3. JavaScript
9. Intro zu React
	1. Was ist es?
	2. Stärken/Schwächen
	3. Alternativen
10. Vorstellung Demo
11. Node.js
	1. Was ist es?
	2. Stärken/Schwächen
	3. Event Loop
	4. Alternativen 
	5. Restify
		1. Aufgaben
			0. JavaScript Übung
				* FatArrow
				* AsyncAwait/Promises
				* const/let
				* ES Next
				* Module
			1. Eigener Server mit Restify erstellen
			2. Eigene "Hello-World" Ressource
	6. Testing
		1. Aufgaben
			1. TweetService
				* TN bauen getTweet und createTweet (in Memory)
				* Testing
			2. TweetResource
				* TN bauen Tweet Ressource selbst
	7. Security
		1. Aufgabe
			1. Eigene Middleware für Abfrage eines API-Keys im Authorization Header
	8. Push
		1. Socket.io
	9. Datenbankzugriff generell
		1. NoSQL/SQL
		2. ORMs (SequelizeJS, TypeORM)
12. RethinkDB
	1. Was ist es? (Database.js vorstellen)
	2. Stärken/Schwächen
	3. Alternativen
	4. Aufgaben
		1. TweetService umbauen, sodass er die RethinkDB benutzt
			* TN benutzen bestehenden Tweet Service für Streaming
			* TN bauen createTweet, countTweet und getTweet Methoden
13. Ausblick: PWA
14. Outro
