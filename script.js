(() => {
    const API_KEY = 'e7cd855b';

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