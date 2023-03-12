const router = require('express').Router();
const usuarioGet = require('../controller/usuarioGet.controller');
const usuarioPost = require('../controller/usuarioPost.controller');
const usuarioPut = require('../controller/usuarioPut.controller');
const usuarioDelete = require('../controller/usuarioDelete.controller');


//definição de todas as rotas 

//Get para localizar um unico usuário através do ID.
router.get('/find/:id', usuarioGet.find);

//Get para mostrar todos os usuários cadastrados.
router.get('/findAll', usuarioGet.findAllUsuarios);

//Get para testar o formato fo token criado
router.get('/teste-token', usuarioGet.testeTokenUsuario);

//Post para criar novo usuário.
router.post('/create', usuarioPost.createUsuario);

//Post para realização do login
router.post('/login', usuarioPost.loginUsuario);

//Put para atualizar um usuário existente através de um ID.
router.put('/update/:id', usuarioPut.updateUsuario);

//Delete para remover da base de dados um usuário identificado por seu ID.
router.delete('/delete/:id', usuarioDelete.deleteUsuario);

module.exports = router;