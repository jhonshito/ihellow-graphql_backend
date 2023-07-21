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
const { sendCorreo } = require('../constantes/auth/sendCorro');
const { update_pass } = require('../constantes/auth/UpdatePass');
const { add_img_landing } = require('../constantes/landing/addImg');
const { registe_google } = require('../constantes/auth/registeGoogle');
const { all_users } = require('../constantes/auth/allusers');
const { all_landing } = require('../constantes/landing/all_landing');
const { alias_landing } = require('../constantes/landing/traerAlisLanding');

const router = Router();

// rustas auth
router.post('/register', register);
router.post('/login', login);
router.post('/add_foto/:id', add_foto);
router.get('/data_user/:id', find_user);
router.put('/update_profile', update_usuario);
router.post('/send_email', sendCorreo);
router.put('/update_pass', update_pass);
router.post('/register_google', registe_google);
router.get('/all_users', all_users);

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
router.post('/add_img_landing/:id', add_img_landing);
router.get('/all_landing', all_landing);
router.get('/alias_landing/:id', alias_landing);

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

// router.get('/auth/instagram', (req, res) => {
//     const clientId = '3547632535556841';
//     const redirectUri = 'http://localhost:5000/auth/instagram/callback';
//     const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

//     console.log(authUrl)
//     res.redirect(authUrl);
// })

// router.get('/auth/instagram/callback', async (req, res) => {
//     const code = req.query.code;
//     const clientId = '3547632535556841';
//     const clientSecret = '63b095be278a970ed10cb2370a474348';
//     const redirectUri = 'http://localhost:5000/auth/instagram/callback';
  
//     try {
//       const response = await axios.post('https://api.instagram.com/oauth/access_token', {
//         client_id: clientId,
//         client_secret: clientSecret,
//         grant_type: 'authorization_code',
//         redirect_uri: redirectUri,
//         code: code,
//       });
  
//       // Aquí puedes procesar la respuesta de Instagram y hacer lo que desees con los datos del usuario
  
//       res.send(response.data);
//     } catch (error) {
//       console.error('Error al obtener el token de acceso de Instagram:', error.message);
//       res.status(500).send('Error al obtener el token de acceso de Instagram');
//     }
//   });


module.exports = router