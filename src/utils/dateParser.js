export const dateParser = (num) => {
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(num).toLocaleDateString('fr-FR', options)

    return date;
};