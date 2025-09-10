document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('checkboxes-container');
    const generateBtn = document.getElementById('generate-btn');
    const resultText = document.getElementById('result-text');

    // Genera las secciones desplegables para cada zona
    for (const zona in zonas) {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        
        summary.textContent = zona;
        details.appendChild(summary);

        // Revisa si la zona es de checkboxes o de entrada de texto
        if (zonas[zona].type === 'checkbox') {
            zonas[zona].items.forEach(barrio => {
                const div = document.createElement('div');
                div.classList.add('checkbox-item');

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = `barrio-${barrio.replace(/\s+/g, '-').toLowerCase()}`;
                input.name = 'barrio';
                input.value = barrio;
                input.dataset.zona = zona;

                const label = document.createElement('label');
                label.htmlFor = input.id;
                label.textContent = barrio;

                div.appendChild(input);
                div.appendChild(label);
                details.appendChild(div);
            });
        } else if (zonas[zona].type === 'text-input') {
            const textarea = document.createElement('textarea');
            textarea.id = `textarea-${zona.replace(/\s+/g, '-').toLowerCase()}`;
            textarea.name = zona;
            textarea.rows = 4;
            textarea.placeholder = "Ingresa las calles o puntos de referencia aquí...";
            textarea.classList.add('input-calle');
            details.appendChild(textarea);
        }

        container.appendChild(details);
    }

    // Lógica para el botón "Generar"
    generateBtn.addEventListener('click', () => {
        let message = '';
        
        for (const zona in zonas) {
            let items = [];

            if (zonas[zona].type === 'checkbox') {
                const checkedBarrios = document.querySelectorAll(`input[name="barrio"][data-zona="${zona}"]:checked`);
                checkedBarrios.forEach(checkbox => {
                    items.push(checkbox.value);
                });
            } else if (zonas[zona].type === 'text-input') {
                const textarea = document.getElementById(`textarea-${zona.replace(/\s+/g, '-').toLowerCase()}`);
                if (textarea.value.trim() !== '') {
                    // Divide el texto por líneas para un mejor formato
                    items = textarea.value.split('\n').map(item => item.trim());
                }
            }
            
            if (items.length > 0) {
                message += `${zona}\n`;
                items.forEach(item => {
                    message += `- ${item}\n`;
                });
                message += '\n';
            }
        }
        
        resultText.textContent = message;
    });
});