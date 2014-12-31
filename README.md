# net-buffer
Performance oriented binary messaging over network for Nodejs. A single core/process on a Mac Air 2012 with i3 CPU containing both server and client can encode->send->decode ~100,000 empty messages per second over a TCP socket.

## .encode([Buffer])
encode can accept `Buffer` or `undefined`. Max Buffer length is limited by 16 bit unsigned int, so 65,535 bytes (65.5KB), to increase the limit fork and change to 32 bit.
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
	socket.on('readable', decode(socket, function(buffer){
	    console.log('buffer is', buffer? buffer.toString(): undefined)
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