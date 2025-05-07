
# Novo Estilo Admin

**Novo Estilo Admin** es una aplicación web desarrollada con **Create React App**, **TypeScript** y **Firebase**. Su objetivo es proporcionar una interfaz administrativa para la gestión de turnos de una peluquería Novo Estilo. Esta herramienta permite a los administradores actualizar turnos disponibles y gestionar los ocupados, ver calendarios y administrarse mas eficientemente.

## Características

- Autenticación de usuarios mediante Firebase Authentication.
- Gestión de contenidos dinámicos almacenados en Firebase Firestore.
- Interfaz intuitiva y responsiva desarrollada con React y TypeScript.
- Despliegue sencillo utilizando Firebase Hosting.

## Tecnologías Utilizadas

- [Create React App](https://create-react-app.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/) (Authentication, Firestore, Hosting)

## Requisitos Previos

- Node.js v14 o superior
- Cuenta en Firebase con un proyecto configurado

## Instalación y Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/estebangf/novo-estilo-admin.git
   cd novo-estilo-admin
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura Firebase:

   - Crea un nuevo proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Habilita Firestore y Authentication (por ejemplo, con correo electrónico y contraseña).
   - Copia el archivo `.env.example` a `.env` y reemplaza los valores con tu configuración de Firebase.

4. Inicia la aplicación en modo desarrollo:

   ```bash
   npm start
   ```

   La aplicación estará disponible en `http://localhost:3000/`.

## Despliegue

Para desplegar la aplicación en Firebase Hosting:

1. Inicia sesión en Firebase CLI:

   ```bash
   firebase login
   ```

2. Inicializa Firebase en el proyecto (si no se ha hecho previamente):

   ```bash
   firebase init
   ```

3. Construye la aplicación para producción:

   ```bash
   npm run build
   ```

4. Despliega a Firebase Hosting:

   ```bash
   firebase deploy
   ```

## Autor

Desarrollado por [Esteban García Fernández](https://github.com/estebangf).
