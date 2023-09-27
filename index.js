
// ----- fetching data for home page cards-----
const loadCards = () => {
    const URL = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(URL)
    .then((res) => res.json())
    .then((data) => showCards(data.data.tools.slice(0, 6)
        ));
};


// ----- JS for Home Cards -----
const showCards = (cards) => {
  // console.log(cards);
    const cardContainer = document.getElementById("card");
    cardContainer.innerHTML="";
        
    cards.forEach((card) => {
        const newDiv = document.createElement("div")
        newDiv.innerHTML=`
        <div class="col">
            <div class="card h-100 rounded-4">
                <img src="${card.image}" class="card-img-top rounded-4 " alt="...">

                <div class="card-body ">

                  <div class="pt-3 ps-3">
                  <h4 class="card-title pb-2">Features</h4>
                  <p id="li1" class="card-text ">${card.features[0] ? "1." + card.features[0] : "" }</p>
                  <p id="li2" class="card-text ">${card.features[1] ? "2." + card.features[1] : "" }</p>
                  <p id="li3" class="card-text ">${card.features[2] ? "3." + card.features[2] : "" }</p>
                  <p  class="card-text">${card.features[3] ? "4." + card.features[3] : "" }</p>
                  </div>
                  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom"></div>
                  <div>
                  <h3 class="card-title ps-2 py-3 ">${card.name}</h3>
                  <p class="card-text ps-2"><span class="pe-2"><i class="fa-sharp fa-regular fa-calendar-days"></i></span>${card.published_in}</p>
                  </div>
                  <div class="btn-arrow">
                  <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="fetchCardDetails('${card.id}')" type="button" class="btn btn-primary btn-floating btn-circle mb-2 me-2 ">
                  <i class="fa-solid fa-arrow-right"></i></i>
                  </button>
                  </div>
                  
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(newDiv);
    }) 
};


// ----- function call -----
loadCards();


// ----- JS for Show all cards -----
const showAllDataTogether = () => {
    document.getElementById("spinner").classList.remove("d-none");
    const URL = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
    document.getElementById("spinner").classList.add("d-none");
    showCards(data.data.tools);
   });
};


// ----- JS for short by date cards -----
const shortByDate = () => {
  const URL = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(URL)
  .then((res) => res.json())
  .then((data) => {shortByDateFunction(data.data.tools);
 });
};

const shortByDateFunction = (byDate) => {
  const arrayDate = byDate;
  // console.log(arrayDate);

  customSort = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA < dateB) return 1;
    else if (dateA > dateB) return -1;
    return 0;
  };
  showCards(arrayDate.sort(customSort));
};


// ----- fetching data for modal card details-----
const fetchCardDetails = (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(URL)
    .then((res) => res.json())
    .then((data) => showCardDetails(data.data));
};


// ----- JS for Modal Cards -----
const showCardDetails = (cardDetails1) => {
  // console.log(cardDetails1); 
  const DetailsContainer = document.getElementById("modal-body-cards");
  DetailsContainer.innerHTML="";
  
  DetailsContainer.innerHTML = `
  <div class="col-md-6">
    <div class="card mt-md-5 mb-md-5 ms-md-5 border-danger card-color rounded-4">
      <div class="card-body">
        <h4 class="card-title fw-bold pe-4 py-3 ps-3">${cardDetails1.description}</h4>
        <div class = "mx-3">
        <div class="row d-flex justify-content-between">
        <div class= "col-4 text-center ">
        <h5 class="text-green py-5 rounded-4">${cardDetails1.pricing ? cardDetails1.pricing[0].price + "  " + cardDetails1.pricing[0].plan : "Free of cost/ Basic"}</h5>
        </div>
        <div class= "col-4 text-center ">
        <h5 class="text-orange py-5 rounded-4">${cardDetails1.pricing ? cardDetails1.pricing[1].price + "  " + cardDetails1.pricing[1].plan : "Free of cost/ Pro"}</h5> 
        </div>
        <div class= "col-4 text-center ">
        <h5 class="text-red py-5 rounded-4">${cardDetails1.pricing ? cardDetails1.pricing[2].price + "  " + cardDetails1.pricing[2].plan : "Free of cost/ Enterprise"}</h5>
        </div>
        </div>
        </div>
        <div class = "d-flex justify-content-between pb-5 px-4">
        <div>
        <h4 class="fw-bold card-title ps-2 pb-2">Features</h4>    
        <p class="card-text "> ${cardDetails1.features[1] ? "&#x2022 " + cardDetails1.features[1].feature_name : "No Data Found"} </p>
        <p class="card-text "> ${cardDetails1.features[2] ? "&#x2022 " + cardDetails1.features[2].feature_name : ""}</p>
        <p  class="card-text "> ${cardDetails1.features[3] ? "&#x2022 " + cardDetails1.features[3].feature_name : ""}</p>
        <p  class="card-text "> ${cardDetails1.features[4] ? "&#x2022 " + cardDetails1.features[4].feature_name : ""}</p>
        <p  class="card-text "> ${cardDetails1.features[5] ? "&#x2022 " + cardDetails1.features[5].feature_name : ""}</p>
        </div>
        <div>
        <h4 class="fw-bold card-title ps-1 pb-2 ">Integrations</h4>
        <p class="card-text "> ${cardDetails1.integrations && cardDetails1.integrations[0] ? "&#x2022 " + cardDetails1.integrations[0] : "No Data Found" } </p>
        <p class="card-text "> ${cardDetails1.integrations && cardDetails1.integrations[1] ? "&#x2022 " + cardDetails1.integrations[1] : "" }</p>
        <p  class="card-text "> ${cardDetails1.integrations && cardDetails1.integrations[2] ? "&#x2022 " + cardDetails1.integrations[2] : "" }</p>
        <p  class="card-text "> ${cardDetails1.integrations && cardDetails1.integrations[3] ? "&#x2022 " + cardDetails1.integrations[3] : "" }</p>
        <p  class="card-text "> ${cardDetails1.integrations && cardDetails1.integrations[4] ? "&#x2022 " + cardDetails1.integrations[4] : "" }</p>
        <p  class="card-text "> ${cardDetails1.integrations && cardDetails1.integrations[5] ? "&#x2022 " + cardDetails1.integrations[5] : "" }</p>
        </ul>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card mt-md-5 mb-md-5 me-md-5 rounded-4">
      <img class="card-img-top " src=" ${cardDetails1.image_link[0]}" class="card-img-top" alt="...">
      <div class="card-body">
      <div id="hide" class="position-absolute top-0 end-0 m-3 bg-danger fw-bold text-white rounded-4">${cardDetails1.accuracy && cardDetails1.accuracy.score ? cardDetails1.accuracy.score * 100 + " % accuracy"  : "" }
      </div>
        <h4 class="card-title fw-bold text-center p-3">
        ${cardDetails1.input_output_examples && cardDetails1.input_output_examples[0].input ? cardDetails1.input_output_examples[0].input : "Can you give any example?" }</h4>
        <p class="card-text text-center pb-4">
        ${cardDetails1.input_output_examples && cardDetails1.input_output_examples[0].output ? cardDetails1.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
      </div>
    </div>
  </div>
  `
};
