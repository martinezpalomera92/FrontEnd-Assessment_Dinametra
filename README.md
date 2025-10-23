# FrontEnd-Assessment_Dinametra
Task to showcase skills with Front-End for Dinametra, consuming NASA API.

Dashboard Interactivo NEO (Prueba Técnica)

Este proyecto implementa un dashboard interactivo para visualizar datos sobre Objetos Cercanos a la Tierra (NEO) de la API de la NASA, desarrollado en JavaScript Vanilla.

1. 💡 Enfoque Arquitectónico y Diseño
Una breve explicación del enfoque adoptado para cumplir con los requisitos de la prueba.


A. Modularidad y Código Limpio (SRP)

La arquitectura se basa en Módulos ES6 y el Principio de Responsabilidad Única (SRP) para asegurar un código mantenible y escalable.

	-main.js (Orquestador): Única responsabilidad de controlar el flujo de la aplicación (inicialización, filtros y coordinación de módulos).

	-dataProcessor.js (Lógica Pura / Testing): Transforma datos brutos de la API en formatos aptos para gráficos, siendo la parte más crítica y testeada del código.

	-charts.js (Rendimiento): Implementa la lógica "crear o actualizar" la instancia de Chart.js para optimizar la velocidad al filtrar datos.

	-ui.js (Feedback): Controla el DOM para mostrar mensajes de carga y error (separación de responsabilidades con main.js).


B. Diseño, Visualización y Accesibilidad

	-Diseño Responsivo (Req. 3): Se utiliza una combinación de CSS Grid (layout principal) y Flexbox (contenedor de gráficos) con la propiedad flex: 1 1 400px para asegurar que los 3 gráficos se apilen automáticamente en dispositivos móviles.

	-Accesibilidad (Req. 6): El dashboard es utilizable con teclado. Se implementaron atributos ARIA (aria-live="assertive", aria-label) para una correcta anunciación de los gráficos y estados de error.

	-Visualizaciones: Se incluyen 3 tipos de gráficos (Línea, Dona y Barras) para un análisis completo de la actividad y riesgo de los NEOs.



2. 🚀 Configuración y Ejecución
Instrucciones detalladas sobre cómo configurar y ejecutar la aplicación.

2.1 Requisitos Previos

	-Node.js (LTS recomendado)

	-npm (incluido con Node.js)

	-Una API Key de la NASA (obtenida en api.nasa.gov).

2.2 Pasos de Instalación

	-Instalar Dependencias de Desarrollo:
		
    ____________________

		npm install
    ____________________

	-Configurar API Key: 
	Abrir el archivo js/api.js y reemplazar el valor de API_KEY con su clave de la NASA. ![Image Alt](/public/img/ScreenShots/API_placement.png)

	-Ejecutar la Aplicación: 
	Abra el archivo index.html directamente en su navegador web.

2.3 Ejecución de Pruebas Unitarias
Para validar la lógica pura de la aplicación (módulos dataProcessor.js y api.js):

    __________________

		npm test
    __________________

	-Resultado Esperado: Todos los tests pasarán, confirmando la robustez del manejo de datos y errores de red.



3. ⚠️ Suposiciones y Problemas Conocidos

	API: Límite de Rango de Fechas

		-Detalle: La API de NeoWs solo permite consultas de un máximo de 7 días.

		-Solución Adoptada: Se implementó una validación estricta en main.js que lanza un error amigable al usuario antes de realizar una llamada fallida a la red.

	Visualización: Tamaño del Gráfico de Dona

		-Detalle: El gráfico de dona tendía a estirarse en contenedores responsivos.

		-Solución Adoptada: Se ajustó la configuración de Chart.js (maintainAspectRatio: false) y se usó la clase chart-flex-wrapper compact en el CSS para corregir el problema.

	Testing: Output del Test

		-Detalle: Al ejecutar npm test, se muestra una advertencia de console.error sobre un error HTTP 400.

		-Solución Adoptada: Es el comportamiento esperado. Esto verifica que la función fetchNeoData maneja y relanza correctamente los errores de la API.


# Sample functionality:

-Initial state  ![Image Alt](/public/img/ScreenShots/01_initial-state.png)


-Applying filter ![Image Alt](/public/img/ScreenShots/02_applying-filter.png)

-Filter applied ![Image Alt](/public/img/ScreenShots/03_filter-applied.png)

-Filter range exceeded ![Image Alt](/public/img/ScreenShots/04_out-of-range.png)