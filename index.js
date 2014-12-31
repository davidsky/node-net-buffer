'use strict';

// net-message
exports.decode= function(socket, callback, bodyOnly)
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
			else if( null===(lengthBuffer= socket.read(2)) )
				return
			else
				length= lengthBuffer.readUInt16BE(0, true)

			if( length>2 && null===(body= socket.read(length-2)) )
				return nextLength= length
			
			if( false===bodyOnly )
				body= Buffer.concat([byteLength, body], 2 + length)

			callback(body)
		}
	}

	return decode
}

var invalidMessageError= new Error('Invalid message, must be of type undefined or buffer')
var messageLengthError= new Error('Invalid message, must be under 65,535 bytes')

exports.encode= function(message)
{
	if( undefined===message ){
		var buffer= new Buffer(2)
	}
	else if( Buffer.isBuffer(message) )
	{
		if( message.length > 65535 )
			throw messageLengthError;
		var buffer= new Buffer(2 + message.length)
		message.copy(buffer, 2)
	}
	else{
		throw invalidMessageError
	}
	
	buffer.writeUInt16BE(buffer.length, 0)

	return buffer
}