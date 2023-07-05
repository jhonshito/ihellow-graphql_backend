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
const { find_user } = require('../constantes/auth/findUser');
const { grafica } = require('../constantes/botonFuncion/grafica');
const { add_img_card } = require('../constantes/card/addImg');
const { update_card } = require('../constantes/card/updateCard');
const { update_landing } = require('../constantes/landing/updateLanding');
const { update_company } = require('../constantes/company/updateCompany');
const { add_logo_company } = require('../constantes/company/addLogo');
const { update_usuario } = require('../constantes/auth/updateUser');

const router = Router();

// rustas auth
router.post('/register', register);
router.post('/login', login);
router.post('/add_foto/:id', add_foto);
router.get('/data_user/:id', find_user);
router.put('/update_profile', update_usuario);

// rutas botones
router.post('/metricas', datos_metricas);
router.post('/agregar_boton', nuevo_boton);
router.post('/lista_service', lista_service);
router.post('/estadistica', estadistica_service);
router.post('/grafica', grafica);

// rutas landing
router.post('/add_landing', addLanding);
router.get('/listLandingById/:id', list_landing_by_id);
router.put('/update_landing', update_landing);

// ruta card
router.post('/add_card', addCard);
router.get('/listCardById/:id', list_card_by_id);
router.post('/add_img_card/:id', add_img_card);
router.put('/update_card', update_card);

// rutas company
router.post('/company/cards', all_cards);
router.get('/dataCompanyByInd/:id', lis_campany_by_id);
router.post('/add_logo_company/:id', add_logo_company);
router.put('/update_company_card/', update_company);


module.exports = router