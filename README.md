# StudentSOS

A web application for students to respond to the instructor's teaching

-----------------------------------------------------------------------------------------------

## About StudentSOS

*   StudentSOS is a web application for students to respond to the instructor's teaching.

*   StudentSOS consists of two pages send out in two different ports. One page is for students at port 5500, and the other page is for the instructor at port 8080.

*   StudentSOS uses cookies on the student's page.

*   ngrok can be used to expose the server for the students to the Internet.

-----------------------------------------------------------------------------------------------

## The Flaws of StudentSOS

*   Each student may be able to vote OK or SOS for more than once for each topic if they clear the cookies or access the student's page from different browsers.

*   The maximum number of connections per minute is 20, but it goes up to 40 after setting up the Authtoken.

*   The public URL for the student's page changes every time ngrok.exe restarts since ngrok could provide only temporary public URLs.

-----------------------------------------------------------------------------------------------

## Commands for running the program

#### In Command Prompt or Terminal at the StudentSOS directory

​​	   Command:    `node app.js`

#### In Command Prompt and Terminal

​​	   Command (Cmd):			`ngrok http 5500 --region=ap`

​​	   Command (Terminal):	`./ngrok http 5500 --region=ap`

**Note:**   In the terminal, you must navigate to the directory of ngrok.exe to run the command above.



#### Instructor's Page

​​	   URL:     http://localhost:8080/

#### Student's Page

​​	   Local URL:	   http://localhost:5500/

​​	   Public URL:	   as given by ngrok (for students)

-----------------------------------------------------------------------------------------------

## To run the program (detailed):

1. In Command Prompt or Terminal, navigate to the StudentSOS directory.

2. Run the command below to fire up the server.

   ​​	Command:    `node app.js`

   After running `node app.js`, you should see the output as shown below.

   ​​	Output:

       	Student server hosting at http://localhost:5500/
               Instructor server hosting at http://localhost:8080/

   Note:

     *	You can check the current version of your node.js by running the command, `node -v`.
    *	You can also download node.js from the website, https://nodejs.org/en/download/.
    *	To terminate the server, press Ctrl+C.

3. Now, open ngrok.exe or command prompt or terminal and run the command below to expose the server to the Internet.

   Command:	`ngrok http 5500 --region=ap`	(Port: 5500, Region: Asia-Pacific)

   You will receive the public URLs where the students can access the web application.

   Note:

    * You can download ngrok.exe for free at https://ngrok.com/download.

   * You can also use other applications to expose the local server to the Internet.

   * To set the ngrok Authtoken for more connections at a time, run the command below in ngrok.exe or command prompt or terminal. You only have to run it once. The Authtoken is saved in the default configuration file.

     ​​	Command (Cmd):			`ngrok authtoken <YOUR_AUTHTOKEN>`<br>
     ​​	Command (Terminal):	`./ngrok authtoken <YOUR_AUTHTOKEN>`

     You can register to get your own Authtoken for free at https://ngrok.com/.

-----------------------------------------------------------------------------------------------
