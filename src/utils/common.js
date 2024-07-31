export const formatLocaleString = (value, locale = "en-GB") => Number(value)?.toLocaleString(locale);


export const hasAllRequiredValues = (obj) => Object.values(obj).every(value => value);