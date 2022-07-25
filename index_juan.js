const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.Port || 8080;
const hbs = require('hbs');
const mysql = require('mysql2');
const path = require('path');
const nodemailer  = require('nodemailer');

// Conectamos a una Base de Datos
/* const conexion  = mysql.createConnection({
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
    port:process.env.PORTDB,
}); */

/* conexion.connect((err)=>{
    if(err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId)
});
 */

//Conectamos la DataBase
/* const conectar = async(
    await conexion.connect((error)=>{
        if(error) throw error;
        console.log('Base de Datos Conectada!!');
    })
); */

//Configuración de Middelwares
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:false}));

//Configurar la vista de la Aplicación
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

/* app.get('/', (req, res) =>{
    res.send('Nos estamos conectando a una Base de Datos');
}); */

app.get('/', (req, res) =>{
    res.render('index', {titulo:'Bienvenidos a uestra App'})
});

app.get('/html', (req, res) =>{
    res.render('index', {titulo:'Bienvenidos a uestra App'})
});

app.get('/productos', (req, res) =>{
    res.render('productos', {titulo:'Te muestro los productos'})
});


/* app.get('/formulario', (req, res) =>{
    res.render('formulario', {titulo:'Formulario para Completar'})
}); */

app.get('/formulario', (req, res) =>{
    res.render('formulario', {titulo:'Formulario para Completar'})
});

//verbo http para recibir datos
app.post('/formulario',(req,res)=>{
    console.log(req.body);
    const {nombre,precio,descripcion} = req.body;
    //validación básoca
    if (nombre == "" || precio == "") {
        let validacion = 'Faltan datos para ingresar el producto';
        res.render('formulario', {titulo:'Formulario para Completar', validacion})
    } else {
        res.render('formulario', {titulo:'Formulario para Completar'})
    }

});

/* app.post('/formulario',(req,res)=>{

    console.log(req.body);
    const{nombre,precio,descripcion}= req.body;

    //validacion basica
    //if(nombre ==""|| precio==""){
        let validacion='Faltan datos para ingresar el producto'

        res.render('formulario',{titulo: 'Formulario para completar'})
    //}else{
        console.log(req.body.nombre);
        console.log(req.body.precio);
        console.log(req.body.descripcion);
        res.render('formulario',{titulo:'Formulario para completar'})
    //}
}); */

app.get('/login', (req,res)=>{
    res.render('login', {titulo:'Ingrese sus datos para  el Login'});
});

app.post('/login', (req,res) =>{
    console.log(req.body);
    res.send('Tus datos son correctos');

});

app.get('/contacto', (req, res) =>{
    res.render('contacto', {titulo:'Escríbenos'})
});


app.listen(Port, ()=>{
    console.log(`Servidor corriendo en el Puerto ${Port}`);
});

app.on('error',(error) =>{
    console.log(`Tenemos un error ${error}`);
}); 

