// menu hamburguer
const btnMobile = document.getElementById('btn_mobile');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault()  //melhora a exp do menu hamburguer
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
  const active = menu.classList.contains('active');
  event.currentTarget.setAttribute('aria-expanded', active);
  if (active) {
    event.currentTarget.setAttribute('aria-label', ' Fechar Menu');
  } else {
    event.currentTarget.setAttribute('aria-label', ' Abrir Menu');
  }

}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

var elementosAEsconder = document.querySelectorAll('.a-esconder');

var btnVerMais = document.getElementById('btnVerMais');

btnVerMais.addEventListener('click', function () {

  elementosAEsconder.forEach(function (elemento) {
    elemento.classList.toggle('escondido');
  });

  var estadoAtual = elementosAEsconder[0].classList.contains('escondido') ? 'Ver mais' : 'Ver menos';
  btnVerMais.textContent = estadoAtual;
});

//Formulario
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada! Obrigado</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem, recarregaa pagina e tente novamente</h1>",
});
formSubmit.init();
//fim formulario

//efeito escrever home
function typeWriter(elemento) {
  const textoLimpo = elemento.textContent.replace(/<\/?span>/g, '');
  const textoArray = textoLimpo.split('');
  elemento.innerHTML = '';
  textoArray.forEach((letra, i) => {
    setTimeout(() => elemento.innerHTML += letra, 75 * i);
  });
}

const titulo = document.querySelector('.inicio_textos h1');
typeWriter(titulo);
