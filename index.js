var subBtn=document.getElementById("submitBtn");
var filmName=document.getElementById("movieName");
var movieContainer=document.getElementById("movieCards")
var MovieStatus=document.getElementById("movieStatus")
var sufex= document.getElementById("powerWatchList")



var movieArr=[];
let moviesId=JSON.parse(sessionStorage.getItem("movieData"))
if(moviesId){
movieArr=[...moviesId]
}
sufex.innerHTML=`<b>${movieArr.length}</b>`





function showSection(section) {
    const homeSection = document.getElementById('homeSection');
    const watchSection = document.getElementById('watchSection');
    const singleMovieSection = document.getElementById('singleMovieContainer')

    if (section === 'home') {
        homeSection.classList.remove('hidden');
        homeSection.classList.add('active');
        watchSection.classList.remove('active');
        watchSection.classList.add('hidden');
        singleMovieSection.classList.remove("active")
        singleMovieSection.classList.add("hidden")
      

    } else if (section === 'watch') {
        
        watchSection.classList.remove('hidden');
        watchSection.classList.add('active');
        homeSection.classList.remove('active');
        homeSection.classList.add('hidden');
        singleMovieSection.classList.remove("active")
        singleMovieSection.classList.add("hidden")
        movieswatchList()
    } else{
        console.log(section)
        singleMovieSection.classList.remove("hidden")
        singleMovieSection.classList.add("active")
        homeSection.classList.remove('active');
        homeSection.classList.add('hidden');
        watchSection.classList.remove('active');
        watchSection.classList.add('hidden');
        knowMorefun(section)
    }
}





var movies=[]


filmName.addEventListener("input",()=>{
    movieContainer.innerHTML =""
    MovieStatus.innerHTML=""
    MovieStatus.innerHTML="<p><h1>Loading.......</h1></p>"
    if(filmName.value==""){
         movies=[]
         MovieStatus.innerHTML=""
         CarouselFun()
         MovieStatus.innerHTML=""
    }
    else{
             // API Link    ======>https://www.omdbapi.com/?apikey=45f0782a&s=titanic
        axios.get(`https://www.omdbapi.com/?apikey=45f0782a&s=${filmName.value}`).then((res)=>{

            console.log(res)
        if(res.data.Response=="True"){
            var movies=res.data.Search;
            movies.map((movie,index)=>{
                // let favouriteMovie = movieArr.includes(movie.imdbID)
                // let iconPresent = favouriteMovie ?  `<i class="fa-solid fa-heart heart-icon" onclick="removeWatchlist('${movie.imdbID}')" ></i>` :  `<i class="fa-regular fa-heart heart-icon" onclick="addWatchlistFun('${movie.imdbID}')"></i>`
                // 
                MovieStatus.innerHTML=""
                movieContainer.innerHTML += `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                                <div class="card">
                                                 <div class="image-container">
                                                     <img src="${movie.Poster}" class="card-img-top" alt="...">
                                                      <i class="fa-regular fa-heart heart-icon" onclick="addWatchlistFun('${movie.imdbID}')"></i>
                                                  </div>
                                                  <div class="card-body">
                                                  <p class="card-text"><b>Movie Name:   ${movie.Title}</b></p>
                                                  <p class="card-text"><b>Movie Relese Year:   ${movie.Year}</b></p>
                                                  <button onclick="showSection('${movie.imdbID}')" class="KnowMore">Know More</button>
                                                  </div>
                                                </div> 
                                             </div>`
                                             updateMovieIcons()
                                             
            })
        }else{
            MovieStatus.innerHTML="<p><h1>!!!  Error 404 Movie  not found</h1></p>"
        }
        })
    }
});

const ratingCalc=(value)=>{
      value=value.replace(/,/g,'');
      console.log(value)
     if(value>=100 && value <1000000){
            let votes=value/1000
                 votes=votes.toFixed(1)
            //console.log(votes+"K")
            return `${votes}K`
       }else if(value>=1000000){
        let votes =value/1000000
        votes=votes.toFixed(1)
        //console.log(votes+"M")
        return `${votes}M`
       }
       console.log()
       return value
}


