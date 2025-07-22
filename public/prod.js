let addcart= document.querySelector(".addcart")
let btn=document.querySelector(".buy")

btn.addEventListener("click",()=>{
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
addcart.addEventListener("click",function(e){
    let prod=e.currentTarget.getAttribute("data-product-id")
    let path=window.location.href.split('/')
    path.pop()
  fetch(`/${path[path.length-1]}/add`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({prod})
    })
    .then(res=> res.json())
    .then(data=>{
        alert('Product added to cart!')
    })
})