# Guía de Instalación y Ejecución

Este proyecto consta de dos partes: una aplicación frontend en Vue.js y un servidor backend en Node.js.

## Requisitos Previos

- Node.js (versión 14 o superior recomendada)
- npm (normalmente viene con Node.js)

## Estructura del Proyecto

```
proyecto-raíz/
│
├── vue-app/         # Aplicación frontend en Vue.js
│
└── node-server/     # Servidor backend en Node.js
```

## Instalación

1. Clona el repositorio:
   ```
   git clone [URL_DEL_REPOSITORIO]
   cd [NOMBRE_DEL_DIRECTORIO]
   ```

2. Instala las dependencias del frontend:
   ```
   cd vue-app
   npm install
   ```

3. Instala las dependencias del backend:
   ```
   cd ../node-server
   npm install
   ```

## Ejecución

1. Inicia el servidor backend:
   ```
   cd node-server
   npm run dev
   ```
   El servidor debería estar corriendo en `http://localhost:3000`.

2. En una nueva terminal, inicia la aplicación frontend:
   ```
   cd vue-app
   npm run dev
   ```
   La aplicación Vue debería estar accesible en `http://localhost:5173` (o el puerto que Vite asigne).

3. Abre tu navegador y visita la URL de la aplicación frontend para comenzar a usar la aplicación.

Nota: Asegúrate de que ambos, el servidor backend y la aplicación frontend, estén corriendo simultáneamente para el funcionamiento completo de la aplicación.
adicionales que los usuarios deban seguir.


# API de Encriptación y Desencriptación

Esta API proporciona servicios para encriptar y desencriptar texto.

## URL Base

`http://localhost:3000`

## Endpoints

### Encriptar Texto

Encripta el texto proporcionado.

- **URL:** `/encrypt`
- **Método:** `POST`
- **Cuerpo de la Solicitud:**
  ```json
  {
    "text": "texto a encriptar"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Contenido:** 
    ```json
    {
      "result": "texto encriptado"
    }
    ```
- **Respuesta de Error:**
  - **Código:** 400
  - **Contenido:** 
    ```json
    {
      "error": "Se requiere un texto para encriptar"
    }
    ```

### Desencriptar Texto

Desencripta el texto proporcionado.

- **URL:** `/decrypt`
- **Método:** `POST`
- **Cuerpo de la Solicitud:**
  ```json
  {
    "text": "texto encriptado"
  }
  ```
- **Respuesta Exitosa:**
  - **Código:** 200
  - **Contenido:** 
    ```json
    {
      "result": "texto desencriptado"
    }
    ```
- **Respuesta de Error:**
  - **Código:** 400
  - **Contenido:** 
    ```json
    {
      "error": "Se requiere un texto para desencriptar"
    }
    ```

## Ejemplos de Uso

### Encriptar

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"Hola mundo"}' http://localhost:3000/encrypt
```

### Desencriptar

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"Ipmb!nvoep"}' http://localhost:3000/decrypt
```

## Notas

- Todos los textos deben ser enviados en formato UTF-8.
- La API utiliza un método de encriptación simple por desplazamiento de caracteres. No es seguro para uso en producción con datos sensibles.
- CORS está habilitado para permitir solicitudes desde cualquier origen.

## Errores

La API puede devolver los siguientes errores:

- **400 Bad Request:** Cuando no se proporciona un texto para encriptar o desencriptar.
- **500 Internal Server Error:** Cuando ocurre un error inesperado en el servidor.

Para cualquier error, la respuesta incluirá un mensaje explicativo en el campo `error`.


