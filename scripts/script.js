const menu = document.querySelector(".menu")
const dropdownMenu = document.querySelector(".menu__dropdown")
const dropdownItems = document.querySelectorAll(".menu__dropdown__list")

document.addEventListener('click', (e) => {
    
    const menuItem2 = document.querySelector(".menu .menu__item--2 ")
    const element = e.target
    const modalContainer = document.querySelector(".modal__container")
    const modalContent = document.querySelector(".modal__content")

    if (!(menuItem2.contains(element))) {
      dropdownItems.forEach(dropdownItem => {
        dropdownItem.classList.remove("open") 
    })
      dropdownMenu.classList.remove("open") 
    }

    if (e.target.classList == "modal__container") {
        modalContainer.classList.add("hidden")
        modalContent.classList.add("hidden")
        modalContent.removeAttribute("src")
    }
})

const toggleDropdown = (e) => {
  const element = e.target
  if(!(dropdownMenu.contains(element))) {
      dropdownItems.forEach(dropdownItem => {
          dropdownItem.classList.toggle("open") 
      })
      dropdownMenu.classList.toggle("open")  
  }
}

const menuItem = document.querySelector(".menu__item--2")
menuItem.addEventListener("click", toggleDropdown)

const btnMenuMobile = document.querySelector("#btn-navmenu-mobile")
btnMenuMobile.addEventListener("click", () => {
  const btnShow = document.querySelector("#btn-show-menu")
  const btnClose = document.querySelector("#btn-close-menu")
  const content = document.querySelector("main")
  const footer = document.querySelector("footer")

  if(btnShow.classList.contains("hidden")){
    btnShow.classList.remove("hidden")
    btnClose.classList.add("hidden")
  }
  else {
    btnShow.classList.add("hidden")
    btnClose.classList.remove("hidden")
  }  
  return menu.classList.toggle("open"), content.classList.toggle("hidden--mobile"), footer.classList.toggle("hidden--mobile")
})

const eyesPassword = document.querySelectorAll(".form__password img")
const inputsPassword = document.querySelectorAll(".form__password input")

for(var i=0; i < inputsPassword.length; i++) { 
  const input = inputsPassword[i]
  const eye = eyesPassword[i]

  eyesPassword[i].addEventListener("mousedown", () => {
    input.setAttribute("type", "text")
    eye.setAttribute("src", "assets/icons/eye-open.svg")
  })

  eyesPassword[i].addEventListener("mouseup", () => {
    input.setAttribute("type", "password")
    eye.setAttribute("src", "assets/icons/eye-close.svg")
  })
}

const inputsRadio = document.querySelectorAll("input[type='radio']:checked")

for(var i=0; i < inputsRadio.length; i++) { 
  const input = inputsRadio[i]
  const customRadio = document.querySelectorAll(".radio__input")[i]
  
  inputsRadio[i].addEventListener("change", () => {
      if (input.checked) customRadio.classList.add("checked")
  })
}

const inputPassword = document.getElementById("password")
const inputConfirmPassword = document.getElementById("confirmPassword")

function validatePassword() {

  if(inputPassword.value != inputConfirmPassword.value) {
    inputConfirmPassword.setCustomValidity("As senhas não correspondem. Tente novamente.")
  } else {
    inputConfirmPassword.setCustomValidity('')
  }
}

inputPassword.onchange = validatePassword
inputConfirmPassword.onkeyup = validatePassword

const inputTel = document.getElementById('tel')

inputTel.addEventListener('blur', (e) => phoneMask(e.target.value))


const phoneMask = (value) => {
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return inputTel.value = value
}

const inputRadioSite = document.querySelector("#radio-site")

inputRadioSite.addEventListener("change", () => {
    document.querySelector("#site").removeAttribute("disabled")
  }
) 

const inputRadioNotSite = document.querySelector("#radio-not-site") 

inputRadioNotSite.addEventListener("change", () => {
    document.querySelector("#site").setAttribute("disabled", true)
  }
)

const formCreateAccount = document.getElementById("form-create-account")

formCreateAccount.addEventListener("submit", (e) => {
  e.preventDefault()
  const formData = new FormData(formCreateAccount)
  const data = new Object()
  for (const pair of formData.entries()) {
    if (pair[1] !== "" || pair[1] !== null || typeof pair[1] !== undefined) {
       data[`${pair[0]}`] = `${pair[1]}` 
    }
  }
  return sendData(data)
})

const loader = document.querySelector(".loader")
const formContainer = document.querySelector(".form__container")
const toast = document.querySelector(".toast__notify")
const toastError = document.querySelector(".toast__notify__error")

const toastNotify = () => {
  loader.classList.add("hidden")
  toast.classList.add("open")

  setTimeout(() => {
    toast.classList.remove("open")
    formContainer.classList.remove("hidden--visibility")
  }, 10000)
}

const sendData = (data) => {
  loader.classList.remove("hidden")
  formContainer.classList.add("hidden--visibility")
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
    body: JSON.stringify(data)
  }
  fetch("https://rdstation-signup-psel.herokuapp.com/", options)
    .then( data => {
      if(data.status === 200) {
        toastNotify()
      }
      else {
        console.error(data.error)
        loader.classList.add("hidden")
        formContainer.classList.remove("hidden--visibility")
        toastError.classList.add("open")
        setTimeout(() => {
          toastError.classList.remove("open")
        }, 10000)
      }
    }
  )
}

let slideIndex = 1
showSlides(slideIndex)

function plusSlides(n) {
  showSlides(slideIndex += n)
}

function currentSlide(n) {
  showSlides(slideIndex = n)
}

function showSlides(n) {
  let i = 0
  let slides = document.querySelectorAll(".content--3 .content__item")
  let dots = document.getElementsByClassName("dot")
  
  if (n > slides.length) slideIndex = 1
  
  if (n < 1) slideIndex = slides.length
  
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("hidden--mobile")
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "")
  }
  
  slides[slideIndex-1].classList.remove("hidden--mobile")
  dots[slideIndex-1].className += " active"
}

const playerVideo = document.querySelector("#player-video")
const btnPlayerVideo = document.querySelector("#btn-play-video")

const playVideo = () => {

  const modalContainer = document.querySelector(".modal__container")
  const modalContent = document.querySelector(".modal__content")
 
  modalContent.setAttribute("src", "https://www.youtube.com/embed/lGCesaaLi4s?autoplay=1&enablejsapi=1")

  modalContainer.classList.remove("hidden")
  modalContent.classList.remove("hidden")

}

playerVideo.addEventListener("click", playVideo)
btnPlayerVideo.addEventListener("click", playVideo)