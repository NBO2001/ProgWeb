const http = require('http');
const fs = require('fs');

if (process.argv.length <= 2) {
    console.log("Por favor, forneça o nome do diretório como argumento.");
    process.exit(1);
}

const directory = process.argv[2];

const server = http.createServer((req, res) => {
    fs.readdir(directory, (err, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro ao ler o diretório.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<ul>');
            for (const file of files) {
                res.write(`<li>${file}</li>`);
            }
            res.write('</ul>');
            res.end();
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
