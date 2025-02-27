export function csvToJson(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim().replace(/^"|"$/g, ''));
    const result = lines.slice(1).map(line => {
        let values = [];
        let value = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            let char = line[i];

            if (char === '"' && !inQuotes) {
                inQuotes = true;
            } else if (char === '"' && inQuotes) {
                // Check for double quotes in a quoted value
                if (i + 1 < line.length && line[i + 1] === '"') {
                    value += '"';
                    i++; // Skip the next quote
                } else {
                    inQuotes = false;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(value.trim().replace(/^"|"$/g, ''));
                value = '';
            } else {
                value += char;
            }
        }
        values.push(value.trim().replace(/^"|"$/g, ''));

        return headers.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
    });
    return result;
}