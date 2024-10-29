

let pokemonRepository = (function () {

    //list of manually uploaded pokemon
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    function add(pokemon) {

        pokemonList.push(pokemon);
    }


    function addListItem(pokemon) {
        // ul pokemon list selector
        let selectedList = document.querySelector('.pokemonSelect');

        // create new list element
        let createLi = document.createElement('li');

        //  create new button element
        let createButton = document.createElement('button')



        //adds button to lI
        createButton.addEventListener('click', function () {

            if (document.querySelector('#modal-container').classList.contains('is-not-visible')) {

                showDetails(pokemon);
            }
        })
        window.addEventListener('keydown', function (e) {
            if (e.key === 'Spacebar' && modalContainer.classList.contains('is-not-visible'))
                showModal();
        })
        // adds pokemon name to the button
        createButton.innerText = pokemon.name;
        createButton.classList.add('pokeButton');
        //adds button to chart
        createLi.appendChild(createButton);



        //adds li to ul
        createLi.classList.add('pokemon');
        selectedList.prepend(createLi);


    }

    function closeModal() {

        let modalContainer = document.querySelector('#modal-container')
        let modal = document.querySelector('#modal')
        let background = document.querySelector('#background')


        // close modal
        modalContainer.classList.remove('is-visible')
        modalContainer.classList.add('is-not-visible')
        modal.innerHTML = ''; //clears contents
        // close background
        background.classList.remove('is-visible')
        background.classList.add('is-not-visible')

    }

    function showModal(nameModal, imageModal, heightModal) {


        // background selector
        let background = document.querySelector('#background')

        // modalcontainer  select
        let modalContainer = document.querySelector('#modal-container');

        // close modal    
        let modal = document.querySelector('#modal');


        // adding pokemon name to modal
        let title = document.createElement('p');
        title.innerText = nameModal;
        title.id = "modal-title";

        let height = document.createElement('p');
        height.innerText = 'Height: ' + heightModal;
        height.id = "modal-title";

        //adding pokemon image
        let image = document.createElement('img');
        image.src = imageModal

        // adding close button 
        let close = document.createElement('button');
        // adding close function
        close.addEventListener('click', function (e) {
            closeModal();
        })
        close.innerText = 'X';
        close.id = 'modalClose-btn'

        // adds escape listener
        window.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                closeModal();
            }

        })
        let gridItem = document.querySelector('main')

        background.addEventListener('click', function (e) {
            if (e.target !== background || e.target !== gridItem) {


            } if (e.target === background) {
                closeModal()
            }

        })

        // Append all information
        modal.appendChild(title);
        modal.appendChild(image);
        modal.appendChild(height);
        modal.appendChild(close);


        //Removes not visible class & adds the is-visible class
        modalContainer.classList.remove('is-not-visible')
        modalContainer.classList.add('is-visible')

        background.classList.remove('is-not-visible')
        background.classList.add('is-visible')

    };

    // after selecting button--shows further detail on pokemon
    function showDetails(item) {
        loadDetails(item).then(function () {
            let imageModal = item.imageUrl;
            let nameModal = item.name;
            let heightModal = item.height;
            showModal(nameModal, imageModal, heightModal);
        })
    }



    /////////////return all///////////////

    function getAll() {
        return pokemonList;
    }

    // API call to get details

    function loadList() {


        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {

                let pokemon = {
                    name: item.name,
                    url: item.url
                };

                add(pokemon);
            });

        }).catch(function (e) {
            console.error(e);

        })
    }
    // callback to get details on specific pokemon

    function loadDetails(item) {


        let url = item.url; // url for that Pokemon's specific information
        return fetch(url).then(function (response) {

            return response.json();

        }).then(function (details) {

            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;


        }).catch(function (e) {

            console.error(e);

        })
    }

    ////////////functions//////////////// 
    return {

        add: add,
        getAll: getAll,
        showDetails: showDetails,
        addListItem: addListItem,
        loadDetails: loadDetails,
        loadList: loadList,
        showModal: showModal

    }

})()



// loads the pokemon into the table
pokemonRepository.loadList().then(function (pokemon) {

    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);

    })
});
