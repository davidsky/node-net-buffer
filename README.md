# net-buffer
Length prefixed fast binary messaging over network with Nodejs. 

## .encode([Buffer])
encode can accept `Buffer` or `undefined`. Max Buffer length is limited to 65,535 bytes (65.53KB).

```js
var net= require('net')
var netBuf= require('net-buffer')

var client= net.connect({port: 8181}, function()
{
    client.write( netBuf.encode(undefined) ) // or just .encode()
    client.write( netBuf.encode( new Buffer('Hello World!') ) )
})
```

## .decode(socket, callback[, bodyOnly])
decode directly reads from the socekt without using the socket.on('data', ) event.
```js
var net= require('net')
var decode= require('net-buffer').decode

net.createServer(function(socket)
{
	socket.on('readable', decode(socket, function(buffer){
	    console.log(buffer)
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
---
MIT License