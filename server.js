const http = require('https');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Bestimme den Pfad zur angeforderten Datei
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Standarddatei
    }

    // Bestimme den Dateityp
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm',
        '': 'application/octet-stream' // Fallback
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Lese die angeforderte Datei
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Datei nicht gefunden</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Serverfehler: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Server auf Port 3000 starten
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});

