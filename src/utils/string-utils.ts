const removeSpecialCharsInUrl = (str: string) => {
    return str
        .replace(/\s/g, '_')
        .replace(/-/g, '_')
        .replace(/./g, '')
        .replace(/;/g, '')
        .replace(/:/g, '')
        .replace(/Á/g, 'A')
        .replace(/á/g, 'a')
        .replace(/É/g, 'E')
        .replace(/é/g, 'e')
        .replace(/Í/g, 'I')
        .replace(/í/g, 'i')
        .replace(/Ó/g, 'O')
        .replace(/ó/g, 'o')
        .replace(/Ú/g, 'U')
        .replace(/ú/g, 'u');
};

export { removeSpecialCharsInUrl };
