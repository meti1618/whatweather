// select dom

const searchBtn =document.querySelector('.aside-content__header__search-btn');
const searchInput = document.querySelector('.aside-content__header__search-input') ; 
const alertText = document.querySelector('.alert');
const tempItem = document.getElementById('temp')
const cityItem = document.getElementById('city')
const timeItem = document.getElementById('time')
const dataItem = document.getElementById('data')
const iconItem = document.getElementById('icon')
const iconStatusItem = document.getElementById('icon-status')
const cloudyRangeItem = document.getElementById('cloudyRange')
const humiditiyRangeItem = document.getElementById('humiditiyRange')
const windRangeItem = document.getElementById('windRange')
const fallTypeItem = document.getElementById('fallType')
const fallRangeItem = document.getElementById('fallRange')

// get api

const apiKey = '4f8ee9370073b2449681b2350a61dbd9' ;
function sendResponse (city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(result=>{
      if (result.cod === "404"){
        alertText.style.display = 'flex'
        setTimeout(() => {
            alertText.style.display = 'none'
        }, 4000);
      }else{
          setWeatherDataInDom(result)
      }
    }
    )
}
searchBtn.addEventListener('click' , () =>{
    searchInput.classList.toggle('active')
})

searchInput.addEventListener('keyup' , (e) =>{
    if(e.keyCode === 13){
        e.preventDefault()
        sendResponse(searchInput.value)
    }
})

function setWeatherDataInDom(result){
//    set var
let d = new Date();
let temp = Math.floor(result.main.temp - 273.15 );
let cityName = result.name;
let year = String(d.getFullYear()).slice(0,2)
let month = d.getMonth()
let UTCday = d.getUTCDate();
let day = d.getDay()
let hour = d.getHours() ;
let minute = d.getMinutes()
let resultMonth;
let resultDay;
let icon =`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
let weatherStatus = result.weather[0].main;
let weatherCloudy = `${result.clouds.all}%`
let weatherHumidity = `${result.main.humidity}%`
let weatherWind = `${Math.floor(result.wind.speed)}km/h`
let dayNight = String(result.weather[0].icon.slice(2,3)); 
console.log(result)
let weatherRain;
let weatherSnow
 
// Condition
switch (month) {
    case 0:
        resultMonth = 'January ';
        break;
    case 1:
        resultMonth = 'February ';
        break;
    case 2:
        resultMonth = 'March ';
        break;
    case 3:
        resultMonth = 'April ';
        break;
    case 4:
        resultMonth = 'May ';
        break;
    case 5:
        resultMonth = 'June  ';
        break;
    case 6:
        resultMonth = 'July ';
        break;
    case 7:
        resultMonth = 'August  ';
        break;
    case 8:
        resultMonth = 'September  ';
        break;
    case 9:
        resultMonth = 'October   ';
        break;  
    case 10:
        resultMonth = 'November   ';
        break; 
    case 11:
        resultMonth = 'December  ';
        break;                                                                                                                    
    default:
        break;
}
switch (day) {
    case 0:
        resultDay ='Sunday';
        break;
    case 1:
        resultDay ='Monday';
        break; 
    case 2:
        resultDay ='Tuesday';
        break;   
    case 3:
        resultDay ='Wednesday';
        break;    
    case 4:
        resultDay ='Thursday';
        break;    
    case 5:
        resultDay ='Friday';
        break;    
    case 6:
        resultDay ='Saturday';
        break;
    default:
        break;
}
if(result.rain){
    fallTypeItem.innerText = 'rain' 
    fallRangeItem.innerText = result.rain['1h']+'mm';
}
if(result.snow){
    fallTypeItem.innerText = 'snow' 
    fallRangeItem.innerText = result.snow[`1h`]+'mm';
} 

resultMonth = resultMonth.slice(0,3)
    tempItem.innerText = temp+'°';
    cityItem.innerText = cityName;
    timeItem.innerText = `${hour+':'+minute}`
    dataItem.innerText = `${resultDay+', '+UTCday+' '+resultMonth+'`'+year}`
    iconItem.setAttribute('src' , icon ) ;
    iconStatusItem.innerText = weatherStatus;
    cloudyRangeItem.innerText = weatherCloudy;
    humiditiyRangeItem.innerText = weatherHumidity;
    windRangeItem.innerText = weatherWind;
    setInterval(() => {
        timeItem.innerText = `${hour+':'+minute}`
        dataItem.innerText = `${resultDay+', '+UTCday+' '+resultMonth+'`'+year}`
    }, 1000*60);



// set background and colors

switch (result.weather[0].main) {
    case 'Clear':
        if(dayNight === 'd'){
             document.body.style.backgroundImage = `url('./ClearSky2.jpg')`;
             searchBtn.style.backgroundColor = '#74ADFA'
             searchInput.style.backgroundColor ='#74ADFA'
        }if(dayNight === 'n'){
             document.body.style.backgroundImage = `url('./nightClearSky.jpg')`;  
             searchBtn.style.backgroundColor = '#19363A'
             searchInput.style.backgroundColor = '#19363A'
        }
        break;
    case 'Clouds':
        if(dayNight === 'd'){
           if(result.clouds.all > 50){ 
                document.body.style.backgroundImage = `url('./cloudSky.jpg')`;
                searchBtn.style.backgroundColor = '#EF7439'
                searchInput.style.backgroundColor = '#EF7439'
            }else if (result.clouds.all < 50) {
                document.body.style.backgroundImage = `url('./fewCloudSky.jpg')`
                searchBtn.style.backgroundColor = '#86ACC1'
                searchInput.style.backgroundColor = '#86ACC1'
            }    
        }if(dayNight === 'n'){
            if(result.clouds.all > 50){ 
                document.body.style.backgroundImage = `url('./nightCloudSky.jpg')`;
                searchBtn.style.backgroundColor = '#A6A6A6'
                searchInput.style.backgroundColor = '#A6A6A6'
            }else if (result.clouds.all < 50) {
                document.body.style.backgroundImage = `url('./nightFewCloudSky.jpg')`;
                searchBtn.style.backgroundColor = '#26393F'
                searchInput.style.backgroundColor = '#26393F'
            }   
        }
    break;
    case 'Snow':
        if(dayNight === 'd'){
                document.body.style.backgroundImage = `url('./snowy.jpg')`;
                searchBtn.style.backgroundColor = '#977A74'
                searchInput.style.backgroundColor ='#977A74'
        }if(dayNight === 'n'){
                document.body.style.backgroundImage = `url('./nightSnow.jpg')`;  
                searchBtn.style.backgroundColor = '#02315D'
                searchInput.style.backgroundColor = '#02315D'
        }
        break;
    case 'Rain':
        if(dayNight === 'd'){
                document.body.style.backgroundImage = `url('./rain.jpg')`;
                searchBtn.style.backgroundColor = '#566A6B'
                searchInput.style.backgroundColor ='#566A6B'
        }if(dayNight === 'n'){
                document.body.style.backgroundImage = `url('./nightRain.jpg')`;  
                searchBtn.style.backgroundColor = '#829F9A'
                searchInput.style.backgroundColor = '#829F9A'
        }
        break;
    case 'Mist' && 'Haze':
        document.body.style.backgroundImage = `url('./mist.jpg')`;
        searchBtn.style.backgroundColor = '#405061'
        searchInput.style.backgroundColor = '#405061'
        break;    
    default:
        break;
}


}
sendResponse('tehran')



document.querySelectorAll('.asice-content__famous-citys__city').forEach((e) =>{
   e.addEventListener('click' , () => {
       sendResponse(`${e.innerText}`)
    }
   )
} )