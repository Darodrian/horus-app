<<<<<<< HEAD
const   express         = require('express'),
        dbOperation     = require('./dbFiles/dbOperation'),
        cors            = require('cors');


const API_PORT = process.env.PORT || 5000;
const app = express();


let client;
let session;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/api', async( req, res) => {
    console.log('called');
    const result = await dbOperation.getCajas();
    res.send(result.recordset);
});

app.get('/apiTorta', async( req, res) => {
    console.log('called');
    const result = await dbOperation.getCajasTorta();
    res.send(result.recordset);
});

app.post('/obtenerCaja', async (req, res) =>{
    console.log('called');
    const result = await dbOperation.obtenerCaja(req.body.caja);
    res.send(result.recordset);
});




dbOperation.getCajas().then(res => {
    console.log(res);
})


app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));
=======
const   express         = require('express'),
        dbOperation     = require('./dbFiles/dbOperation'),
        cors            = require('cors');


const API_PORT = process.env.PORT || 5000;
const app = express();


let client;
let session;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/api', async( req, res) => {
    console.log('called');
    const result = await dbOperation.getCajas();
    res.send(result.recordset);
});

app.get('/apiTorta', async( req, res) => {
    console.log('called');
    const result = await dbOperation.getCajasTorta();
    res.send(result.recordset);
});

app.post('/obtenerCaja', async (req, res) =>{
    console.log('called');
    const result = await dbOperation.obtenerCaja(req.body.caja);
    res.send(result.recordset);
});




dbOperation.getCajas().then(res => {
    console.log(res);
})


app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));
>>>>>>> horus-grafico1
