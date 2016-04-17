# GraMusic
Mashup web application   
## Configuration and deployment:  
   
* ### 0.Directory structure:      
    — — SOA-GraMusic   
    |   
    — — — — Crawler   
    |   
    — — — — — — crawler.py   
    |   
    — — — — — — getId.php   
    |   
    — — — — GraMusic  
    |   
    — — — — — — bin   
    |   
    — — — — — — public   
    |   
    — — — — — — routes   
    |   
    — — — — — — views   
    |   
    — — — — — — app.js   
    |   
    — — — — — — index.html   
    |   
    — — — — — — package.json   
    |   
    — — — — XML   
    |   
    — — — — — — musicInfo.xml   
    |   
    — — — — — — musicInfo.xsd   
    |    
    — — — — README.md   

* ### 1.Project supplement(for windows): 
  1. The [Crawler] directory contains the source code to grab music information from Netease Music.   
  2. The [GraMusic] directory contains the web application source code, which consists of node.js server and static html.   
  3. The [XML] directory contains the XML and XML schema.   

* ### 2.Configuration and deployment:
  1. Install node.js   
  2. Find the root directory and right click the directory, choose the command <pre><code>Git Bash Here</code></pre>   
  3. Enter the node.js server directory: <pre><code>cd GraMusic</code></pre>      
  4. Run <pre><code>npm install</code></pre>   
  5. Open the browser and input the URL: <pre><code>localhost:3000</code></pre>
  6. You must login then you can see the home page, the <b>username</b> is <b>admin</b> and the <b>password</b> is <b>123456</b>   

