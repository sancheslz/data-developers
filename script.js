developers = null

normalize = (data) => {
    return data.replaceAll(' ','')
                .toLowerCase()
                .replaceAll('á','a')
                .replaceAll('é','e')
                .replaceAll('í','i')
                .replaceAll('ó','o')
                .replaceAll('ú','u')
                .replaceAll('ã','a')
                .replaceAll('ê','e')
}

recoverData = (data) => {
    developers = data.map((person) => {
        return {
            id: person.id,
            name: person.name,
            email: person.email,
            photo: person.picture,
            technologies: person.programmingLanguages.map( (technology) => {
                return technology.language.toLowerCase()
            }),
            search: normalize(person.name)
        }
    })
}

fetch('http://localhost:3001/devs')
    .then((response) => {
        response.json().then(
            data => {
                recoverData(data)
                render(developers)
            })
    })
    .catch((response) => {
        console.log(response)
    })

function render(developers) {
    div_devs = document.getElementById('devs')
    div_devs.innerHTML = ''

    developers.forEach(developer => {
        card(div_devs, developer)
    })
}

card = (div_devs, developer) => {

    div = document.createElement('div')
    div.classList = "col-lg-6 col-md-12 col-sm-12"

    // Right side
    div_content = document.createElement('div')
    div_content.classList = "col-8"

    div_body = document.createElement('div')
    div_body.classList = "card-body"

    dev_name = document.createElement('h5')
    dev_name.classList = "card-title"
    dev_name.innerText = developer.name

    dev_email = document.createElement('p')
    dev_email.classList = "card-text"
    dev_email.innerText = developer.email

    div_body.appendChild(dev_name)
    div_body.appendChild(dev_email)

    // Dev Technologies
    developer.technologies.forEach((technology) => {
        dev_tech = document.createElement('div')
        dev_tech.classList = `dev-tech ${technology}`
        div_body.appendChild(dev_tech)
    })

    div_content.appendChild(div_body)

    // Left Side
    div_image = document.createElement('div')
    div_image.classList = "col-4 img-side"

    dev_photo = document.createElement('img')
    dev_photo.src = developer.photo
    dev_photo.classList = "card-img"
    div_image.appendChild(dev_photo)

    // Construct the Card
    div_card = document.createElement('div')
    div_card.classList = 'card'

    div_row = document.createElement('div')
    div_row.classList = 'row no-gutters'

    div_row.appendChild(div_image)
    div_row.appendChild(div_content)
    div_card.appendChild(div_row)
    div.appendChild(div_card)

    div_devs.appendChild(div)
}

filter_devs = (input_value) => {
    developer = input_value.target.value
    render(developers.filter((dev) => {
        if (dev.search.includes(developer)) { return true}
    }))

}

window.addEventListener('load', () => {
    name_search = document.getElementById('search_devs')
    name_search.addEventListener('input', filter_devs)

    all_checkbox = document.getElementsByName('dev-options')
    all_checkbox.forEach((checkbox) => {
        checkbox.addEventListener('input',
        () => {})
    })
})