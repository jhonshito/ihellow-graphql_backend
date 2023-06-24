const { Router } = require('express');
const { login } = require('../constantes/auth/login');
const { nuevo_boton } = require('../constantes/botonFuncion/addClicks');
const { estadistica_service } = require('../constantes/botonFuncion/estadisticas');
const { lista_service } = require('../constantes/botonFuncion/listaService');
const { datos_metricas } = require('../constantes/botonFuncion/metricas');
const { register } = require('../constantes/auth/register');
const { addLanding } = require('../constantes/landing/addLanding');
const { addCard } = require('../constantes/card/ihellowCard');
const { add_foto } = require('../constantes/auth/add_foto');
const { all_cards } = require('../constantes/company/cardList');
const { list_card_by_id } = require('../constantes/card/listCardById');
const { list_landing_by_id } = require('../constantes/landing/listLandingById');
const { lis_campany_by_id } = require('../constantes/company/listCompanyById');

const router = Router();

// rustas auth
router.post('/register', register);
router.post('/login', login);
router.post('/add_foto/:id', add_foto);

// rutas botones
router.post('/metricas', datos_metricas);
router.post('/agregar_boton', nuevo_boton);
router.post('/lista_service', lista_service);
router.post('/estadistica', estadistica_service);

// rutas landing
router.post('/add_landing', addLanding);
router.get('/listLandingById/:id', list_landing_by_id);

// ruta card
router.post('/add_card', addCard);
router.get('/listCardById/:id', list_card_by_id);

// rutas company
router.post('/company/cards', all_cards);
router.get('/dataCompanyByInd/:id', lis_campany_by_id);


module.exports = router