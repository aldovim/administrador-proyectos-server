const express = require('express');
const bodyParser = require('body-parser');
const serverApp = express();
const port = 3000;

const USUARIOS = [];

serverApp.use(bodyParser.json())
serverApp.use(bodyParser.urlencoded({ extended: true }))

// Servicio Login
serverApp.post('/login', (request, response) => {
    var email = request.body.email;
    var password = request.body.password;

    var usuarioExistente = USUARIOS.filter(usuario => (usuario.password == password && usuario.email == email));

    if (usuarioExistente.length === 1) {
        console.log('El usuario con email: ' + email + ' inicio sesion correctamente')
        response.status(200).json(usuarioExistente[0]);
    } else {
        console.log('Usuario y/o contraseña incorrecta de email: ' + email)
        response.status(404).json({})
    }
})

// Servicio para registro
serverApp.post('/register', (request, response) => {
    var email = request.body.email;
    var telefono = request.body.telefono;
    var nombreEmpresa = request.body.nombreEmpresa;
    var password = request.body.password;

    var usuariosExistentes = USUARIOS.filter(usuario => usuario.email == email);

    if(
        email == "" || typeof email == 'undefined'
        || telefono == "" || typeof telefono == 'undefined'
        || nombreEmpresa == "" || typeof nombreEmpresa == 'undefined'
        || password == "" || typeof password == 'undefined'
    ) {
        response.status(400).json("El usuario introdujo datos incorrectos: " + JSON.stringify(request.body));
    } else if (usuariosExistentes.length > 0) {
        response.status(400).json("El email ya existe");
        console.log('Error al registrar el usuario, el email: ' + request.body.email + ' ya esta registrado')
    } else {
        USUARIOS.push(request.body);
        response.status(204).json(usuariosExistentes[0]);
        console.log('Usuario registrado correctamente con email: ' + request.body.email)
    }
});


// Inicializa el la aplicacion en el servidor en el puerto especificado
serverApp.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
