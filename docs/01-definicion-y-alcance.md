# Documento 01 · Definición y alcance

**Versión 1.2, cerrado.** CU-03 pasa a la fase 2.

Now We Know es una app para guardar los lugares que descubres en TikTok e Instagram, que te los recuerda cuando estás cerca y te deja convertirlos en planes con otras personas.

- Plataforma: iOS, App Store
- Tecnología: React Native y TypeScript
- Piloto: 4 casos de uso más la cuenta
- Estado: alcance cerrado

## 1. El problema: lo guardamos y lo perdemos

Vemos un restaurante o un destino en TikTok o Instagram, lo guardamos en la red social y decimos "tenemos que ir". Semanas después ese post está enterrado entre cientos de guardados, sin dirección clara, y nadie se acuerda del plan.

> "Lo decimos ese rato y luego nos olvidamos."

### Por qué se llama así

Cuando alguien pregunta "¿a dónde vamos?", la respuesta casi siempre es "no sé". Con la app, la respuesta pasa a ser: **ahora sabemos**. Now We Know.

## 2. Visión: del post guardado al plan hecho

**Para quién.** Cualquier persona que use redes sociales para descubrir comida y viajes. Un solo tipo de usuario en el piloto (sin administradores).

**Persona principal.** Ana, 26 años. Guarda decenas de lugares al mes, sale con su pareja los fines de semana y nunca recuerda el nombre de "ese café que vimos".

## 3. Alcance del piloto

Cuatro casos de uso funcionales y uno base (la cuenta), que es requisito para todo lo demás. CU-03 (recordatorio por cercanía) se movió a la fase 2; se conserva su número para no reordenar los demás.

### CU-00 · Crear cuenta e iniciar sesión (base)

Necesario para guardar lugares en la nube y compartir planes. En iOS, si ofreces login con Google u otro proveedor externo, Apple te exige también "Iniciar sesión con Apple".

### CU-01 · Guardar un lugar desde un post (núcleo)

| | |
|---|---|
| **Actor** | Usuario autenticado |
| **Objetivo** | Convertir un enlace de TikTok o Instagram en un lugar guardado con nombre, imagen y dirección. |
| **Precondiciones** | Sesión iniciada. El usuario tiene el enlace de un post público. |
| **Disparador** | El usuario pulsa "Compartir → Now We Know" en TikTok o Instagram, o pega el enlace dentro de la app. |
| **Postcondición** | El lugar aparece en "Mis lugares" con estado pendiente. |

**Flujo principal**

1. El usuario comparte o pega el enlace.
2. El sistema obtiene los metadatos públicos del post (texto, miniatura, autor).
3. El sistema extrae candidatos de nombre y ciudad del texto.
4. El sistema busca coincidencias en un servicio de lugares y muestra las opciones.
5. El usuario confirma el lugar correcto y elige la carpeta donde guardarlo (o crea una nueva).
6. El sistema guarda el lugar con estado `pendiente`, el enlace original y el enlace de Google Maps.

**Flujos alternos**

- **A1.** No se encuentra coincidencia → el usuario busca el lugar a mano o lo registra manualmente.
- **A2.** El post es privado o el enlace no es válido → mensaje claro y opción de ingreso manual.
- **A3.** El lugar ya está guardado → se avisa y no se duplica.

**Criterios de aceptación**

- Guardar un lugar desde un enlace válido toma menos de 4 toques tras compartir.
- Nunca se guarda un lugar sin confirmación del usuario.
- El enlace original queda accesible desde el detalle del lugar.

> **Nota de senior.** "Analizar el video" con IA es caro y frágil para un piloto: TikTok e Instagram limitan el acceso a su contenido. En el piloto usamos los metadatos públicos del post más confirmación del usuario. El análisis del video queda para la fase 2.

### CU-02 · Organizar lugares en carpetas (núcleo)

| | |
|---|---|
| **Actor** | Usuario autenticado |
| **Objetivo** | Agrupar los lugares guardados en carpetas por tema y abrirlos en Google Maps. |
| **Precondiciones** | Sesión iniciada. |

**Flujo principal**

1. El usuario abre "Mis carpetas".
2. El sistema muestra sus carpetas. Si no tiene ninguna, sugiere temas como Comida y Viajes.
3. El usuario crea una carpeta (sugerida o con nombre propio) o entra a una existente.
4. El sistema lista los lugares de la carpeta con imagen, nombre y estado.
5. El usuario toca "Cómo llegar" y el sistema abre la ubicación en Google Maps.

**Flujos alternos**

