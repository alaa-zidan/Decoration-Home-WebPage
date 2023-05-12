//Toggle spin class on Icon
document.querySelector(".toggle-spin .fa-gear").onclick=function(){
   this.classList.toggle("fa-spin");
   document.querySelector(".settings-box").classList.toggle("open");
}
//chose yes as an initial value
let backgroundoption =true;
//variable to control the interval
let backgroundinterval;
randomizimage();

let randmlocalitem=localStorage.getItem("background-option")
if(randmlocalitem !==null){
if(randmlocalitem ==='true'){
   backgroundoption=true;
}
else{
   backgroundoption=false;
   clearInterval(backgroundinterval);
}
document.querySelectorAll(".randmback span").forEach(ele=>{
   ele.classList.remove("active")
});
if(randmlocalitem==='true'){
   document.querySelector(".randmback .yes").classList.add("active");
}
else{
   document.querySelector(".randmback .no").classList.add("active");
}
}

//check if there is local storage color option
let maincolor=localStorage.getItem("color")
if(maincolor !== null){
    document.documentElement.style.setProperty('--main-color',maincolor)

 //remove active class from all list items
 document.querySelectorAll(".colors-list li").forEach(ele=>{
    ele.classList.remove("active");

    //add active class to the color which you last chose and its data in local storage
    if(ele.dataset.color===maincolor){
        ele.classList.add("active")
    }
    
 })
}

//switch colors
const colorsli=document.querySelectorAll(".colors-list li");
//Loop on all list items
colorsli.forEach(li=>{
    //click on every list items
 li.addEventListener("click",(e)=>{
    //set color on root in css
    document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
     //Add color to local storage
     localStorage.setItem("color",e.target.dataset.color)
     //remove active class from all childerns
    handelactive(e);
 });
});

//switch background
//checck if the randombackground has a value in the local storage

const backoption=document.querySelectorAll(".randmback span");
//Loop on all spans
backoption.forEach(span=>{
    //click on every span
    span.addEventListener("click",(e)=>{
     //remove active class from all childerns
     handelactive(e);
    if(e.target.dataset.background==='yes'){
        backgroundoption=true;
        randomizimage();
        localStorage.setItem("background-option",true)
     }
     else{
        backgroundoption=false;
        clearInterval(backgroundinterval);
        localStorage.setItem("background-option",false)
     }
 });

});



//Random Background funaction


//Select landing page
let landingpage=document.querySelector(".landing-page");

//Get Array Of Images
let imgsarray=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];

function randomizimage(){
if (backgroundoption===true){
    backgroundinterval=setInterval(()=>{
        //Get Random Number
        let randnum=Math.floor(Math.random()*imgsarray.length);
        //Change Background Image Url
        landingpage.style.backgroundImage = 'url("img/'+imgsarray[randnum]+'")'
        
        },1000);
}
}

//select skills selectors
let ourskills=document.querySelector(".skills");
window.onscroll=function(){
  //skills offset top
  let skillsOffsetTop=ourskills.offsetTop;
  // Skills Outer hight
  let skillsOuterHight=ourskills.offsetHeight;
  //Window Hight
  let windowHeight=this.innerHeight;
  //window scroll top
  let windowScrollTop=this.pageYOffset;
  if(windowScrollTop >(skillsOffsetTop+skillsOuterHight-windowHeight)){
   let allskills=document.querySelectorAll(".skill-box .skill-progress span");
   allskills.forEach(skill=>{
      skill.style.width=skill.dataset.progress;
   })
  }
}

