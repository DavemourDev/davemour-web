// Definicion de funciones para hacer el código menos verboso
const $ = (selector) => document.querySelector(selector);
const setCssProperty = (property, value) => document.documentElement.style.setProperty(property, value);

// Función para cargar y aplicar temas desde el JSON
fetch('/api/v1/themes')
    .then(response => response.json())
    .then(data => {
        // Llenar las opciones del selector de temas de página
        const themeSelector = $('#theme-selector');
        for (const key in data) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data[key].name;
            themeSelector.appendChild(option);
        }

        // Aplicar los cambios de tema de página
        $('#theme-selector').addEventListener('change', function () {
            const themeKey = this.value;
            const theme = data[themeKey];

            setCssProperty('--base-text-color', theme.colors.text);
            setCssProperty('--primary-color', theme.colors.primary);
            setCssProperty('--secondary-color', theme.colors.secondary);
            setCssProperty('--neutral-color', theme.colors.neutral);
            setCssProperty('--accent-color', theme.colors.accent);
            setCssProperty('--font-heading', theme.fonts.heading);
            setCssProperty('--font-body', theme.fonts.body);

            // Mostrar los valores del tema seleccionado en el formulario
            $('#theme-id').value = themeKey;
            $('#theme-name').value = theme.name;
            $('#theme-color-primary').value = theme.colors.primary;
            $('#theme-color-secondary').value = theme.colors.secondary;
            $('#theme-color-neutral').value = theme.colors.neutral;
            $('#theme-color-accent').value = theme.colors.accent;
            $('#theme-color-text').value = theme.colors.text;
            $('#theme-font-heading').value = theme.fonts.heading;
            $('#theme-font-body').value = theme.fonts.body;

        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));


// Guardar datos de edición de tema de página
$('#theme-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const themeId = $('#theme-id').value;
    const themeName = $('#theme-name').value;
    const themeColorPrimary = $('#theme-color-primary').value;
    const themeColorSecondary = $('#theme-color-secondary').value;
    const themeColorNeutral = $('#theme-color-neutral').value;
    const themeColorAccent = $('#theme-color-accent').value;
    const themeColorText = $('#theme-color-text').value;
    const themeFontHeading = $('#theme-font-heading').value;
    const themeFontBody = $('#theme-font-body').value;
    // Crear objeto JSON con los datos del tema
    const themeData = {
        name: themeName,
        colors: {
            primary: themeColorPrimary,
            secondary: themeColorSecondary,
            neutral: themeColorNeutral,
            accent: themeColorAccent,
            text: themeColorText
        }
        ,
        fonts: {
            heading: themeFontHeading,
            body: themeFontBody
        }
    };

    // Mostrar alerta con el objeto JSON
    // alert(JSON.stringify(themeData, null, 2));
    // return;
    // Enviar los datos del tema al servidor
    fetch(`/api/v1/themes/${themeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(themeData)
    })
        .then(response => response.json()) // TODO: Manejar escenario segun codigo de respuesta
        .then(data => console.log(data))
        .catch(error => console.error('Error al enviar los datos:', error)).finally(() => {
            // TODO: Reactivar botones del formulario
        });

});

// Aplicar los cambios de formulario de tema de página (Vista previa)
$('#apply-theme-btn').addEventListener('click', function () {

    const inputs = $('#theme-form').elements;


    console.log({
        'theme-color-text': inputs['theme-color-text'].value,
        'theme-color-primary': inputs['theme-color-primary'].value,
        'theme-color-secondary': inputs['theme-color-secondary'].value,
        'theme-color-neutral': inputs['theme-color-neutral'].value,
        'theme-color-accent': inputs['theme-color-accent'].value,
        'theme-font-heading': inputs['theme-font-heading'].value,
        'theme-font-body': inputs['theme-font-body'].value
    });



    setCssProperty('--base-text-color', inputs['theme-color-text'].value);
    setCssProperty('--primary-color', inputs['theme-color-primary'].value);
    setCssProperty('--secondary-color', inputs['theme-color-secondary'].value);
    setCssProperty('--neutral-color', inputs['theme-color-neutral'].value);
    setCssProperty('--accent-color', inputs['theme-color-accent'].value);
    setCssProperty('--font-heading', inputs['theme-font-heading'].value);
    setCssProperty('--font-body', inputs['theme-font-body'].value);
});