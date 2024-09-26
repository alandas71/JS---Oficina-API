export function formatarFieldsAgendamento(fields: any) {
  const parsedFields: any = {};

  Object.keys(fields).forEach((key) => {
    const value = fields[key][0];
    const keys = key
      .replace(/\]/g, "")
      .split("[");

    let current = parsedFields;
    keys.forEach((k, index) => {
      if (k === "Adicionais" && !isNaN(Number(keys[index + 1]))) {
        const arrayIndex = Number(keys[index + 1]);
        if (!current[k]) current[k] = [];
        if (!current[k][arrayIndex]) current[k][arrayIndex] = {};
      
        current = current[k][arrayIndex];
      } else if (index === keys.length - 1) {
        current[k] = value;
      } else {
        if (!current[k]) current[k] = {};
        current = current[k];
      }
    });
  });

  return parsedFields;
}