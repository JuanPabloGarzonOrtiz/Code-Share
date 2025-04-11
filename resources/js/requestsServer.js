function insertHTML(ruta_Server, contenedor, position, htmlTemplate){
    const params = new URLSearchParams(window.location.search);
    fetch(ruta_Server)
    .then(response => response.json())
    .then(data =>{
        const params = new URLSearchParams(window.location.search);
        const data_Search =  params.get('search');
        const nombre = params.get('name');  
        var user_Search = data.find(element => element.display_name === data_Search)
        var user_Profile = data.find(element => element.display_name === nombre)
        if (contenedor == "main-profile"){
            if (htmlTemplate.includes('id="presentacion"')){
                let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => user_Profile[key.trim()] || '');
                document.getElementById(contenedor).insertAdjacentHTML(position, html);
                return
            }else if (htmlTemplate.includes('class="repositorio"')){
                for (let element of data){
                    if (element.display_name == nombre){
                        let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => element[key.trim()] || '');
                        document.getElementById(contenedor).insertAdjacentHTML(position, html);
                    }
                }
            }
        }else if (contenedor == "muro-index" || !user_Search){
            for (let element of data){
                let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => element[key.trim()] || '');
                document.getElementById(contenedor).insertAdjacentHTML(position, html);
            }
        }else if (contenedor == "muro-search" && user_Search){
            let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => user_Search[key.trim()] || '');
            document.getElementById(contenedor).insertAdjacentHTML(position, html);
        }
    })
}
function move_imgs(){
    setTimeout(() => {
        const proyectos = document.querySelectorAll('.proyect');
        proyectos.forEach(proyect => {
            const btnLeft = proyect.querySelector('.left')
            const btnRight = proyect.querySelector('.right')
            const container = proyect.querySelector('.section_imgs')

            if(btnLeft && btnRight && container){
                const imageWidth = container.querySelector('img').offsetWidth;
                const gap = parseInt(getComputedStyle(container).gap) || 0;
                const totalMove = imageWidth + gap;

                btnLeft.addEventListener('click', () => {
                    container.scrollBy({ left: -totalMove, behavior: 'smooth' });
                });
                btnRight.addEventListener('click', () => {
                    container.scrollBy({ left: totalMove, behavior: 'smooth' });
                });
            }
        })
    }, 500)
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
            <div class="container">
                <button class="left">                
                    <svg width="60" height="100" viewBox="25 10 40 70">
                        <path d="M58.333,75.000L33.333,50.000L58.333,25.000L64.167,30.833L45.000,50.000L64.167,69.167L58.333,75.000ZZ" style="fill: rgb(255, 255, 255);" class="fills"/>
                    </svg>
                </button>
                <div class="section_imgs">
                    <img class="image_muro" src="resources/images/default_image.jpg" alt="">
                    <img class="image_muro" src="resources/images/default_image.jpg" alt="">
                    <img class="image_muro" src="resources/images/default_image.jpg" alt="">
                    <img class="image_muro" src="resources/images/default_image.jpg" alt="">
                </div>
                <button class="right">                
                    <svg width="60" height="100" viewBox="25 10 40 70">
                        <path d="M52.500,50.000L33.333,30.833L39.167,25.000L64.167,50.000L39.167,75.000L33.333,69.167L52.500,50.000ZZ" style="fill: rgb(255, 255, 255);" class="fills"/>
                    </svg>
                </button>
            </div>
            <p>\${description}</p>
        </div>`
    );
    move_imgs();
    
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
            <a href="https://github.com/\${user_name}">
                <img src="\${photo_user}">
            </a>
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
                    <img  class="image_muro" src="../images/default_image.jpg" alt="">
                    <img  class="image_muro" src="../images/default_image.jpg" alt="">
                    <img  class="image_muro" src="../images/default_image.jpg" alt="">
                </div>
                <p>\${description}</p>
            </div>
        </div>`
    );
});