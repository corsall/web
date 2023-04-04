const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    if(request.url === "/"){

        fs.readFile("results-summary-component/index.html", (error, data) => {
            if (error) {
              response.writeHead(500);
              response.end(error.message);
            }
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(data);
        });

    } else if(request.url === '/styles.css'){

        fs.readFile("results-summary-component/styles.css", (error, css) => {
            if (error) {
              response.writeHead(500);
              response.end(error.message);
            }
            response.setHeader('Content-Type', 'text/css');
            response.end(css);
        });

    } else if(request.url.match("\.svg$")){

        fs.readFile(`results-summary-component/${request.url}`, (error, img) => {
            if (error) {
              response.writeHead(500);
              response.end(error.message);
            }
            response.writeHead(200, {"Content-Type": 'image/svg+xml'});
            response.end(img);
        });

    } else if(request.url === "/summary"){

        response.writeHead(200, {"Content-Type": "application/json"})
        response.end(summary());
        
    } else if(request.url === "/main.js"){

        fs.readFile("results-summary-component/main.js", (error, js) => {
            if (error) {
              response.writeHead(500);
              response.end(error.message);
            }
            response.setHeader('Content-Type', 'text/javascript');
            response.end(js);
        });

    }
    else{
        response.statusCode = 404;
        response.end('Page not found.');
    }
});


function summary(){
    const result = {
        'reaction': Math.floor(Math.random() * (61)) + 40,
        'memory':   Math.floor(Math.random() * (61)) + 40,
        'verbal':   Math.floor(Math.random() * (61)) + 40,
        'visual':   Math.floor(Math.random() * (61)) + 40
    }
    return JSON.stringify(result);
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});