(() => {
    const API_KEY = 'e7cd855b';

    const displayResults = async (data) => {
        const resultsBody = document.getElementById('resultsBody');
        resultsBody.innerHTML = '';

        if (data.Search) {
            for (const movie of data.Search) {
                const row = resultsBody.insertRow();
                
                const titleCell = row.insertCell();
                titleCell.textContent = movie.Title;
                titleCell.classList.add('cell');
        
                const yearCell = row.insertCell();
                yearCell.textContent = movie.Year;
                yearCell.classList.add('cell');
        
                const country = await getMovieCountry(movie.Title);
                const countryCell = row.insertCell();
                countryCell.textContent = country;
                countryCell.classList.add('cell');
        
                const typeCell = row.insertCell();
                typeCell.textContent = translateType(movie.Type);
                typeCell.classList.add('cell');
            }
        }
    };

    const getMovieCountry = async (title) => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
            const movieData = await response.json();
            return movieData.Country || 'Brak danych';
        } catch (error) {
            console.error('Błąd podczas pobierania szczegółów filmu:', error);
            return 'Brak danych';
        }
    };

    const searchMovies = () => {
        const title = document.getElementById('titleInput').value;
        const type = document.getElementById('typeSelect').value;

        if (!title) {
            alert('Proszę wpisać tytuł.');
            return;
        }

        const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&type=${type}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    console.log(data);
                    displayResults(data)
                } else {
                    alert('Nie znaleziono wyników.');
                }
            })
            .catch(error => {
                console.error('Wystąpił błąd:', error);
                alert('Wystąpił błąd podczas wyszukiwania');
            });
    };

    const translateType = type => {
        switch (type) {
            case 'movie': return 'Film';
            case 'series': return 'Serial';
            case 'episode': return 'Epizod';
            default: return type;
        }
    };

    const button = document.getElementById('button');
    button.addEventListener('click', searchMovies);
})();