let developers = null


// Clear the received string
normalize = (data) => {

    return data.replaceAll(' ', '')
        .toLowerCase()
        .replaceAll('á', 'a')
        .replaceAll('é', 'e')
        .replaceAll('í', 'i')
        .replaceAll('ó', 'o')
        .replaceAll('ú', 'u')
        .replaceAll('ã', 'a')
        .replaceAll('ê', 'e')

}


// Convert developer's data to a clear pattern
loadDevelopers = (data) => {

    developers = data.map((person) => {

        return {
            id: person.id,
            name: person.name,
            email: person.email,
            photo: person.picture,
            technologies: person.programmingLanguages.map((technology) => {
                return technology.language.toLowerCase()
            }),
            search: normalize(person.name)

        }
    })

}


// Load backend data
fetch('http://localhost:3001/devs')
    .then((response) => {

        response.json().then(
            data => {
                loadDevelopers(data)
                render(developers)
            })

    })
    .catch(() => {
        let counter = document.getElementById('dev_count')
        counter.innerText = 'Erro ao carregar os dados, tente novamente mais tarde'
    })


// Render all developers according the filter
function render(developers) {

    let div_devs = document.getElementById('devs')
    div_devs.innerHTML = ''

    let counter = document.getElementById('dev_count')
    if (developers.length == 0) {
        counter.innerText = 'Nenhum registro encontrado'
    } else if (developers.length == 1) {
        counter.innerText = `${developers.length} dev encontrado`
    } else {
        counter.innerText = `${developers.length} devs encontrados`
    }

    developers.forEach(developer => {

        card(div_devs, developer)

    })

}


// Structure of the cards
function card(div_devs, developer) {

    // Right side of Card
    let div_content = document.createElement('div')
    div_content.classList = "col-8"

    let div_body = document.createElement('div')
    div_body.classList = "card-body"

    let dev_name = document.createElement('h5')
    dev_name.classList = "card-title"
    dev_name.innerText = developer.name

    let dev_email = document.createElement('p')
    dev_email.classList = "card-text"
    dev_email.innerText = developer.email

    div_body.appendChild(dev_name)
    div_body.appendChild(dev_email)

    // Dev Technologies
    developer.technologies.forEach((technology) => {

        let dev_tech = document.createElement('div')
        dev_tech.classList = `dev-tech ${technology}`
        div_body.appendChild(dev_tech)

    })

    div_content.appendChild(div_body)

    // Left Side of Card
    let div_image = document.createElement('div')
    div_image.classList = "col-4 img-side"

    let dev_photo = document.createElement('img')
    dev_photo.src = developer.photo
    dev_photo.classList = "card-img"
    div_image.appendChild(dev_photo)

    // Construct the Card
    let div_card = document.createElement('div')
    div_card.classList = 'card'

    let div_row = document.createElement('div')
    div_row.classList = 'row no-gutters'

    let div = document.createElement('div')
    div.classList = "col-lg-6 col-md-12 col-sm-12"

    div_row.appendChild(div_image)
    div_row.appendChild(div_content)
    div_card.appendChild(div_row)
    div.appendChild(div_card)

    div_devs.appendChild(div)
}


// Filter of Developers by Technology (inclusive and exclusive way)
function filter_devs() {

    let dev_name = normalize(document.getElementById('search_devs').value)

    let search_mode = Array.from(
        document.getElementsByName('and_or_filter')).filter(
            (option) => {
                if (option.checked === true) { return true }
            }
        )

    let language = Array.from(
        document.getElementsByName('dev_language')).filter(
            (option) => {
                if (option.checked === true) { return true }
            }
        )

    check_languages = (dev) => {
        if (search_mode[0].id === 'and') {
            return language.every((lang) => {
                if (dev.technologies.includes(lang.id)) {
                    return true
                }
            })
        } else if (search_mode[0].id === 'or') {
            return language.some((lang) => {
                if (dev.technologies.includes(lang.id)) {
                    return true
                }
            })
        }
    }

    // Call the render function after filtering
    render(developers.filter((dev) => {

        if (dev.search.includes(dev_name) && check_languages(dev)) {
            return true
        }

    }

    ))
}


// Add event lister on input filters
window.addEventListener('load', () => {

    document.getElementById('search_devs').addEventListener('input', filter_devs)

    document.getElementsByName('dev_language').forEach((checkbox) => {
        checkbox.addEventListener('input', filter_devs)
    })

    document.getElementsByName('and_or_filter').forEach((checkbox) => {
        checkbox.addEventListener('input', filter_devs)
    })

})
