import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../utils/config.js";
import { buscarPorEmailConPasswordService, crearUsuarioService, datosPublicosUsuario } from "./usuarioService.js";
import { ErrorApp } from "../utils/ErrorApp.js";

const firmarToken = (usuario) => {  
  return jwt.sign({ id: usuario._id, rol: usuario.rol }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};


export const registrarService = async ({ nombre, apellido, email, password } = {}) => {
  const usuario = await crearUsuarioService({ nombre, apellido, email, password });

  return {
    usuario: datosPublicosUsuario(usuario),
    token: firmarToken(usuario),
  };
};

export const loginService = async ({ email, password } = {}) => {
  if (!email || !password) {
    throw new ErrorApp("Faltan el email y/o la contraseña", 400);
  }

  const usuario = await buscarPorEmailConPasswordService(email);

  if (!usuario || !(await usuario.compararPassword(password))) {
    throw new ErrorApp("Email o contraseña incorrectos", 401); //error Unauthorized
  }
  return {
    usuario: datosPublicosUsuario(usuario),
    token: firmarToken(usuario),
  };
};
