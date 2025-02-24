# 🍽️ RestVisor

**RestVisor** es una aplicación web diseñada para gestionar la supervisión de reservas en un restaurante. Permite a los supervisores visualizar el estado de las reservas, gestionar confirmaciones y administrar la disponibilidad del personal de forma eficiente.

## 📌 Características
- 📅 **Gestión de Reservas**: Visualización y confirmación de reservas en tiempo real.
- 👨‍🍳 **Supervisión del Personal**: Muestra los trabajadores activos en el restaurante.
- 🎨 **Interfaz Interactiva**: Diseño atractivo y responsivo con Bootstrap 5.
- 📋 **Modales de Confirmación**: Diálogos interactivos para confirmar o cancelar reservas.
- ⚡ **Rápida y Optimizada**: Uso eficiente de Bootstrap y JavaScript para una experiencia fluida.

---

## 🛠️ Tecnologías Utilizadas
- **HTML5**: Estructura principal de la aplicación.
- **CSS3 & Bootstrap 5**: Estilización y diseño responsivo.
- **JavaScript**: Interactividad y lógica dinámica.
- **Git & GitHub**: Control de versiones y colaboración.

---

## 🚀 Instalación y Configuración
### 1️⃣ **Clonar el Repositorio**

```sh
git clone https://github.com/tu-usuario/restvisor.git
cd restvisor
```

## 2️⃣ **Estructura del Proyecto**
El proyecto **RestVisor** está organizado de la siguiente manera:  
/restvisor  
│── /static  
│   ├── /css             # Archivos CSS personalizados  
│   │   ├── header.css   # Estilos para el header  
│   │   ├── modal.css    # Estilos para los modales  
│   ├── /js              # Archivos JavaScript  
│   │   ├── supervisor.js  # Lógica para supervisores  
│   ├── /assets          # Imágenes y recursos estáticos  
│── /components  
│   ├── navbar.html      # Barra de navegación  
│   ├── sidebar.html     # Barra lateral con trabajadores activos  
│   ├── reservations.html # Tabla de reservas  
│   ├── confirmation-modal.html  # Modal de confirmación de reservas  
│── index.html           # Página principal  
│── README.md            # Documentación del proyecto  

---

## **Ejecutar el Proyecto**

## 3️⃣ **Uso de la Aplicación**
La aplicación **RestVisor** permite a los supervisores gestionar las reservas del restaurante de manera eficiente. Aquí tienes un resumen de su funcionamiento:

1. **Inicio**
    - La página principal muestra la lista de trabajadores activos y las reservas programadas para el día.
    - La interfaz está diseñada para ser intuitiva y fácil de usar.

2. **Confirmación de Reservas**
    - Cada reserva tiene una opción para **aceptarla o rechazarla**.
    - Al hacer clic en una reserva, se abre un **modal de confirmación** donde el usuario puede aprobar o rechazar la solicitud.

3. **Añadir Reservas**
    - Un botón **"ADD RESERVATION"** permite registrar nuevas reservas.
    - El formulario incluye campos como nombre del cliente, número de teléfono, hora y número de personas.

---

## 4️⃣ 📌 **Capturas de Pantalla**
A continuación, se presentan algunas imágenes de la aplicación:

| **Dashboard Principal** | **Modal de Confirmación** |
|------------------------|--------------------------|
| ![Dashboard](assets/dashboard.png) | ![Modal](assets/modal.png) |

---

## 5️⃣ **📌 Próximas Mejoras**
Se están planeando las siguientes mejoras para futuras versiones:

- ✅ **Implementar una base de datos** para que las reservas sean persistentes.
- ✅ **Agregar notificaciones en tiempo real** para cambios en las reservas.
- ✅ **Optimizar la interfaz de usuario** con transiciones más fluidas.
- ✅ **Integración con un backend en Node.js o Django** para gestionar datos.

---

## 6️⃣**🤝 Contribución**
¡Toda ayuda es bienvenida! Si quieres colaborar en el desarrollo de **RestVisor**, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama para tu mejora:
   ```sh
   git checkout -b feature-nueva-funcionalidad
   ```
3. Guarda los cambios y realiza un commit con un mensaje descriptivo:
   ```sh
   git add .
   git commit -m "Añadida nueva funcionalidad para gestionar reservas"
   ```

4. Sube los cambios a tu repositorio en GitHub:
   ```sh
   git push origin feature-nueva-funcionalidad
   ```
5. Abre GitHub y accede a tu repositorio:
    - Dirígete a la pestaña **Pull Requests** en la parte superior.
    - Haz clic en el botón **New Pull Request**.
    - Selecciona la rama en la que hiciste los cambios (`feature-nueva-funcionalidad`).
    - Revisa los cambios y añade un comentario explicativo sobre la mejora.
    - Haz clic en **Create Pull Request** para enviarlo a revisión.

✅ Una vez revisado y aprobado, tu código será fusionado con el proyecto principal. ¡Gracias por contribuir a **RestVisor**! 🚀  