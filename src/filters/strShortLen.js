export default function strshortlen (input) {
    return (input.length > 50) ? input.substr(0, 50)+' ...' : input;
}