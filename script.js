(() => {
    const API_KEY = 'e7cd855b';

    const displayResults = async (data) => {
        const resultsBody = document.getElementById('resultsBody');
        resultsBody.innerHTML = '';

        if (data.Search) {
            for (const movie of data.Search) {
                const row = resultsBody.insertRow();
                row.insertCell().textContent = movie.Title;
                row.insertCell().textContent = movie.Year;
                row.insertCell().textContent = movie.Country;
                row.insertCell().textContent = movie.Type;
            }
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

    const button = document.getElementById('button');
    button.addEventListener('click', searchMovies);
})();