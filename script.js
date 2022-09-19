document.querySelector('.busca').addEventListener('submit', async(event)=>{
    event.preventDefault(event);

    let input = document.querySelector('#searchInput').value;
    console.log(input);

    if(input!==''){
        clearInfo();
        showWarning('Carregando');
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=34dca9aaf7b5cecb899a0cd34391966f&units=metric&lang=pt_br`

        let results = await fetch(url);
        let json = await results.json();

        console.log(json);

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed:json.wind.speed,
                windDeg:json.wind.deg,

            })
            
        }
        else {
            clearInfo();
            showWarning('Cidade não encontrada');
        }
        

    } else {
        clearInfo();
    }
});

function showInfo(json){
showWarning('');

document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
document.querySelector('.tempInfo').innerHTML = `${json.temp}, <sup>Cº</sup>`;
document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}, <span>KM/H</span>`;

document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`);
document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg-90}deg)`;

document.querySelector('.resultado').style.display = 'block';

};

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
};

function showWarning(msg){

    document.querySelector('.aviso').innerHTML = msg;
    
};

