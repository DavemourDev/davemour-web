// Función para cargar y aplicar temas desde el JSON
fetch('/api/v1/themes')
    .then(response => response.json())
    .then(data => {
        // const data = {
        //     "modern-friendly": {
        //         "name": "Moderno y Amigable",
        //         "fonts": {
        //             "heading": "Montserrat",
        //             "body": "Roboto"
        //         },
        //         "colors": {
        //             "primary": "#4A90E2",
        //             "secondary": "#7ED321",
        //             "neutral": "#F5F5F5",
        //             "accent": "#F5A623",
        //             "text": "#000000"
        //         }
        //     },
        //     "dynamic-tech": {
        //         "name": "Dinamismo y Tecnología",
        //         "fonts": {
        //             "heading": "Montserrat",
        //             "body": "Roboto"
        //         },
        //         "colors": {
        //             "primary": "#007AFF",
        //             "secondary": "#FF9500",
        //             "neutral": "#8E8E93",
        //             "accent": "#34C759",
        //             "text": "#FFFFFF"
        //         }
        //     },
        //     "professional-sophisticated": {
        //         "name": "Profesional y Sofisticado",
        //         "fonts": {
        //             "heading": "IBM Plex Sans",
        //             "body": "Source Sans Pro"
        //         },
        //         "colors": {
        //             "primary": "#2C3E50",
        //             "secondary": "#1ABC9C",
        //             "neutral": "#ECF0F1",
        //             "accent": "#F39C12",
        //             "text": "#333333"
        //         }
        //     }
        // };

        // Llenar las opciones del selector de temas de color
        const themeSelector = document.getElementById('theme-selector');
        for (const key in data) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data[key].name;
            themeSelector.appendChild(option);
        }

        // Aplicar los cambios de tema de colores
        document.getElementById('theme-selector').addEventListener('change', function () {
            const themeKey = this.value;
            const theme = data[themeKey];

            document.documentElement.style.setProperty('--base-text-color', theme.colors.text);
            document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
            document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
            document.documentElement.style.setProperty('--neutral-color', theme.colors.neutral);
            document.documentElement.style.setProperty('--accent-color', theme.colors.accent);
            document.documentElement.style.setProperty('--font-heading', theme.fonts.heading);
            document.documentElement.style.setProperty('--font-body', theme.fonts.body);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));


// Guardar datos de edición de tema de color
document.getElementById('theme-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const themeId = document.getElementById('theme-id').value;
    const themeName = document.getElementById('theme-name').value;
    const themePrimary = document.getElementById('theme-primary').value;
    const themeSecondary = document.getElementById('theme-secondary').value;
    const themeNeutral = document.getElementById('theme-neutral').value;
    const themeAccent = document.getElementById('theme-accent').value;

    // Crear objeto JSON con los datos del tema
    const themeData = {
        'color-themes': {
            [themeId]: {
                name: themeName,
                colors: {
                    primary: themePrimary,
                    secondary: themeSecondary,
                    neutral: themeNeutral,
                    accent: themeAccent
                }
            }
        }
    };

    // Mostrar alerta con el objeto JSON
    // alert(JSON.stringify(themeData, null, 2));

    // Enviar los datos del tema al servidor
    fetch('/api/v1/themes', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(themeData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error al enviar los datos:', error));


});
