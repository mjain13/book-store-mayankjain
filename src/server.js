let path = require('path');
let http = require('http');

let express = require('express');
let app = express();

let server = http.createServer(app);
let PORT = process.env.PORT || 3004;

app.use((req, res, next)=> {
	console.log(`Route '${req.url}' is executed;`);
	next();
});

app.get('/name',(req, res)=> {
	res.send({
		fname: 'Suyash',
		lname: 'Kale'
	});
});

app.use(express.static(path.join(__dirname, 'build')));

server.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT};`);
});
