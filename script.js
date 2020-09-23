card = (data) => {
    devs = document.getElementById('devs')

    div = document.createElement('div')
    div.classList = "col-lg-6 col-md-12 col-sm-12"

    // Right side
    div_content = document.createElement('div')
    div_content.classList = "col-8"

    div_body = document.createElement('div')
    div_body.classList = "card-body"

    dev_name = document.createElement('h5')
    dev_name.classList = "card-title"
    dev_name.innerText = "Ediane Araújo"
    
    dev_email = document.createElement('p')
    dev_email.classList = "card-text"
    dev_email.innerText = "ediante.araujo@example.com"
    
    // Dev Technologies
    dev_tech = document.createElement('div')
    dev_tech.classList = "dev-tech python"

    div_body.appendChild(dev_name)
    div_body.appendChild(dev_email)
    div_body.appendChild(dev_tech)
    div_content.appendChild(div_body)

    // Left Side
    div_image = document.createElement('div')
    div_image.classList = "col-4 img-side"

    dev_photo = document.createElement('img')
    dev_photo.src = "https://randomuser.me/api/portraits/women/13.jpg"
    dev_photo.classList ="card-img"
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

    devs.appendChild(div)
}

function render() {
    card()
}

window.addEventListener('load', render)
