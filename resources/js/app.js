window.addEventListener("DOMContentLoaded", () =>{
    fetch("/dataUser")
    .then(response => response.text())
    .then(data => {
        document.getElementById("name_User").innerHTML = data;
    })
});