- **A1.** Google Maps no está instalado → se abre en el navegador o en Apple Maps.
- **A2.** El usuario renombra o elimina una carpeta → se pide confirmación si tiene lugares.

**Criterios de aceptación**

- Las carpetas sugeridas aparecen la primera vez, sin crear nada hasta que el usuario elija.
- No hay mapa dentro de la app: solo se guarda el enlace y se redirige.

**Decisión:** un mismo lugar puede estar en varias carpetas a la vez (por ejemplo "Comida" y "Plan con mi novio"). En la base de datos es una relación muchos-a-muchos.

### CU-04 · Compartir con un grupo de amigos (social)

| | |
|---|---|
| **Actor** | Creador del grupo, miembro invitado |
| **Objetivo** | Que dos o más personas armen juntas carpetas de lugares pendientes dentro de un grupo de amigos. |
| **Precondiciones** | Ambos tienen cuenta. |

**Flujo principal**

1. El creador crea un grupo de amigos (por ejemplo "Yo y mi novio") y toca "Invitar".
2. El sistema genera el código de invitación del grupo y un enlace que lo contiene.
3. El dueño envía el enlace por WhatsApp, Instagram u otro medio.
4. El invitado abre el enlace. Si no tiene la app, va al App Store a descargarla.
5. El invitado inicia sesión con su usuario e ingresa el código (o se completa solo si la app ya estaba instalada).
6. El invitado se une al grupo y ve todas las carpetas del grupo.
7. Todos los miembros pueden ver, agregar y quitar lugares en esas carpetas. Los cambios se ven para todos.

**Permisos**

- **Creador del grupo:** todo lo del miembro, más renombrar y eliminar carpetas del grupo, regenerar el código y sacar miembros.
- **Miembro:** ver, agregar y quitar lugares, crear carpetas en el grupo, archivar carpetas para sí mismo, salir del grupo. No puede eliminar carpetas.

**Flujos alternos**

- **A1.** Código vencido o inválido → mensaje claro y opción de pedir uno nuevo al dueño.
- **A2.** El invitado ya es miembro → se abre el grupo directamente.

> **Nota de senior.** Que el enlace "recuerde" el código después de instalar la app (deferred deep linking) es complejo y suele requerir un servicio externo. En el piloto el código es el mecanismo principal: si el enlace no lo pasa solo, el invitado lo escribe a mano.

**Decisión:** archivar es personal. Si un miembro archiva una carpeta, se oculta solo para él; los demás la siguen viendo. El estado de archivado se guarda por persona, no en la carpeta.

### CU-05 · Marcar un lugar como visitado (cierre del ciclo)

Después de ir, cada persona marca el lugar como visitado por su cuenta y pasa a su historial de visitados.

**Decisión:** sin notas ni calificaciones en el piloto. Solo cambia el estado de `pendiente` a `visitado`.

## 4. Fuera del alcance del piloto

- Análisis del video con inteligencia artificial (fase 2).
- Versión Android.
- Recomendaciones automáticas o feed social público.
- Reseñas públicas, chat entre usuarios.
- Integración con reservas o delivery.
- Mapa dentro de la app (se redirige a Google Maps).
- Notas o calificaciones personales en lugares visitados.

## Ideas guardadas para la fase 2

- **CU-03 · Recordatorio por cercanía.** "Estás a 300 m de ese café que guardaste". Se investiga entonces el monitoreo de regiones en iOS, su límite por app y qué pasa si se niega la ubicación. La app debe funcionar completa sin ese permiso.
- **"¿A dónde vamos?"** Un botón que responde al "no sé" sugiriendo un lugar pendiente según dónde estás o con quién vas. Es la idea que le da nombre a la app.
- **Match de gustos.** En una carpeta compartida, ver qué lugares les gustan a ambos para decidir más rápido.
- **Análisis del video con IA.** Extraer el lugar directamente del video, no solo del texto del post.

## 5. Riesgos y decisiones abiertas

| Tema | Qué hay que resolver |
|---|---|
| **Datos de redes sociales** | Revisar qué permiten los términos de TikTok e Instagram sobre leer metadatos de posts. No hacer scraping. |
| **Servicio de lugares** | Elegir proveedor (Google Places, Apple MapKit, Foursquare). Comparar costo y límites gratuitos. |
| **Privacidad de ubicación** | Fase 2. Apple revisa con lupa el permiso de ubicación "siempre". Hay que justificarlo en texto claro. |
| **Backend** | Elegir entre Supabase, Firebase u otro. Lo decidimos en la fase de base de datos. |

---

Siguiente: [02 · Modelo de datos](02-modelo-de-datos.md)
