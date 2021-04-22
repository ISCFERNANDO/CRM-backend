const removeSpecialCharsInUrl = (str: string) => {
    const chars: any = {
        ' ': '_',
        '-': '_',
        '.': '.',
        ';': '',
        ':': '',
        Á: 'A',
        á: 'a',
        É: 'E',
        é: 'e',
        Í: 'I',
        í: 'i',
        Ó: 'O',
        ó: 'o',
        Ú: 'U',
        ú: 'u'
    };
    return str.replace(/[ -.;:ÁáÉéÍíÓóÚú]/g, (m) => chars[m]);
};

export { removeSpecialCharsInUrl };
