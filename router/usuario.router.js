const router = require('express').Router();
const usuario = require('../controller/usuario.controller');


//definição de todas as rotas 

//Get para localizar um unico usuário através do ID.
router.get('/find/:id', usuario.find);

//Get para mostrar todos os usuários cadastrados.
router.get('/findAll', usuario.findAllUsuarios);

//Post para criar novo usuário.
router.post('/create', usuario.createUsuario);

//Put para atualizar um usuário existente através de um ID.
router.put('/update/:id', usuario.updateUsuario);

//Delete para remover da base de dados um usuário identificado por seu ID.
router.delete('/delete/:id', usuario.deleteUsuario);

module.exports = router;