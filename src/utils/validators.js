export const isValidPrice = (price) => {
    const numPrice = Number(price);
    return !isNaN(numPrice) && numPrice > 0;
};

export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const isRequired = (value) => {
    return value !== null && value !== undefined && value.trim() !== '';
};