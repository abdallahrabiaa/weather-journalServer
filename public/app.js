const APIKey="3fea0a82431e3ed09d45dc925a98fae7";
const locationButton=document.getElementById('locationButton');
const ZipButton= document.getElementById('zipCodeButton');
 async function getPosition(pos){
    const lat= pos.coords.latitude;
    const lon=pos.coords.longitude;
    try{
    const fetched= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`);
    const data= await fetched.json();
   console.log(data.main);
   const main = data.main;
   const mainWeather= data.weather[0].main;
   const container = document.createElement('section');
   container.className="dataCountinar";
   container.classList.add('scale-in-tr');
   document.body.append(container);
   const datacell=document.createElement('div');
   console.log(main);
   datacell.className="datacell";
   datacell.innerHTML = `<h2 class="typo"><p>weather:</p>${mainWeather}</h2><img alt="weather" src="imgs/003-rainbow.svg">`;
   container.append(datacell);
   for (let key in main) {
       const value = main[key];

       console.log(`${key}:${value}`);
       const datacell = document.createElement('div');
       datacell.className = "datacell";
       switch (key){
           case "temp" :
               datacell.innerHTML = `<h2 class="typo"><p>temp:</p>${value}</h2><img alt="${key}" src="imgs/042-farenheit.svg">`;
               container.append(datacell);
               break;
           case "pressure":
               datacell.innerHTML = `<h2 class="typo"><p>pressure:</p>${value}</h2><img alt="${key}" src="imgs/025-graph.svg">`;
               container.append(datacell);
               break;
           case "humidity":
               datacell.innerHTML = `<h2 class="typo"><p>humidity:</p>${value}</h2><img alt="${key}" src="imgs/033-condensation.svg">`;
               container.append(datacell);
               break;

       }

   }
  
    }
     
    catch(erorr){
        console.log(erorr);
    }

 }



function makeForm (){
     const form = document.createElement('form');
     form.action="";
     form.method="Post";
     form.className='scale-in-tr';
     form.classList.add('form');
     const submit =document.createElement('input');
     submit.type="submit";
     submit.className="input";
     submit.value= "generate";
     submit.className="input";
     submit.id="generate";

     const ZipInput = document.createElement('input');
     ZipInput.name="ZipCode";
     ZipInput.placeholder="type your Zip Code";
     ZipInput.type="number";
     ZipInput.className="input";
     const whatFeeling= document.createElement('textarea');
     whatFeeling.type="text";
     whatFeeling.className="input";
     whatFeeling.placeholder="what is your feeling !";
     whatFeeling.id="feelings";
     form.append(ZipInput);
     form.append(whatFeeling);
     form.append(submit);
    document.body.append(form);
    form.addEventListener('submit',event=>{
        event.preventDefault();
        const ZipCode =ZipInput.value;
        const Feeling =whatFeeling.value;
 getByZip(ZipCode,Feeling).then(data=>{
     postByZip(data).then(newOne=>{
        ZipUpdateUI(Feeling);
     })

})
 
    })

}
 async function getByZip(zipCode,feeling) {
     try{
        const fetched = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKey}`);
     const data = await fetched.json();
     const main = data.main;
     const mainWeather= data.weather[0].main;
     return {main,mainWeather,feeling};
     
    }
     catch(erorr){
        console.log(erorr)
    }


 }

async function postByZip(data){
    const postContent= await fetch('http://localhost:4000/allData',{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
}



locationButton.addEventListener('click',(e)=>{
    //delete the get climent Uis
    const AllChooseOne= document.querySelectorAll('.chooseOne');
    AllChooseOne.forEach(div=>div.style.display="none");
    //createForm for get data to fetch the All about it
   navigator.geolocation.getCurrentPosition(getPosition);

})
ZipButton.addEventListener('click',(e)=>{
    //delete the get climent Uis
    const AllChooseOne= document.querySelectorAll('.chooseOne');
    AllChooseOne.forEach(div=>div.style.display="none");
 makeForm();
})



// async function postDatatoSever( dataObject){
//     console.log(dataObject);
//  const PostWeather = await fetch('http://localhost:4000/getData',{
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//  body: JSON.stringify(dataObject),

// })
// // const weathearData= await PostWeather.json();
// // console.log(weathearData)
// // return weathearData;
// }

 async function ZipUpdateUI(feels){
     const fetched= await fetch('http://localhost:4000/getData');
     const data = await fetched.json();
     console.log(data);
    const container = document.createElement('section');
     container.className="dataCountinar";
     container.classList.add('scale-in-tr');
       const form = document.querySelector('.form');
    form.remove();
      document.body.append(container);
      const datacell=document.createElement('div');
     const feelings =document.createElement('div');
     feelings.className='datacell';
     feelings.innerHTML= `<h2 class="typo"><p>feels:</p>${feels}</h2><img alt="feels" src="imgs/016-compass.svg">`;
     container.append(feelings);

      datacell.className="datacell";
     datacell.innerHTML = `<h2 class="typo"><p>weather:</p>${data.mainWeather}</h2><img alt="weather" src="imgs/003-rainbow.svg">`;
     container.append(datacell);
     for (let key in data.main) {
         const value = data.main[key];

         console.log(`${key}:${value}`);
         const datacell = document.createElement('div');
         datacell.className = "datacell";
         switch (key){
             case "temp" :
                 datacell.innerHTML = `<h2 class="typo"><p>temp:</p>${value}</h2><img alt="${key}" src="imgs/042-farenheit.svg">`;
                 container.append(datacell);
                 break;
             case "pressure":
                 datacell.innerHTML = `<h2 class="typo"><p>pressure:</p>${value}</h2><img alt="${key}" src="imgs/025-graph.svg">`;
                 container.append(datacell);
                 break;
             case "humidity":
                     datacell.innerHTML = `<h2 class="typo"><p>humidity:</p>${value}</h2><img alt="${key}" src="imgs/033-condensation.svg">`;
                     container.append(datacell);
                     break;
                   
                        


         }

     }
    }
