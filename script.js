const imgField = document.getElementById("img");
const inputField = document.getElementById("main-text");
const titleField = document.getElementById("title");
const dateField = document.getElementById("date");
const timeField = document.getElementById("time");
const ImgDownloadUrl = document.getElementById("img-download");
const menu = document.getElementById("menu-icon");
const linkContainer = document.getElementById("links");

const key = 'RJ0L67Mu79gHmwlLAta5C7BhAajbD7Szv8fZgDch'
const copy = document.getElementById("copy");
copy.setAttribute("src", "img/copy.png");



// ------------------------------------------------------------ Navbar ----------------------------------------------------------

linkContainer.style.maxHeight = "0px";
menu.addEventListener("click",()=>{
    console.log("object")
    if(linkContainer.style.maxHeight == "0px"){
        linkContainer.style.maxHeight = "100vh";
    }
    else{
        linkContainer.style.maxHeight = "0px";
    }
})







// ----------------------------------------------------------- API call for nasa data -----------------------------------------------------------
fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
    .then(res => res.json())
    .then(data => {
        // return imgField.src = data.hdurl,
        //    
        // yearField.innerHTML = ,
        // monthField.innerHTML = ,

        dateField.innerHTML = `${data.date.slice(8, 10)}/${data.date.slice(5, 7)}/${data.date.slice(0, 4)}`,
        titleField.innerHTML = data.title,
        inputField.value = data.explanation,
        document.body.style.background = `url(${data.url}) no-repeat center  `,
        document.body.style.backgroundSize = "cover"

        ImgDownloadUrl.href = data.hdurl;
        // console.log(data);
    }
    );


    // --------------------------------------------------- Clock Making --------------------------------------------------------
    function clock() {
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();
        let AMPM = "AM"

        //Am Pm Converter
        AMPM = h >= 12 ? "PM" : "AM"

        // 24 hr into 12 hr format

        h = h > 12 ? h - 12 : h


        // Adding 0 To the Clock if number is less than 10

        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        // Adding value to the html element
        timeField.innerHTML = `${h}:${m}:${s} ${AMPM}`



        //  repeat the same function again and again every 1000 ms (1 second) To update the value of clock every second 
        setTimeout(() => {
            clock();
        }, 1000)
    }
    clock();


// ------------------------------------------------------------ Making Function To Copy Text From text Area ------------------------------------------------------------
copy.addEventListener('click', () => {
    copy.setAttribute("src", "img/check.png");
    inputField.select();
    document.execCommand("copy")
    setInterval(() => {
        copy.setAttribute("src", "img/copy.png");
    }, 6000)
});