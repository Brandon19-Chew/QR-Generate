# QR-Generate
Develop QR-Generate based on the website link provided.

# How it works ? 
Simple breakdown of how your QR code generator works:

1. The Frontend 

- Real-time Interface: Built with React, the website listens to every keystroke in the input box.
- QR Generation: It uses a library called qrcode.react to convert your text or URL into a high-quality QR image instantly.
- Debouncing: To keep things smooth, the app waits a split second after you stop typing before saving the link to your history. This prevents the database from getting cluttered with half-finished links.
- Dark Mode: The design uses Tailwind CSS with a dark-first color scheme, ensuring a professional look that's easy on the eyes.

2. The Backend

- API Routes: When you create a code, the frontend sends a request to a Node.js/Express server.
- Database: We use a PostgreSQL database to store your generation history. This is why you can see your "Recent Codes" even if you refresh the page.
- Storage Layer: I've implemented a "Storage" interface that handles saving and retrieving your data efficiently.
  
3. Key Actions

- Generate: Just type. The QR code updates live on the screen.
- Download: When you click "Download," the app captures the QR code from the screen and saves it as a .png file to your computer.
- History: Every unique link you generate is saved automatically. You can view your past creations in the "Recent" section and delete them if they are no longer needed.

# Website Image
Generate the QR code !


<img width="556" height="347" alt="image" src="https://github.com/user-attachments/assets/a787645f-e705-4d10-92f0-f26a4a085ce4" />






History generate QR code !

<img width="221" height="244" alt="image" src="https://github.com/user-attachments/assets/1440c90c-96f2-430b-8b93-9dba99d8c2c5" />



# Link Demo/Test
LINK ---> https://qr-code-maker--chewbrandon9911.replit.app/

- I am not sure that this link above is permanent or not. 
- If click then nothing pop up or just a black or white page, means that the link is expired.



# ⚠️ Note 

- If plan to do this project, then encounter error, settle by yourself with AI help.  




