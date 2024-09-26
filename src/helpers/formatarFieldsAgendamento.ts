export function formatarFieldsAgendamento(fields: any) {
  const parsedFields: any = {};

  Object.keys(fields).forEach((key) => {
    const value = fields[key][0];
    const keys = key.replace(/\]/g, "").split("[");

    let current = parsedFields;
    
    if (keys[0] === "Adicionais") {
      const index = Number(keys[1]);

      if (!current.Adicionais) {
        current.Adicionais = [];
      }

      if (!current.Adicionais[index]) {
        current.Adicionais[index] = {};
      }

      current.Adicionais[index][keys[2]] = value; 
    } else {
      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] = value;
        } else {
          if (!current[k]) current[k] = {}; 
          current = current[k];
        }
      });
    }
  });

  return parsedFields;
}
