function insertHTML(ruta_Server, contenedor, position, htmlTemplate){
    const params = new URLSearchParams(window.location.search);
    return fetch(ruta_Server)
    .then(response => response.json())
    .then(data =>{
        const data_Search = (params.get('name')) ? params.get('name'): params.get('search');
        var user_Search = data.find(element => element.display_name === data_Search)

        if (contenedor == "main-profile"){
            if (htmlTemplate.includes('id="presentacion"')){
                let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => user_Search[key.trim()] || '');
                document.getElementById(contenedor).insertAdjacentHTML(position, html);
                return 
            }else if (htmlTemplate.includes('class="repositorio"')){
                for (let element of data){ 
                    
                    if (element.display_name == data_Search){
                        let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => element[key.trim()] || '');
                        document.getElementById(contenedor).insertAdjacentHTML(position, html);
                        insert_Iframe(element);
                    }
                }
                //Modificacion de Publicaciones con un solo Iframe
                modify_iframe();
            }
        }else if (contenedor == "muro-index"){ 
            for (let element of data){
                let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => element[key.trim()] || '');
                
                let template = document.createElement('template');
                template.innerHTML = html.trim();
                let htmlNode = template.content.firstElementChild;
                
                if (element.urls_pages.split(',').length == 1){
                    htmlNode.querySelector('.left').remove();
                    htmlNode.querySelector('.right').remove();
                }
                document.getElementById(contenedor).insertAdjacentHTML(position, htmlNode.outerHTML);
                insert_Iframe(element);
            }


        }else if (contenedor == "muro-search"){
            if (user_Search){
                let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => user_Search[key.trim()] || '');
                document.getElementById(contenedor).insertAdjacentHTML(position, html);
            }else{
                for (let element of data){
                    let html = htmlTemplate.replace(/\$\{(.*?)\}/g, (match, key) => element[key.trim()] || '');
                    document.getElementById(contenedor).insertAdjacentHTML(position, html);
                }
            }
        }
    })
}
function move_imgs(){
    setTimeout(() => {
        const proyectos = document.querySelectorAll('.proyect');
        proyectos.forEach(proyect => {
            const btnLeft = proyect.querySelector('.left')
            const btnRight = proyect.querySelector('.right')
            const container = (proyect.querySelector('.section_imgs')) ? proyect.querySelector('.section_imgs') : proyect.querySelector('.section-desplazable')

            if(container && btnLeft && btnRight){  
                const img = container.querySelector('img');
                const elementsWifth = (img) ? img.offsetWidth : container.querySelector('iframe').offsetWidth;
                const gap = parseInt(getComputedStyle(container).gap) || 0;
                const totalMove = elementsWifth + gap;

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

function insert_Iframe(element){
    if (element.urls_pages){
        let urls = (element.urls_pages.includes(","))
            ? element.urls_pages.split(",").map(url => url.trim())
            : [element.urls_pages]
        let html_iframes = urls.map((url, i) => {
            const iframeId = `iframe_${element.name_repo}_${i}`;
            return `<div><iframe id="${iframeId}" src="${url}" tabindex="-1" onload="window.postMessage({type:'iframeLoaded'},'*')"></iframe></div>`;
        }).join('');

        const div = document.getElementById(element.name_repo);
        if (div){
            div.innerHTML = html_iframes
        }
    }
}

function modify_iframe(){
    section = document.getElementsByClassName("section-desplazable");
                for (let element of section) {
                    let divs = Array.from(element.children).filter(child => child.tagName === "DIV");
                    if (divs.length === 1){ 
                        let iframe = divs[0].querySelector("iframe");
                        if (iframe){
                            if (window.innerWidth <= 1200) iframe.style.width = "clamp(300px, 87vw, 1100px)";
                            else iframe.style.width = "clamp(300px, 60vw, 1100px)";
                            
                        }
                    }
                }
}
window.addEventListener("resize", modify_iframe);


//Event Redireccion y Registro de Vista
function event_Proyect_index(event, url){
    event.preventDefault();
    setTimeout(() => {
        const doneEvent = new CustomEvent("proyect_index", {
            detail: {
                target: event.target,
                done: () => window.location.href = url
            }
        });
        document.dispatchEvent(doneEvent);
    }, 500);
}

window.addEventListener("DOMContentLoaded", () => {
    var name_plantilla = window.location.pathname.split('/').pop().replace(".html","")
    if (name_plantilla === "index"){
        insertHTML(
            "https://server-5lrb.onrender.com/dataRepo",
            "muro-index",
            "beforeend",
            `<div class="proyect">
                <input type="hidden" class="id_repo" value="\${id_repo}">
                <input type="hidden" class="count_view" value="\${vistas}">
                <div class="div_ln">
                    <a onclick="event_Proyect_index(event, '\${url_page}')">
                        <h1 class="name_repo">\${name_repo}</h1>
                    </a>
                    <a onclick="event_Proyect_index(event, 'resources/views/profile.html?name=\${display_name}')">
                        <img class="photo_profile" src="\${photo_user}">
                    </a>
                </div>
                <div class="container">
                    <button class="left">                
                        <svg width="60" height="100" viewBox="25 10 40 70">
                            <path d="M58.333,75.000L33.333,50.000L58.333,25.000L64.167,30.833L45.000,50.000L64.167,69.167L58.333,75.000ZZ" class="fills"/>
                        </svg>
                    </button>
                    <div class="section_imgs" id=\${name_repo}>
                        <img class="image_muro" src="resources/images/default_image.jpg" alt="">
                    </div>
                    <button class="right">                
                        <svg width="60" height="100" viewBox="25 10 40 70">
                            <path d="M52.500,50.000L33.333,30.833L39.167,25.000L64.167,50.000L39.167,75.000L33.333,69.167L52.500,50.000ZZ" class="fills"/>
                        </svg>
                    </button>
                </div>
                <p>\${description}</p>
            </div>`
        )
        move_imgs();


    }else if(name_plantilla === "search"){
        insertHTML(
            "https://server-5lrb.onrender.com/dataUser",
            "muro-search",
            "beforeend",
            `<div class="perfil">
                <input type="hidden" class="id_user" value="\${id_user}">
                <input type="hidden" class="count_view" value="\${vistas}">
                <a onclick="event_Proyect_index(event, 'profile.html?name=\${display_name}')">
                    <img class="photo_profile" src="\${photo_user}" alt="">
                </a>
                <div>
                    <h1>\${display_name}</h1>
                    <p>\${user_bio} </p>
                </div>
            </div>`
        );
    }else if(name_plantilla === "profile"){
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
        ).then(()=>{
            insertHTML(
                "https://server-5lrb.onrender.com/dataRepo",
                "main-profile",
                "beforeend",
                `<div class="repositorio">
                    <a href=\${url_page}>
                        <h2>\${name_repo}</h2>
                    </a>
                    <div class="info_proyect">
                        <div class="section-desplazable" id=\${name_repo}>
                            <img  class="image_muro" src="../images/default_image.jpg" alt="">
                        </div>
                        <p>\${description}</p>
                    </div>
                </div>`
            );
        })
    }
});