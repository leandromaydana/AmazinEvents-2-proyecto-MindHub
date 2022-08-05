var data = localStorage.getItem('data')
data = JSON.parse(data)

function getData() {
    // var idevento =1
    // data.events.map(evento=>evento.id=idevento++)
    var id = location.search.split("?id=")
    console.log(id)
    var selectedId = id[1]
    console.log(selectedId)
    var evento = data.events.find((evento) =>{
        return evento._id == selectedId
      })
      console.log(evento)
      var templateHtml = `<div class=" d-flex justify-content-center align-items-center p-4 card mb-3" style="max-width: 800px; height: 350px;">
      <div class="row align-items-center justify-content-center " style="width:100% ; height:100% ;" >
        <div class="col-md-4" style="width:50% ; height:80% ;" >
          <img src="${evento.image}" class="img-fluid rounded-start" style="width:100% ; height:100% ;">
        </div>
        <div class="col-md-8" style="width:50% ; height:80% ;" >
          <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">${evento.description}</p>
            <p class="card-text">Date:${evento.date}/Category:${evento.category}/Place:${evento.place}</p>
            <p class="card-text">Capacity:${evento.capacity}/Assistance:${evento.assistance}</p>
            <p class="card-text">Price:$${evento.price}</p>
          </div>
        </div>
      </div>
    </div>
      `
      document.querySelector('.maindetails').innerHTML = templateHtml
  }
  
  getData()