# net-buffer
Fast buffer (message) passing over network socket for Nodejs. On my Mac Air 2012 with i3 CPU, a single core/process containing both server and client can encode->send->receive->decode ~100,000 empty messages per second.

## .encode([Buffer])
encode can accept `Buffer` or `undefined`. Max Buffer length is limited by 16 bit unsigned int, so 65,535 bytes (65.5KB), to increase max length fork and change 16 bit to 32. 
```
var encode= require('net-buffer').encode
encode() // decoder will receive an undefined Buffer
encode( new Buffer('Hello World!') )
```

## .decode(socket, callback[, bodyOnly])
It directly reads from the socekt without using the socket.on('data', ) event.
```
var net= require('net')
var decode= require('net-buffer').decode
net.createServer(function(socket)
{
	socket.on('readable', decode(socket, function(body){
	    console.log( body? body.toString(): 'body is undefined')
	}, true))
}).listen(8181)
```
* __socket__ Socket
* __callback__ Function, called with a single Buffer argument
* __bodyOnly__ Boolean, Optional, Default true; Set to false to get body prefixed with length (can reuse Buffer when need to proxy the Buffer)

## Installation
```
npm install net-buffer
```