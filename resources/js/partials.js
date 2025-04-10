window.addEventListener("DOMContentLoaded", () =>{
    let path = location.pathname.includes("/resources/views") 
        ? { home: "../../index.html", img: "../images/icon_Page.png", search: "search.html" }
        : { home: "index.html", img: "resources/images/icon_Page.png", search: "resources/views/search.html" };
    document.getElementById("header").insertAdjacentHTML("afterbegin",
                                                        `<header>
                                                            <a href=${path.home}>
                                                                <img src=${path.img} alt="">
                                                            </a>
                                                            <div class="background-input">
                                                                <form method="POST" id="form-search" action="">                                                                    
                                                                    <input type="text" placeholder="Search..." name="busqueda">
                                                                    <button name="buscar">
                                                                        <svg width="30" height="30">
                                                                            <path d="M32.667,35.000L22.167,24.500C21.333,25.167,20.375,25.694,19.292,26.083C18.208,26.472,17.056,26.667,15.833,26.667C12.806,26.667,10.243,25.618,8.146,23.521C6.049,21.424,5.000,18.861,5.000,15.833C5.000,12.806,6.049,10.243,8.146,8.146C10.243,6.049,12.806,5.000,15.833,5.000C18.861,5.000,21.424,6.049,23.521,8.146C25.618,10.243,26.667,12.806,26.667,15.833C26.667,17.056,26.472,18.208,26.083,19.292C25.694,20.375,25.167,21.333,24.500,22.167L35.000,32.667L32.667,35.000ZZM15.833,23.333C17.917,23.333,19.688,22.604,21.146,21.146C22.604,19.688,23.333,17.917,23.333,15.833C23.333,13.750,22.604,11.979,21.146,10.521C19.688,9.063,17.917,8.333,15.833,8.333C13.750,8.333,11.979,9.063,10.521,10.521C9.063,11.979,8.333,13.750,8.333,15.833C8.333,17.917,9.063,19.688,10.521,21.146C11.979,22.604,13.750,23.333,15.833,23.333ZZ" style="fill: rgb(255, 255, 255);"/>
                                                                        </svg>
                                                                    </button>
                                                                </form>
                                                            </div>
                                                            <a href="https://github.com/login/oauth/authorize?client_id=Ov23li6V2cWqtfI5L6bF&redirect_uri=https://server-5lrb.onrender.com/token&scope=user%20repo">
                                                                <svg width="40" height="40" viewBox="1532 -1529.5 50 45">
                                                                    <path d="M1532.000,-1519.500L1532.000,-1524.500C1532.000,-1525.875,1532.490,-1527.052,1533.469,-1528.031C1534.448,-1529.010,1535.625,-1529.500,1537.000,-1529.500L1577.000,-1529.500C1578.375,-1529.500,1579.552,-1529.010,1580.531,-1528.031C1581.510,-1527.052,1582.000,-1525.875,1582.000,-1524.500L1582.000,-1519.500L1577.000,-1519.500L1577.000,-1524.500L1537.000,-1524.500L1537.000,-1519.500L1532.000,-1519.500ZZM1547.000,-1484.500L1547.000,-1489.500L1537.000,-1489.500C1535.625,-1489.500,1534.448,-1489.990,1533.469,-1490.969C1532.490,-1491.948,1532.000,-1493.125,1532.000,-1494.500L1532.000,-1499.500L1537.000,-1499.500L1537.000,-1494.500L1577.000,-1494.500L1577.000,-1499.500L1582.000,-1499.500L1582.000,-1494.500C1582.000,-1493.125,1581.510,-1491.948,1580.531,-1490.969C1579.552,-1489.990,1578.375,-1489.500,1577.000,-1489.500L1567.000,-1489.500L1567.000,-1484.500L1547.000,-1484.500ZZM1557.000,-1509.500ZM1539.000,-1509.500L1545.500,-1516.000L1542.000,-1519.500L1532.000,-1509.500L1542.000,-1499.500L1545.500,-1503.000L1539.000,-1509.500ZZM1575.000,-1509.500L1568.500,-1503.000L1572.000,-1499.500L1582.000,-1509.500L1572.000,-1519.500L1568.500,-1516.000L1575.000,-1509.500ZZ" style="fill: rgb(255, 255, 255);"/>
                                                                </svg>
                                                            </a>
                                                        </header>`);
    const formBusqueda = document.getElementById('form-search');
    formBusqueda.addEventListener('submit', (event) =>{
        event.preventDefault(); 
        const data_input = formBusqueda.busqueda.value;
        window.location.href = `${path.search}?search=${data_input}`
    });
                                                    
    document.getElementById("filtros").innerHTML = `<h1>Filtrar por:</h1>
                                                    <div>
                                                        <svg width="60" height="60" viewBox="0 -960 960 960">
                                                            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" style="fill: rgb(255, 255, 255);"/>
                                                        </svg>
                                                        <p>Usuario</p>
                                                        <p class="reconteo"><strong>10M</strong></p>
                                                    </div>
                                                    <div>
                                                        <svg width="59.38" height="60">
                                                            <path d="M21.896,42.063L29.690,37.313L37.484,42.125L35.442,33.125L42.308,27.125L33.277,26.313L29.690,17.813L26.102,26.250L17.072,27.063L23.938,33.125L21.896,42.063ZZM14.412,52.500L18.432,34.938L4.948,23.125L22.762,21.563L29.690,5.000L36.618,21.563L54.432,23.125L40.947,34.938L44.968,52.500L29.690,43.188L14.412,52.500ZZM29.690,30.625Z" style="fill: rgb(255, 255, 255);"/>
                                                        </svg>
                                                        <p>Mas Vistos</p>
                                                        <p class="reconteo"><strong>50K</strong></p>
                                                    </div>
                                                    <div>
                                                        <svg width="60" height="60">
                                                            <path d="M38.250,41.750L41.750,38.250L32.500,29.000L32.500,17.500L27.500,17.500L27.500,31.000L38.250,41.750ZZM30.000,55.000C26.542,55.000,23.292,54.344,20.250,53.031C17.208,51.719,14.563,49.938,12.313,47.688C10.063,45.438,8.281,42.792,6.969,39.750C5.656,36.708,5.000,33.458,5.000,30.000C5.000,26.542,5.656,23.292,6.969,20.250C8.281,17.208,10.063,14.563,12.313,12.313C14.563,10.063,17.208,8.281,20.250,6.969C23.292,5.656,26.542,5.000,30.000,5.000C33.458,5.000,36.708,5.656,39.750,6.969C42.792,8.281,45.438,10.063,47.688,12.313C49.938,14.563,51.719,17.208,53.031,20.250C54.344,23.292,55.000,26.542,55.000,30.000C55.000,33.458,54.344,36.708,53.031,39.750C51.719,42.792,49.938,45.438,47.688,47.688C45.438,49.938,42.792,51.719,39.750,53.031C36.708,54.344,33.458,55.000,30.000,55.000ZZM30.000,30.000ZM30.000,50.000C35.542,50.000,40.260,48.052,44.156,44.156C48.052,40.260,50.000,35.542,50.000,30.000C50.000,24.458,48.052,19.740,44.156,15.844C40.260,11.948,35.542,10.000,30.000,10.000C24.458,10.000,19.740,11.948,15.844,15.844C11.948,19.740,10.000,24.458,10.000,30.000C10.000,35.542,11.948,40.260,15.844,44.156C19.740,48.052,24.458,50.000,30.000,50.000ZZ" style="fill: rgb(255, 255, 255);" class="fills"/></svg>
                                                        <p>Recientes</p>
                                                        <p class="reconteo"><strong>1K</strong></p>
                                                    </div>`;
});


