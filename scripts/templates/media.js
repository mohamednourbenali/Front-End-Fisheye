function photographerMedia (data) {
    const {video, image, title, likes, liked} = data;
    // fonction pour créer un élément video 
    function createVideoElement (){
        let result = `<figure class="portrait">
                    <video controls>
                        <source src="${video}" class="hover-shadow" type="video/mp4">
                    </video>
                    <div class="description-likes">
                        <p class="title">${title}</p>
                    `;
        result += createMediaLikes()
        return result;
        
    }
    // fonction pour créer un élément image
    function createImageElement(){
        let result = `<figure class="portrait">
                        <img src="${image}" class="hover-shadow" alt="${title}" tabindex="0" >
                        <div class="description-likes">
                            <p class="title">${title}</p>
                        `
        result += createMediaLikes();
        return result;
        
    }

    function createDislikeElement (){
        return `<div class="like">
                    <p class="nbrLikes" aria-label="nombre des likes">${likes}</p>
                    <div class="heart">
                        <i class="fa-regular fa-heart dislike" tabindex="0"></i>
                    </div>
                </div>
                </div>
                </figure>`
    }

    function createLikeElement (){
        return `<div class="like">
                    <p class="nbrLikes" aria-label="nombre des likes">${likes}</p>
                    <div class="heart">
                        <i class="fa-solid fa-heart dislike" tabindex="0"></i>
                    </div>
                </div>
                </div>
                </figure>`
    }
    function createMediaLikes(){
        if (liked){
            return createLikeElement();
        }else{
            return createDislikeElement();
        }
    }

    // fonction pour créer des éléments (média)
    function createMediaElement (){
        if (image ===undefined){
            return createVideoElement();
        } else if (image !==undefined){
            return createImageElement();
        } else {
            throw new Error("type de media non prise en charge");
        }
    }
    return {createMediaElement}
}

export default photographerMedia;