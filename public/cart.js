
document.addEventListener("DOMContentLoaded",function(){//let tge pg fully load
    let pay=this.querySelector(".pay")
let rembtn= document.querySelectorAll(".rembtn")

rembtn.forEach(element => {
    element.addEventListener("click",function(e){
   let prod=e.currentTarget.getAttribute("data-product-id")
   let path=window.location.href
    fetch(`${path}/remove`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({prod})
    })
    .then(res=> res.json())
    .then(data=>{
        alert('Product removed!')
        window.location.href=path
    })
})

})

pay.addEventListener("click",()=>{
   let path=window.location.href
    path=path.split('/')
    console.log(path)
  
  
    if(path.length==4){
        window.location.href=window.location.href+"/orders"
    }
    else{
        path.pop()
        window.location.href=`/${path[path.length-1]}/orders`
    }
})
})


