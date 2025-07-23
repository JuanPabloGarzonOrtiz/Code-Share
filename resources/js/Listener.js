


//Recibir el mensaje del Iframe y Forzar el Scroll al inicio
window.addEventListener("message", (event) => {
    function tryScroll() {
        const muro = document.querySelector(".muro");
        if (muro) muro.scrollTop = 0;
        else window.scrollTo(0, 0);
        window.focus();
    }
    requestAnimationFrame(tryScroll);
});

//Realizar Filtros
document.addEventListener("btnsFiltros", () => {
    function filtros(division, val_default, val_alter){
        division.addEventListener("click", () => {
            let val_btn = division.querySelector("p");
            const val_btn_origin = val_btn.textContent;
            val_btn.textContent = (val_btn.textContent === val_default) ? 
                                        val_btn.textContent.replace(val_default, val_alter):
                                        val_btn.textContent.replace(val_alter, val_default)
            let muro = document.querySelector(".muro");
            let elements = (muro.querySelector(".proyect")) ? 
                                muro.querySelectorAll(".proyect"):
                                muro.querySelectorAll(".perfil");
            let id;
            let items = Array.from(elements);

            if (val_btn_origin === "Recientes" || val_btn_origin === "Antiguos")
                id = (elements[0].querySelector(".id_repo")) ? ".id_repo" : ".id_user";
            else if (val_btn_origin === "Mas Vistos" || val_btn_origin === "Menos Vistos")
                id = ".count_view"
            
            items.sort((a, b) =>{
                const numA = Number.isNaN(parseInt(a.querySelector(id).value, 10)) ? 0 : parseInt(a.querySelector(id).value, 10);
                const numB = Number.isNaN(parseInt(b.querySelector(id).value, 10)) ? 0 : parseInt(b.querySelector(id).value, 10);
                switch (id) {
                    case ".count_view":
                        return (val_btn_origin === "Mas Vistos") ? (numB - numA): (numA - numB);
                        break;
                    default:
                        return (val_btn_origin === "Recientes") ? (numA - numB): (numB - numA);
                        break;
                }
            });
            muro.innerHTML = "";
            items.forEach(item => muro.appendChild(item));
            window.postMessage({ type: 'iframeLoaded' }, '*');

        });
    }
    
    filtros(document.getElementById("btn_recientes"), "Recientes", "Antiguos");
    filtros(document.getElementById("btn_mas_Vistos"), "Mas Vistos", "Menos Vistos");
});

//Detectar Entradas al Perfil o Proyecto
document.addEventListener("proyect_index", (e) => {
    function fetch_def(url){
        fetch(url)
        .then(response => response.text())
        .then(data => {
            e.detail.done();
        })
    }

    let clicked = e.detail.target;
    if (clicked?.classList.contains("photo_profile")){
        fetch_def(`https://server-5lrb.onrender.com/insertView?url=${encodeURIComponent(clicked.src)}`);
    }else if (clicked?.classList.contains("name_repo")){
        fetch_def(`https://server-5lrb.onrender.com/insertView?proyect=${encodeURIComponent(clicked.innerHTML)}`);
    }
});
