let product=document.querySelectorAll(".name")

let cart=document.querySelector(".cart")
cart.addEventListener("click",async()=>{
    let path=window.location.href
    path=path.split('/')
    console.log(path)
  
  
    if(path.length==4){
        window.location.href=window.location.href+"/cart"
    }
    else{
        path.pop()
        window.location.href=`/${path[path.length-1]}/cart`
    } 
})
product.forEach(element => {
    element.addEventListener("click",()=>{

        console.log(element.innerHTML.split('<b>')[1].split("</b>")[0])
       let path= window.location.href
       window.location.href=path+`/${element.innerHTML.split('<b>')[1].split("</b>")[0]}`
    })
})

let order= document.querySelector(".order")

order.addEventListener("click",()=>{
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

