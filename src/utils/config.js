import dotenv from 'dotenv';

dotenv.config();
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 3000;

//Clave secreta para generar los tokens
const JWT_SECRET = process.env.JWT_SECRET || "secreto-de-clase-no-usar-en-produccion"

//30 minutos para que expire el token
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "30m"


//Exportamos las variables
export { JWT_SECRET, JWT_EXPIRATION }
