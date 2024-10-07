// Función para cargar y aplicar temas desde el JSON
fetch('/api/v1/themes')
    .then(response => response.json())
    .then(data => {
        const colorThemes = data['color-themes'];
        const fontThemes = data['font-themes'];
        const baseTextColors = data['base-text'];

        // Llenar las opciones del selector de temas de color
        const themeSelector = document.getElementById('theme-selector');
        for (const key in colorThemes) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = colorThemes[key].name;
            themeSelector.appendChild(option);
        }

        // Llenar las opciones del selector de temas de fuentes
        const fontSelector = document.getElementById('font-selector');
        for (const key in fontThemes) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = fontThemes[key].name;
            fontSelector.appendChild(option);
        }

        // Llenar las opciones del selector de color de texto base
        const textColorSelector = document.getElementById('text-color-selector');
        for (const key in baseTextColors) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = baseTextColors[key].name;
            textColorSelector.appendChild(option);
        }

        // Aplicar los cambios de tema de colores
        document.getElementById('theme-selector').addEventListener('change', function () {
            const selectedTheme = this.value;
            const theme = colorThemes[selectedTheme].colors;

            document.documentElement.style.setProperty('--primary-color', theme.primary);
            document.documentElement.style.setProperty('--secondary-color', theme.secondary);
            document.documentElement.style.setProperty('--neutral-color', theme.neutral);
            document.documentElement.style.setProperty('--accent-color', theme.accent);
        });

        // Aplicar los cambios de tema de fuentes
        document.getElementById('font-selector').addEventListener('change', function () {
            const selectedFontTheme = this.value;
            const fontTheme = fontThemes[selectedFontTheme].fonts;

            document.documentElement.style.setProperty('--font-heading', fontTheme.heading);
            document.documentElement.style.setProperty('--font-body', fontTheme.body);
        });

        // Aplicar los cambios de color del texto base
        document.getElementById('text-color-selector').addEventListener('change', function () {
            const selectedTextColor = this.value;
            const textColor = baseTextColors[selectedTextColor].color;

            document.documentElement.style.setProperty('--base-text-color', textColor);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));



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