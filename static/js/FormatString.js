
const FormatString = (domain_key) => {
    let format_key = '';
    domain_key.split("_").forEach(word => {
        let ucfirst = word.toLowerCase().split('')[0].toUpperCase();
        let ucword = `${ucfirst}${word.slice(1,)}`;
        format_key += ` ${ucword}`;
    });
    format_key = format_key.split(' ').slice(1,).join(' ');
    return format_key;
}

export { FormatString }