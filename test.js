var encode= require('./index').encode
var decode= require('./index').decode
var net= require('net')

var time, messages= 100000, data

net.createServer(function(socket)
{
	var received= 0

	socket.on('readable', decode(socket, function(buffer)
	{
		if( ++received===messages )
		{
			var diff = process.hrtime(time)
			console.log('sent and received', messages,'messages in', diff[0]+'.'+diff[1], 'seconds')
	   		console.log(''+buffer===''+data? 'ok': 'error')
		}
	}))

}).listen(8181)

var client= net.connect({port: 8181}, function()
{
	time= process.hrtime()
	data= undefined
	// data= new Buffer('Hello World!')
	for(var i= 0, max= messages; max>i; ++i)
		client.write( encode(data) )
});