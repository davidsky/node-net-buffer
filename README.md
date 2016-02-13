# net-buffer
Very fast message length-prefixing encoder and decoder.

## .encode([Buffer])
encode can accept `Buffer` or `undefined`

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


## .setMaxMessageLength(number)
Defines the maximum supported message length (header), valid values are 2 (for 65,135 bytes) and 4 (for 4,294,967,196 bytes), default is 2.
```js
var netBuf= require('net-buffer')
netBuf.setMaxMessageLength(4)
```

## Benchmark
Below is Mac Air 2013 results
```shell
 $ node test.js 100000
 $ > ok sent and received 100000 messages in 0.786218543 seconds
```


## Installation
```
npm install net-buffer
```
---
MIT License