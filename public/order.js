document.addEventListener("DOMContentLoaded",()=>{
    let img=document.querySelectorAll(".circle")
    let line=document.querySelector(".line")
    let txt= document.querySelectorAll(".hi")
    let lin2=document.querySelector(".lin2")
    line.style.height="350px"
    lin2.style.height="600px"
    img.forEach((element,idx) => {
      setTimeout(()=>{
        element.style.width="65px"
        txt[idx].style.color="black"
      },800*idx)
    
})

})