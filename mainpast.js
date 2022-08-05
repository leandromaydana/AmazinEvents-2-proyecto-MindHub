var checkboxSelected = []
var textSearch = ""
let eventos=[]
var checkbox;
var data = localStorage.getItem('data')
data = JSON.parse(data)

function crearCheckbox() {
  var checkboxes = document.getElementById("checkboxes")
  var todasLasCategorias = data.events.map(evento => evento.category) 
  const dataArray = new Set(todasLasCategorias)
  var categorias = [...dataArray]
  var inputCheckbox = ""
  categorias.forEach(category => {

      inputCheckbox += `<div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}">
      <label class="form-check-label" for="inlineCheckbox1">${category}</label>
    </div>`
  })
  checkboxes.innerHTML = inputCheckbox
}
crearCheckbox()

var checkbox = document.querySelectorAll('input[type=checkbox]')

checkbox.forEach(check => check.addEventListener("click", (event)=> {
    var checked = event.target.checked

    if (checked) {
        checkboxSelected.push(event.target.value)
        filterArray()
    } else {
        checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== event.target.value)
        filterArray()

    }  
}))

var inputSearch = document.getElementById("search")
inputSearch.addEventListener("keyup", (event) => {
    textSearch = event.target.value
    filterArray()
})

function filterArray() {
  let dato =[]
 if (checkboxSelected.length > 0 && textSearch !== ""){
  checkboxSelected.map(category=>{
     dato.push(...data.events.filter(nombre=>nombre.name.toLowerCase().includes(textSearch.trim().toLowerCase())
     && nombre.category==category ))
   })
 } else if(checkboxSelected.length > 0 && textSearch == ""){
  checkboxSelected.map(category=>{
     dato.push(...data.events.filter(categoria=>categoria.category == category))
   })
 } else if(checkboxSelected.length == 0 && textSearch !== ""){
   dato.push(...data.events.filter(nombre=>nombre.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
 } else{ dato.push(...data.events)}
 console.log(dato)
 displayCardEventos(dato)
}
filterArray()

function displayCardEventos(dato) {
  var templateHtml = ""

  for (var i = 0; i < dato.length; i++) {
    if (data.currentDate>dato[i].date)
      templateHtml += `    
              <div class="card" style="width: 18rem;">
                  <img class ="imagecard" src="${dato[i].image}">
                  <div class="card-body">
                    <h5>${dato[i].name}</h5>
                    <p>description:${dato[i].description}</p>
                    <p>price:${dato[i].price}</p>
                    <div class="btncard">
                       <a href="details.html?id=${dato[i]._id}"class="btn btn-primary">Go somewhere</a>
                      </div>
                  </div>
                </div>
                `
    }

    if(templateHtml==="")
    {templateHtml = `<h3 class="text-light d-flex justify-content-center m-5">No results found</h3>`}
  document.querySelector('.contenido').innerHTML = templateHtml
}