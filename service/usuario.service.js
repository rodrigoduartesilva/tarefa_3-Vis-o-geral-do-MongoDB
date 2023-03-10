const Usuario = require('../model/usuario');

const findByIdUsuario = (id) => {
    return Usuario.findById(id);
}

const findAllUsuario = () => {
    return Usuario.find();
}

const createUsuario = (usuario) => {
    return Usuario.create(usuario);
}

const updateUsuario = (id, usuario) => {
    return Usuario.findByIdAndUpdate(id, usuario, { returnDocument: "after" });
}

const deleteUsuario = (id) => {
    return Usuario.findByIdAndRemove(id);
}

module.exports = {
    findByIdUsuario,
    findAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}