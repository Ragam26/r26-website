export function clx(...inputs) {
  /*
  */
  const classes = [];

  const push = (value) => {
    if (!value) return;

    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) push(item);
      return;
    }

    if (typeof value === "object") {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key) && value[key]) {
          classes.push(key);
        }
      }
    }
  };

  for (const input of inputs) push(input);
  return classes.join(" ");
}

