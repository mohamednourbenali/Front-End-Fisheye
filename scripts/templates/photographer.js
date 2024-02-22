function photographerTemplate(data) {

    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.innerHTML += `
        <a href="./photographer.html?photographeId=${id}"><img src="${portrait}" alt="la photo de ${name}"/></a>
        <h2>${name}</h2>
        <p class="country"> ${city}, ${country}</p>
        <p class="tagline"> ${tagline}</p>
        <p class="price">${price} €/jour</p>`
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

export default photographerTemplate;