window.onload = function () {
  const accessKey = "api_key=7d8d3f1aac3ef30864e7e9a2be90373e";
  const root = document.querySelector(".root")
  const mainTitle = document.querySelector('.header__title')
  weeklyTop() // request for top 20

  function weeklyTop() {
    let url = `https://api.themoviedb.org/3/trending/all/week?${accessKey}&append_to_response=recommendations`

    let xhr = new XMLHttpRequest
    xhr.open("GET", url, true)
    xhr.send()

    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)
        printMoviesList(data.results)
      } else {
        mainTitle.textContent = "Oops something went wrong! Please try again later"
      }
    }
  }

  // search

  document.querySelector(".search__button").onclick = searchRequest

  function searchRequest() {
    let query = document.querySelector(".search__field").value
    if (query === '') {
      weeklyTop()
      mainTitle.textContent = 'Tranding'
      return
    }
    let url = `https://api.themoviedb.org/3/search/tv?${accessKey}&language=en-US&query=${query}&page=1&include_adult=false`

    let xhr = new XMLHttpRequest
    xhr.open("GET", url, true)
    xhr.send()

    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)
        printMoviesList(data.results)
      } else {
        mainTitle.textContent = "Oops something went wrong! Please try again later"
        return
      }
    }
    mainTitle.textContent = "Search results..."
  }

  ///   print top 20 and search results and add listerners for print single movie cards

  function printMoviesList(data) {
    root.innerHTML = ""
    let movieList = document.createElement("ul")
    movieList.classList.add("movielist")

    data.forEach(obj => {
      let title = obj.hasOwnProperty("original_title") ? obj.title : obj.name; //check for TV/movie
      let isMovie = title === obj.title ? 'movie' : 'tv' //check for TV/movie
      let listItem = document.createElement("li")
      listItem.classList.add("movielist__item")
      listItem.setAttribute('data-id', obj.id)
      listItem.setAttribute('data-isMovie', isMovie) //check for TV/movie
      listItem.textContent = title
      movieList.appendChild(listItem)
    })
    root.appendChild(movieList)
    // add events for all list items
    const items = document.querySelectorAll(".movielist__item")
    items.forEach(el => {
      el.addEventListener("click", requestMovieCardData)
    })
  }




  // request for movie card data

  function requestMovieCardData() {
    let movieId = this.getAttribute("data-id")
    let isMovie = this.getAttribute("data-isMovie")
    let url = `https://api.themoviedb.org/3/${isMovie}/${movieId}?language=en-US&${accessKey}&append_to_response=recommendations`

    let xhr = new XMLHttpRequest
    xhr.open("GET", url, true)
    xhr.send()

    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)
        printMovieCard(data);
      }
      else {
        mainTitle.textContent = "Oops something went wrong! Please try again later"
      }
    }

  }

  //print movie card

  function printMovieCard(data) {
    let title = data.hasOwnProperty("title") ? data.title : data.name;

    let recommendations = data.recommendations.results
    recommendations.length = 8

    let str = ''
    recommendations.forEach((el, ) => {
      let title = el.hasOwnProperty("title") ? el.title : el.name;
      let isMovie = title === el.title ? 'movie' : 'tv'
      str += `<li class="recommendations__item" data-isMovie="${isMovie}" data-id="${el.id}">${title}</li>`
    })


    let movieCard = document.createElement('div')
    movieCard.classList.add('movieCard')

    movieCard.innerHTML = ` <img class="movieCard__img" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${title}">
    <div class="cardWrap">
    <h3 class="movieCard__title" >${title} </h3>
    <p class="movieCard__overview">${data.overview}</p>
    <div class="recommendations">
    <h5 class="recommendations__title">Recommendations:</h5>
    <ul class="recommendations__list">
      ${str}
    </ul>
    </div>
    </div>`

    let root = document.querySelector('.root');
    root.innerHTML = '';
    root.appendChild(movieCard);
    mainTitle.textContent = title

    let recommendationsListItems = document.querySelectorAll('.recommendations__item')
    recommendationsListItems.forEach(el => el.addEventListener('click', requestMovieCardData))

  }

}