//Create popup with  Every Image
let ourGallery=document.querySelectorAll(".gallery img")
 ourGallery.forEach(img=>{
   img.addEventListener('click',(e)=>{
   //create overlay elemnt
   let overlay=document.createElement("div")
   //Add class to overlay
   overlay.className='popup-overlay';
   //append overlay to thee body
   document.body.appendChild(overlay);
   //create popup box
   let popupbox=document.createElement("div")
   //add calss to the popup box
   popupbox.className='popup-box';
   
   if(img.alt !== null){
      //creat headind
      let imgHeader=document.createElement("h3");

      //create text heading
      let imgText=document.createTextNode(img.alt)
       //Append the text to the heading
       imgHeader.appendChild(imgText)
        //Append the Header to the popup-box
        popupbox.appendChild(imgHeader)
   }
   //create the img
   let popupimg=document.createElement("img");
   //set img source
   popupimg.src = img.src ;
   //add img to popupbpx
   popupbox.appendChild(popupimg)
   document.body.appendChild(popupbox)

   //create the close span
   let closebutton=document.createElement("span")
   //add text to span
   let xtext=document.createTextNode("X")
   //Append xtext to the close span
   closebutton.appendChild(xtext)
   //add clast to tle close button
   closebutton.className='close-button'
   //Append the closebutton to the popup-box
   popupbox.appendChild(closebutton);

   });
 });

 //Close popup
 document.addEventListener("click",function(e){
   if(e.target.className === 'close-button'){
      //Remove The current popup
      e.target.parentElement.remove();

      //Remove Overlay
      document.querySelector(".popup-overlay").remove();
   }
 })

 //select All BUllets
 const allbullets=document.querySelectorAll(".nav-bullets .bullet")
//select All Links
const alllinks=document.querySelectorAll(".links a")

//create function go to spicilized section
function gotospicilized(elements){
   elements.forEach(ele=>{
      ele.addEventListener("click",(e)=>{
         e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
         behavior:'smooth'
      })
      });
   
    });
}

gotospicilized(allbullets);
gotospicilized(alllinks);

//function handel active state
function handelactive(ev){
   ev.target.parentElement.querySelectorAll(".active").forEach(ele=>{
      ele.classList.remove("active");
      
   })
  //add active class on e.target
  ev.target.classList.add("active") ;
}

//bullets show option
 let bulletsspan=document.querySelectorAll(".option-box .bullets-option span")
 let bulletscontainer=document.querySelector(".nav-bullets")
 let bulletlocalitem=localStorage.getItem("bullets-option");
 if(bulletlocalitem !==null){
   bulletsspan.forEach(span=>{
      span.classList.remove("active");
   });
   if(bulletlocalitem==='block'){
     bulletscontainer.style.display='block'
     document.querySelector(".bullets-option .yes").classList.add("active");
   }
   else{
      bulletscontainer.style.display='none'
      document.querySelector(".bullets-option .no").classList.add("active");
   }
   }
 
 bulletsspan.forEach(span=>{
   span.addEventListener("click",(e)=>{
      if(span.dataset.display==='show'){
      bulletscontainer.style.display='block'
      localStorage.setItem("bullets-option",'block')
      }
      else{
         bulletscontainer.style.display='none' 
         localStorage.setItem("bullets-option",'none')
      }
      handelactive(e)
    })
 });

 //Reset BUtton
 document.querySelector(".reset").onclick=function(){
// localStorage.clear();
localStorage.removeItem("background-option");
localStorage.removeItem("color");
localStorage.removeItem("bullets-option");
window.location.reload();
 }

 //Toggle menu
 let togglebtn=document.querySelector(".toggle-menu");
 let tlinks=document.querySelector(".links");
 togglebtn.onclick = function(e){

   //stop propagation
   e.stopPropagation();

   this.classList.toggle("menu-active")
   tlinks.classList.toggle("open")
 }
 document.addEventListener("click",(e)=>{
   if(e.target !== togglebtn && e.target !== tlinks){
      //check if menu is open
      if(tlinks.classList.contains("open")){
         togglebtn.classList.toggle("menu-active")
         tlinks.classList.toggle("open") 
      }
   }
 
 })
 //stop propagation on mnue
 tlinks.onclick=function(e){
   e.stopPropagation();
 }
//  document.body.onclick=function(){
//    togglebtn.classList.remove("menu-active");
//    tlinks.classList.remove("open")
//  }
 