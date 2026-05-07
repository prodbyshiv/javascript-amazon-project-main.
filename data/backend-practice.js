const xhr = new XMLHttpRequest();
 //creates a new http message
 
xhr.addEventListener('load',()=>{
   console.log(xhr.response);
});
xhr.open('GET','https://supersimplebackend.dev/images/apple.jpg');
xhr.send();