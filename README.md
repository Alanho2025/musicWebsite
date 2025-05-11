Title: Personal music website
Start Date: 4th May
Why did I make this website?
1.	I would like to practice more Svelte with several functions.
2.	Music is a main and familiar topic that includes album details, sales, and playing, so I can combine all the stuff together.
3.	I also want to practice layout, which may help me to do well in designing the final project.

MVP – Version 1.0
Start Date: 4th May     End Date: 9th May
This MVP includes the following features:
•	Homepage
Features a top navigation bar and three primary functions with links to:
o	Album Details
o	Player List
o	Buy Album
•	About Page
Introduces the site logo and key features. Future version-specific updates (e.g., V1.1) will also be documented here.
•	Album List
Displays a set of artist tags at the top for filtering. Selecting an album card reveals more details:
o	Publishing year
o	Associated tags
o	Main songs in the album
•	Music Player
o	Use the playback bar to listen to songs.
o	Press the heart icon to add a song to favorites.
o	Click an artist tag to explore more of their music.
o	Navigation buttons:
	"Next" plays the next song
	"Previous" returns to the previous page
o	Like system: increment count by clicking the like button
o	Comment system: supports posting and replying to comments
•	Buy Album
o	Use + or – buttons or manually enter a quantity to select how many albums to buy
o	The shopping cart displays selected albums and calculates the total price
o	Clicking "Buy" will navigate to the purchase page (sign-in required)
•	User Authentication
o	Sign Up: Allows new users to create an account
o	Sign In: Authenticates user credentials from the database and updates the interface to user mode (displays user profile image and logout button)
o	Admin View: Admin login reveals a backend user list with account names and IDs to verify successful registrations

Next version expectation:
1.	The album list webpage details should include related songs in the albums
2.	The music player webpage should include other newly added songs
3.	The music player webpage sidebar will have the selection on the top to do the sorting by artist or song name
4.	Comments should include three layers
5.	Should also add the unlike system
6.	Complete buy page – enter account name/bank name / reference … and then print pay successfully, clean the cart value.
7.	Refine Sign in page – sign in password should be password form (but can use eye image to make it show up)
8.	Refine Sign up page – password part can put a eye image button to see the word or not
9.	Add SHE / Jolin / Friday / Jay album and add other album songs in the original store file
10.	Make Song Store API GET / POST / PATCH
11.	Modify cookie to handle user part

