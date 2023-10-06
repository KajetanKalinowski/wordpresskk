async function getData(){
const data = await fetch("http://localhost/kkwordpress/wp-json/wp/v2/posts")
const json = await data.json()
console.log(json)
document.getElementById("list").innerHTML = " "
for(let i=0;i<=json.length-1;i++){
    const list = document.getElementById("list")
    const li = document.createElement("li")
    const button = document.createElement("button")
    button.innerHTML="DELETE"
    const buttoncens = document.createElement("button")
    buttoncens.innerHTML = "Cenzura"
    buttoncens.addEventListener("click",()=>{
        cens(json[i].id)
    })
    button.addEventListener("click",()=>{
        DELETE(json[i].id)
    })
    li.innerHTML= json[i].title.rendered
    li.appendChild(buttoncens)
    li.appendChild(button)
    list.appendChild(li)
}
}
getData()
async function DELETE(id) {
    const data = await fetch(`http://localhost/kkwordpress/wp-json/wp/v2/posts/${id}`, {
        method: "DELETE",
        headers:{
            Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`
        }
    })
    const json = await data.json()
    console.log(json)

getData()
}
async function add(){
    const nazwa = document.getElementById("nazwa").value
    const tresc = document.getElementById("tresc").value
    var url = new URL("http://localhost/kkwordpress/wp-json/wp/v2/posts")
    var params = {
        title: `${nazwa}`,
        status: "publish",
        content: `${tresc}`
    }
    for(let i in params){
        url.searchParams.append(i, params[i])
    }
    console.log(url)
    const data = await fetch(url,{
        method:"POST",
         headers:{
             Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`
        }
    })
    // const data = await fetch(`http://localhost/kkwordpress/wp-json/wp/v2/posts?title=${nazwa}&status=publish&content=${tresc}`,)
    const json = await data.json()
    
    console.log(json)
getData()
}

async function cens(id) {
    const data = await fetch(`http://localhost/kkwordpress/wp-json/wp/v2/posts/${id}?status=publish&content=cenzura}`, {
        method: "POST",
        headers:{
            Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`
        }
    })
    const json = await data.json()
    console.log(json)

getData()
}