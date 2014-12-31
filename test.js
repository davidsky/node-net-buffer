var encode= require('./index').encode
var decode= require('./index').decode
var net= require('net')

var time, messages= 100000
net.createServer(function(socket)
{
	var received= 0

	socket.on('readable', decode(socket, function(buffer)
	{
		if( ++received===messages )
		{
			var diff = process.hrtime(time)
			console.log('sent & received', messages,'messages;', diff[0]+'.'+diff[1], 'seconds')
	   		console.log('last buffer is', buffer? buffer.toString(): undefined)
		}
	}))

}).listen(8181)

var client= net.connect({port: 8181}, function()
{
	time= process.hrtime()
	for(var i= 0, max= messages; max>i; ++i)
		client.write( encode() )
		// client.write( encode(new Buffer('Hello World!')) );
});