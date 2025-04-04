window.addEventListener("DOMContentLoaded", () =>{
    let section = document.getElementById("muro");
    fetch("https://server-5lrb.onrender.com/dataUser")
    .then(response => response.json())
    .then(data => {
        data.forEach(usuario => {
            section.insertAdjacentHTML("beforeend",
                                        `<div class="perfil">
                                            <a href="profile.html"><img width="150" height="150" src="${usuario.photo_user}" alt=""></a>
                                            <div>
                                                <h1>${usuario.display_name}</h1>
                                                <p>${usuario.user_bio} </p>
                                            </div>
                                        </div>`);
        });
    })
});