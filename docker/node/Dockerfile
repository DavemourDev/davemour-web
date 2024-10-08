# Usamos la última versión estable de Node.js como base
FROM node:latest

# Creamos un directorio de trabajo para la aplicación
WORKDIR /usr/src/app

# Copiamos el resto de los archivos del proyecto
COPY . .

# Instalamos las dependencias utilizando pnpm
RUN npm install

# Iniciamos la aplicación en modo desarrollo (usando nodemon o similar)
CMD ["npm", "run", "start:dev"]
