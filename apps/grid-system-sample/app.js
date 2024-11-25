fetch('header.html', { mode: 'same-origin'})
    .then(function(response) {
        return response.json()
    })
    .then(function(html) {
        console.log(html)
    })