const knowMorefun = (movieId)=>{
     
    let movieImage= document.getElementById("imgDiv")
    let movieContent = document.getElementById("movieContentDiv")
    movieImage.innerHTML=` `
    //console.log(movieId)
   // sessionStorage.setItem("singleMovieData",JSON.stringify(movieId))
      axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=2884265`).then((res)=>{
        console.log(res)

       
        movieImage.innerHTML=`<img src=${res.data.Poster}/>
                                 <i id="heartIcon" class="fa-regular fa-heart heart-icon" onclick="addWatchlistFunSingle('${res.data.imdbID}')"></i>`
        movieContent.innerHTML= `<div class="movieContentInnerDiv">
                                <h1>${res.data.Title}</h1>
                                 <p class="rating-container"><span><i class="fa-solid fa-star ratingIcon"></i> <b>${res.data.imdbRating} (IMDB Rating)</b></span><span class="dotIconSpan"><i class="fa-solid fa-circle dotIcon"></i><b>${ratingCalc(res.data.imdbVotes)} (Votes)</b></span></p>
                                 <p>Type : <b>${res.data.Type}</b></p>
                                 <p>Released : <b>${res.data.Released}</b></p>
                                 <p>Genre : <b>${res.data.Genre}</b></p>
                                 <p>Language :<b>${res.data.Language}</b></p>
                                 <p>Movie Runtime :<b>${res.data.Runtime}</b></p>
                                 <p>Director : <b>${res.data.Director}</b></p>
                                 <p>Writers : <b>${res.data.Writer}</b></p>   
                                 <p>Actors : <b>${res.data.Actors}</b></p>
                                 <p>Country : <b>${res.data.Country}</b></p>
                                 <p>Plot : <b>${res.data.Plot}</b></p>
                                 <p>Awards :<b>${res.data.Awards}</b></p><div>`
                                 updateMovieIconsSingle()
                                 
      })
    



}


function updateMovieIcons() {
    sufex.innerHTML=`<b>${movieArr.length}</b>`
  const movieCards = document.querySelectorAll('.card'); 
    
movieCards.forEach(card => {
     const movieId = card.querySelector('button').getAttribute('onclick').match(/'([^']+)'/)[1]; 
       const heartIcon = card.querySelector('.heart-icon'); 

        if (movieArr.includes(movieId)) {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
            heartIcon.setAttribute('onclick', `removeWatchlist('${movieId}')`);
        } else {
            heartIcon.classList.remove('fa-solid');
            heartIcon.classList.add('fa-regular');
            heartIcon.setAttribute('onclick', `addWatchlistFun('${movieId}')`);
        }
  });
}







const addWatchlistFun = (movieId)=>{
  
    if(!movieArr.includes(movieId)){
         movieArr.push(movieId)
         sessionStorage.setItem("movieData",JSON.stringify(movieArr))
         updateMovieIcons();
    }
}

const removeWatchlist=(movieId)=>{
    if(movieArr.includes(movieId)){
        movieArr = movieArr.filter(id => id !== movieId)
        sessionStorage.setItem("movieData",JSON.stringify(movieArr))
        updateMovieIcons();
   }
}


const removeItemToWatchlist=(movieId)=>{
  console.log("Remove")
  if(movieArr.includes(movieId)){
    console.log("Remove")
    movieArr = movieArr.filter(id => id !== movieId)
    sessionStorage.setItem("movieData",JSON.stringify(movieArr))
      sufex.innerHTML=`<b>${movieArr.length}</b>`
      updateMovieIcons()
   movieswatchList()
}
}


function updateMovieIconsSingle(){
     sufex.innerHTML=`<b>${movieArr.length}</b>`
              const heartIcon = document.getElementById("heartIcon")
              const movieId = document.getElementById("heartIcon").getAttribute('onclick').match(/'([^']+)'/)[1];
              if (movieArr.includes(movieId)) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
                heartIcon.setAttribute('onclick', `removeWatchlistSingle('${movieId}')`);
            } else {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
                heartIcon.setAttribute('onclick', `addWatchlistFunSingle('${movieId}')`);
            } 
}




const addWatchlistFunSingle = (movieId)=>{
  if(!movieArr.includes(movieId)){
       movieArr.push(movieId)
       sessionStorage.setItem("movieData",JSON.stringify(movieArr))
       updateMovieIconsSingle()
       updateMovieIcons()
      }
      
}

const removeWatchlistSingle = (movieId)=>{
  if(movieArr.includes(movieId)){
      movieArr = movieArr.filter(id => id !== movieId)
      sessionStorage.setItem("movieData",JSON.stringify(movieArr))
      updateMovieIconsSingle()
      updateMovieIcons()
    }
   
}

function movieswatchList(){
    
    let wachListContainer= document.getElementById("watchListCards")
    wachListContainer.innerHTML = '';
    if(movieArr.length>0){
        movieArr.map(async(Id)=>{
          // console.log("Cart")
           // console.log(Id)
            await axios.get(`https://www.omdbapi.com/?i=${Id}&apikey=2884265`).then((res)=>{
                wachListContainer.innerHTML += `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div class="card">
                 <div class="image-container">
                     <img src="${res.data.Poster}" class="card-img-top" alt="...">
                       <i class="fa-solid fa-heart heart-icon" onclick="removeItemToWatchlist('${res.data.imdbID}')"></i>
                  </div>
                  <div class="card-body">
                  <p class="card-text"><b>Movie Name:   ${res.data.Title}</b></p>
                  <p class="card-text"><b>Movie Relese Year:   ${res.data.Year}</b></p>
                  <button onclick="showSection('${res.data.imdbID}')" class="KnowMore">Know More</button>
                  </div>
                </div> 
             </div>`
         

              
               
                      })
        }) 
    }else{
     // console.log("else Watch")
      wachListContainer.innerHTML=`<div class="watchListDiv"><h1>Empty WatchList</h1><div>`
    }
    
    
}


