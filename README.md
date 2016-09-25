# GraMusic
Mashup web application using the Node.js   
## Configuration and deployment:  
   
### 0.Directory structure:   
```
├── Crawler/   
|   ├── crawler.py   
|   └── getId.php
├── GraMusic/   
|   ├── bin/   
│   ├── public/
|   ├── routes/   
|   └── views/   
├── app.js   
├── index.html   
├── package.json   
├── XML/   
|   ├── musicInfo.xml   
|   └── musicInfo.xsd   
└── README.md   
```
### 1.Project supplement: 
  1. The [Crawler] directory contains the source code to grab music information from Netease Music.   
  2. The [GraMusic] directory contains the web application source code, which consists of node.js server and static html.   
  3. The [XML] directory contains the XML and XML schema.   

### 2.Configuration and deployment(for windows):
  1. Install node.js   
  2. Find the root directory and right click the directory, choose the command <pre><code>Git Bash Here</code></pre>   
  3. Enter the node.js server directory: <pre><code>cd GraMusic</code></pre>      
  4. Run <pre><code>npm install</code></pre>   
  5. Open the browser and input the URL: <pre><code>localhost:3000</code></pre>
  6. You must login then you can see the home page, the <b>username</b> is <b>admin</b> and the <b>password</b> is <b>123456</b>  

## Q&A   
* 1.You need to use your Netease Music's username and password to simulate landing.   
* 2.The data I used was pretreated because the data's amount is very large. If you want to deal with the data at client or server, it will be very slow. So, the data is not the newest. So if you want to update, please run the <b>getId.php</b> and <b>crawler.py</b> in the [Crawler] directory.   
