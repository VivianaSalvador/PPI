const express = require('express');
const app = express();
const puerto = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Middleware para manejar datos del formulario

const datosGatos = [
   
];

// Función para calcular la edad en años humanos
function calcularEdadHumana(edadGato) {
    // Fórmula aproximada para calcular la edad de los gatos en años humanos
    return Math.round(15 + (edadGato - 1) * 4);
}

app.get('/', (req, res) => {
    res.render('index', { gatos: datosGatos });
});

// Nueva ruta para la calculadora de edad de gatos
app.get('/calculadora', (req, res) => {
    res.render('calculadora', { gatos: datosGatos, calcularEdadHumana });
});

// Ruta para manejar el formulario y agregar nuevos gatos
app.post('/agregar-gato', (req, res) => {
    const nombre = req.body.nombre;
    const edad = parseInt(req.body.edad);

    // Validación básica de entrada
    if (nombre && !isNaN(edad)) {
        datosGatos.push({ nombre, edad, descripcion: `Un nuevo gato de ${edad} años.` });
    }

    // Redirige de nuevo a la página de calculadora
    res.redirect('/calculadora');
});

app.listen(puerto, () => {
    console.log(`La aplicación está escuchando en http://localhost:${puerto}`);
});
