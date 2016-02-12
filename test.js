var encode= require('./index').encode
var decode= require('./index').decode
var net= require('net')

var time
var messages= parseInt(process.argv[2]) || 100
var received= 0
var data= new Buffer('hello')

function onMesssage(buffer)
{
	if( ++received===messages )
	{
		var diff = process.hrtime(time)
		console.log( (''+buffer===''+data? 'ok': 'error'), 'sent and received', messages, 'messages in', diff[0]+'.'+diff[1], 'seconds')
   		process.exit()
	}
}

net.createServer(function(socket)
{
	socket.on('readable', decode(socket, onMesssage))

}).listen(8181)

var client= net.connect({port: 8181}, function()
{
	time= process.hrtime()
	for(var i= 0, max= messages; max>i; ++i)
		client.write( encode(data) )
});