var CarouselFun=()=>{

    console.log("Curosal")
    movieContainer.innerHTML =`<section class="carouselSection"><div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
   
  <div class="carousel-item active" data-bs-interval="1500">
      <img src="https://origin-staticv2.sonyliv.com/0/bahubali_2_12dec_landscape_thumb.jpg" class="d-block w-100 curosalImg" alt="...">
       <div class="carousel-caption  d-md-block">
        <h3>Baahubali 2: The Conclusion</h3>
        <button onclick="showSection('tt4849438')" class="KnowMore">Know More</button>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://d1tgyzt3mf06m9.cloudfront.net/v3-staging/2024/05/film-mcu-tidak-bisa-sesukses-avengers-endgame.jpg" class="d-block w-100 curosalImg" alt="...">
       <div class="carousel-caption  d-md-block">
        <h3>Avengers: Endgame</h3>
        <button onclick="showSection('tt4154796')" class="KnowMore">Know More</button>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://i0.wp.com/awardswatch.com/wp-content/uploads/2023/02/Screenshot-2023-02-13-at-8.01.58-AM.png?fit=3735%2C2105&ssl=1&resize=1280%2C720" class="d-block w-100 curosalImg" alt="...">
      <div class="carousel-caption  d-md-block">
         <h3>Titanic</h3>
        <button onclick="showSection('tt0120338')" class="KnowMore">Know More</button>
      </div>
    </div>

     <div class="carousel-item" data-bs-interval="2000">
      <img src="https://jiotvimages.cdn.jio.com/imagespublic/9/6/937bcd9f6c5f52bab7061852823a34f9_1718220413972_l_medium.jpg" class="d-block w-100 curosalImg" alt="...">
      <div class="carousel-caption d-md-block">
         <h3>Enthiran</h3>
        <button onclick="showSection('tt1305797')" class="KnowMore">Know More</button>
      </div>
    </div>

     <div class="carousel-item" data-bs-interval="2000">
      <img src="https://variety.com/wp-content/uploads/2016/07/justiceleague_photo.jpg" class="d-block w-100 curosalImg" alt="...">
      <div class="carousel-caption  d-md-block">
        <h3>Justice League</h3>
        <button onclick="showSection('tt0974015')" class="KnowMore">Know More</button>
      </div>
    </div>

    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://external-preview.redd.it/3hc4GvI-YJ9xpBY4-4FsM-kvoQtLMU22GZ727CfUjlw.jpg?auto=webp&s=acb7024c189f047971d71ee6529e36c3444176d2" class="d-block w-100 curosalImg" alt="...">
      <div class="carousel-caption  d-md-block">
         <h3>Avatar</h3>
        <button onclick="showSection('tt0499549')" class="KnowMore">Know More</button>
      </div>
    </div>

</div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</section>
 `


 }

 
 
 CarouselFun()


