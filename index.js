'use strict';

var headerLength
var maxMessageLength
function setMaxMessageLength(number)
{
	headerLength= number
	maxMessageLength= Math.pow(256, number) - 100
	
	if( number===2 ){
		Buffer.prototype.$netBufferWriteInt= Buffer.prototype.writeUInt16BE
		Buffer.prototype.$netBufferReadInt= Buffer.prototype.readUInt16BE
	}
	else if( number===4 ){
		Buffer.prototype.$netBufferWriteInt= Buffer.prototype.writeUInt32BE
		Buffer.prototype.$netBufferReadInt= Buffer.prototype.readUInt32BE
	}
	else
		throw new Error('Invalid maxMessageLength, must be 2 or 4')
}
setMaxMessageLength(2)
exports.setMaxMessageLength= setMaxMessageLength

function decode(socket, callback, bodyOnly)
{
	var nextLength= 0

	function decode()
	{
		var lengthBuffer, length= 0, body
		for(;;)
		{
			// previously read
			if( length= nextLength )
				nextLength= 0
			// read now
			else if( null===(lengthBuffer= socket.read(headerLength)) )
				return
			else
				length= lengthBuffer.$netBufferReadInt(0, true)

			if( length>headerLength && null===(body= socket.read(length - headerLength)) )
				return nextLength= length
			
			if( false===bodyOnly )
				body= Buffer.concat([byteLength, body], headerLength + length)

			callback(body)
		}
	}

	return decode
}
exports.decode= decode

function encode(message, prefixLength)
{
	prefixLength= prefixLength || 0

	if( undefined===message ){
		var buffer= new Buffer(headerLength + prefixLength)
	}
	else if( Buffer.isBuffer(message) )
	{
		if( message.length > maxMessageLength )
			throw new Error('Invalid message, must be under 65,000 bytes')

		var buffer= new Buffer(headerLength + message.length + prefixLength)
		message.copy(buffer, headerLength + prefixLength)
	}
	else{
		throw new Error('Invalid message, must be of type undefined or buffer')
	}
	
	buffer.$netBufferWriteInt(buffer.length, 0)

	return buffer
}
exports.encode= encode