function insertHTML(ruta_Server, contenedor, position, htmlTemplate){
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    fetch(ruta_Server)
    .then(response => response.json())
    .then(data =>{
        const params = new URLSearchParams(window.location.search);
        const nombre = params.get('name');  
        for (let element of data){
            if (htmlTemplate.includes('id="presentacion"') && element.display_name == nombre){ // Data Perfil
                let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => element[key.trim()] || '');
                document.getElementById(contenedor).insertAdjacentHTML(position, html);
                return;
            }else if ((!htmlTemplate.includes('id="presentacion"') && element.display_name == nombre) || (["muro-index", "muro-search"].includes(contenedor))){ // Repostorios Perfil || Repos index || Profiles
                let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => element[key.trim()] || '');
                document.getElementById(contenedor).insertAdjacentHTML(position, html);
            }
        }
    })
}

window.addEventListener("DOMContentLoaded", () => {
    insertHTML(
        "https://server-5lrb.onrender.com/dataRepo",
        "muro-index",
        "beforeend",
        `<div class="proyect">
            <div>
                <a href="\${url_page}">
                    <h1>\${name_repo}</h1>
                </a>
                <a href="resources/views/profile.html?name=\${display_name}">
                    <img class="photo_profile" src="\${photo_user}">
                </a>
            </div>
            <div class="images-move">
                <svg width="100" height="100">
                    <path d="M58.333,75.000L33.333,50.000L58.333,25.000L64.167,30.833L45.000,50.000L64.167,69.167L58.333,75.000ZZ" style="fill: rgb(255, 255, 255);" class="fills"/>
                </svg>
                <img class="image_muro" src="resources/images/Index.png" alt="">
                <svg width="100" height="100">
                    <path d="M52.500,50.000L33.333,30.833L39.167,25.000L64.167,50.000L39.167,75.000L33.333,69.167L52.500,50.000ZZ" style="fill: rgb(255, 255, 255);" class="fills"/>
                </svg>
            </div>
            <p>\${description}</p>
        </div>`
    );
    insertHTML(
        "https://server-5lrb.onrender.com/dataUser",
        "muro-search",
        "beforeend",
        `<div class="perfil">
            <a href="profile.html?name=\${display_name}">
                <img src="\${photo_user}" alt="">
            </a>
            <div>
                <h1>\${display_name}</h1>
                <p>\${user_bio} </p>
            </div>
        </div>`
    );
    insertHTML(
        "https://server-5lrb.onrender.com/dataUser",
        "main-profile",
        "afterbegin",
        `<section class="Presentacion" id="presentacion">
            <img src="\${photo_user}">
            <div>
                <h1>\${display_name}</h1>
                <p>\${user_bio}</p>
            </div>
        </section>`
    );
    insertHTML(
        "https://server-5lrb.onrender.com/dataRepo",
        "main-profile",
        "beforeend",
        `<div class="repositorio">
            <a href=\${url_page}>
                <h2>\${name_repo}</h2>
            </a>
            <div class="info_proyect">
                <div class="section-desplazable">
                    <img  class="image_muro" src="../images/Index.png" alt="">
                    <img  class="image_muro" src="../images/Index.png" alt="">
                    <img  class="image_muro" src="../images/Index.png" alt="">
                </div>
                <p>\${description}</p>
            </div>
        </div>`
    );
});