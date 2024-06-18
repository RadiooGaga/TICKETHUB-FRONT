# PROYECTO 10 - FULLSTACK - PÁGINA DE GESTIÓN DE EVENTOS

BACK:

MODELOS:

- [ ] Usuario: almacena nombre, correo y contraseña mediante autenticación y emite tokens. El usuario además, tendrá dos campos adicionales:
- Mis eventos: (eventos a los que va a asistir, myEvents)
- Eventos Creados: (eventos creados, createdEvents)

- [ ] Evento: título, fecha, ubicación, categoría, foto, descripción y tendrá los campos:
- Creador del evento.
- Asistentes

- [ ] Asistente: Los asistentes deberán ingresar su nombre, apellidos y correo electrónico  si quieren confirmar asistencia al evento sin estar registrado en la página. Tendrán el campo:
- Eventos.

Extra:

- Subida de fotos de los eventos a cloudinary y borrado de las mismas en Cloudinary también, cuando el evento se elimina.
- Controladores que ordenan la información por categoría.

FRONT:

- Formulario de login. Si no tienen cuenta, pasarán a un formulario de registro. En cuanto se haga el registro, pasarán al login y se generará el token de usuario.
- Los usuarios verán que se habilitará la sección “Mi cuenta” al hacer Login.
- En esa sección, se verán 4 apartados: “Todos mis eventos”, dónde podrán guardar o quitar los eventos a los que quieran asistir. “Eventos creados”, donde se guardarán los eventos creados por el usuario. “Crear evento”, donde podrán subir sus eventos y “Mis datos” con sus datos personales, donde podrán borrar su cuenta.
- Se muestran todos los eventos en Home. También, están organizados por temática en la barra de navegación.
- Buscador de eventos habilitado.
- Permite a los usuarios autenticados  ver la lista de asistentes en cada evento.
- Manejo de errores en el frontend y el backend.
- Elementos componetizados y navegación del contenido como SPA.

ROLES:

Participante: puede ver y buscar los eventos y apuntarse a los mismos sin necesidad de tener una cuenta. Si quiere asistir a alguno, podrá hacer click en el botón “Te apuntas?”, en la que los datos del participante se guardarán a través de un pequeño formulario que aparecerá tras clicar ese botón. En ese momento, los datos del participante se almacenarán en la base de datos junto al campo “eventos”, donde aparecerán los eventos a los que quiere asistir, y se le mandaría, hipotéticamente, un email de confirmación al evento, por ejemplo. Tipo newsletter. Si ya están apuntados a un evento, no podrán volver a apuntarse y se reflejará con un mensaje “Ya estás inscrito en este evento”.

Usuario puede: ver y buscar eventos, guardar en su cuenta los eventos a los que va a asistir en “Todos mis eventos” y en los que apareceré como participante en los mismos,  crear un evento y guardarlo en “Eventos creados”, y borrar o editar SÓLO LOS EVENTOS QUE HA CREADO ÉL MISMO desde la pestaña “eventos creados”, así como borrar su cuenta si así lo desea.

Administrador: puede hacer todo lo anterior, y además, puede  ver cuántos participantes asistirán a cada evento desde “ver detalles”, actualizar/borrar cualquier evento de la página y borrar su cuenta.

Cada cambio se actualiza en cloudinary y mongodb.

IMPORTANTE:

- En Insomnia, no se podrá crear un evento con el formulario multipart, sino con Form Url encode.

--------------------------------------------

ENDPOINTS:GET

Registro y login de usuario + registro de participante sin cuenta

- **URL:** `${urlApi}/api/auth/login`
- **URL:** `${urlApi}/api/auth/register`
- **URL:** `${urlApi}/api/participant/register`

Crear evento.

- **URL:** `${urlApi}/api/new-event`

Barra de búsqueda.

- **URL:** `${urlApi}/api/events/search/jungle`

Traer el evento del creador.

- **URL** `${urlApi}/api/event/creator/id`

Traer eventos por categoría.

- **URL** `${urlApi}/api/events/category/conciertos`

Eventos por su ID

- **URL** `${urlApi}/api/events/id`

Todos los eventos

- **URL** `${urlApi}/api/events`

Todos los usuarios

- **URL** `${urlApi}/api/users`

Usuarios por id

- **URL** `${urlApi}/api/user/id`

Todos los participantes

- **URL** `${urlApi}/api/participants`

Participantes por id

- **URL** `${urlApi}/api/participant/id`

Participantes por su evento

- **URL** `${urlApi}/api/participants/event/eventId`

----------------------------------------------------------.

ENDPOINTS:PUT

Actualizar usuario

- **URL** `${urlApi}/api/user/update-user/userId`

Actualizar evento

- **URL** `${urlApi}/api/update-event/eventId`

------------------------------------------------------------.

ENDPOINTS:DELETE

Borrar usuario

- **URL** `${urlApi}/api/user/delete-user/userId`

Borrar evento

- **URL** `${urlApi}/api/delete-event/eventId`

--------------------------------------------------------------.

Maria Rivas
