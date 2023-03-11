const Usuario = require('../model/usuario');
const jwt = require('jsonwebtoken');

const loginService = (email) => Usuario.findOne({ email });

const generateToken = (user, secret) => jwt.sign({ user }, secret);

module.exports = {
    loginService,
    generateToken
};