# net-message
Fast buffer (message) passing over network socket for Nodejs. On my Mac Air 2012 i3 CPU, a single core/process containing server and client can encode-send-receive-decode around 100,000 empty messages per second.

## .encode(message)
A message can be a `Buffer` or `undefined`. Max message length is limited by 16 bit unsigned int, so 65,535 bytes (65.5KB!), to increase max length: fork and change 16 bit with 32. 
```
var encode= require('net-message').encode
encode() // decoder will receive an undefined message
encode( new Buffer('Hello World!') )
```

## .decode(socket, callback[, bodyOnly])
It directly reads from the socekt without waiting for the on-data event.
```
var net= require('net')
var decode= require('net-message').decode
net.createServer(function(socket)
{
	socket.on('readable', decode(socket, function(body){
	    console.log( body? body.toString(): 'body is undefined')
	}, true))
}).listen(8181)
```
* __socket__ Socket
* __callback__ Function, called with a single argument of type Buffer
* __bodyOnly__ Boolean, Optional, Default true; Set to false to get body prefixed with length (can reuse Buffer when need to proxy the message)

## Installation
```
npm install net-buffer
```