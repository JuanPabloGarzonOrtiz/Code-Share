window.addEventListener("DOMContentLoaded", () =>{
    fetch("https://server-5lrb.onrender.com/dataUser")
    .then(response => response.text())
    .then(data => {
        document.getElementById("name_User").innerHTML = data;
    })
});