const net = require('net');
const fs = require('fs');
const port = 8124;
const client = new net.Socket();
const reqRemote = 'REMOTE';
const goodResp = 'ACK';
const badResp = 'DEC';
const res = 'NEXT';
let count = 0;

client.setEncoding('utf8');

client.connect(port, () => {
    console.log('Connected');
    client.write(reqRemote);
});

client.on('data', (data) => {
    console.log(data);
    if (data === badResp) {
        client.destroy();
    } else if (data === goodResp) {
        count++;
        switch (count) {
            case 1:
                sendCOPY();
                break;
            case 2:
                sendENCODE();
                break;
            case 3:
                sendDECODE();
                break;
            case 4:
                client.destroy();
        }
    }
});

function sendCOPY() {
    client.write('COPY D:/study3course/CWP/cwp-04/cwp-04/original.txt D:/study3course/CWP/cwp-04/cwp-04/copy.txt');
}

function sendENCODE() {
    client.write('ENCODE D:/study3course/CWP/cwp-04/cwp-04/original.txt D:/study3course/CWP/cwp-04/cwp-04/encode.txt 123');
}

function sendDECODE() {
    client.write('DECODE D:/study3course/CWP/cwp-04/cwp-04/encode.txt D:/study3course/CWP/cwp-04/cwp-04/decode.txt 123');
}
client.on('close', function() {
    console.log('Connection closed');
});