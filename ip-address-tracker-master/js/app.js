const form = document.querySelector('form')
const ip = document.querySelector('.ip')
const loc = document.querySelector('.loc')
const time = document.querySelector('.time')
const isp = document.querySelector('.isp')


form.addEventListener('submit',async function(e){
    e.preventDefault();
    const data = await getData(e.target.children['0'].value)
    console.log(data)
    if(data.code === 422){
        return alert('Masukkan domain atau ip yang valid')
    }
    getMaps(data)
    ip.innerHTML = data.ip
    loc.innerHTML = `${data.location.city}, ${data.location.region}`
    time.innerHTML = `UTC${data.location.timezone}`
    isp.innerHTML = data.isp
})

function getData(val){
    return fetch(`https://geo.ipify.org/api/v1?apiKey=at_k2BrqfJZOOOMtk3CT6R2T5yzAgEjI&domain=${val}`)
            .then(response => response.json())
            .then(data => data)
}
var map,icons,marker;
function getMaps(val){
    if(map != undefined){
        map.remove()
    }
    map = L.map('map', {zoomControl: false}).setView([val.location.lat,val.location.lng],15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    
    icons = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize: [20, 25],
    })
    
    
    marker = L.marker([val.location.lat,val.location.lng], {icon: icons}).addTo(map)
}

async function onload(){
    const data = await getData("")
    getMaps(data)
    ip.innerHTML = data.ip
    loc.innerHTML = `${data.location.city}, ${data.location.region}`
    time.innerHTML = `UTC${data.location.timezone}`
    isp.innerHTML = data.isp
}
onload()