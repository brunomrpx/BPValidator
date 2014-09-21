/**
 * Objeto para valiação dos campos do formulário
 * @param Element form
 */
var BPValid = function(form) {
    this.inputs = form.querySelectorAll(".required");
    this.form  = form;
    this.addEvents();
}
/**
 * Atribui os eventos aos elementos do formulário
 */
BPValid.prototype.addEvents = function() {
    self = this;
    // Valida o formulário quando o mesmo for enviado
    this.form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (self.validateElements(self.inputs)) {
            this.submit();
        }
    });
    // Verifica o elementos quando algum valor for inserido
    for (var i = 0; i < this.inputs.length; i++) {
        this.inputs[i].addEventListener("keyup", function() {
            self.validateElement(this);
        });
    }
}
/**
 * Busca a mensagem padrão de erro
 * @return Element
 */
BPValid.prototype.getErrorMessage = function() {
    var p = document.createElement("p");
    p.className = "error-message";
    p.innerHTML = "Campo Inválido";
    return p;
}
/**
 * Verifica se o elementos é válido
 * @param  String  value
 * @return Boolean
 */
BPValid.prototype.isValid = function(element) {
    if (element.value == "" || element.value.length < 4) {
        return false;
    }
    return true;
}
/**
 * Aplica as alterações aos elementos
 * @param  Array elements
 */
BPValid.prototype.validateElements = function(elements) {
    var isValid = true;
    for (var i = 0; i < elements.length; i++) {
        if (!this.validateElement(elements[i])) {
            isValid = false;
        }
    }
    return isValid;
}
/**
 * Aplica as alterações no elemento
 * @param  Element
 */
BPValid.prototype.validateElement = function(element) {
    var isValid = true,
        hasErrorMessage = element.classList.contains("error-message");
    if (!this.isValid(element)) {
        isValid = false;
    }
    if (!isValid) {
        if (!hasErrorMessage) {
            element.classList.add("error-message");
        }
    } else {
        element.classList.remove("error-message");
    }
    return isValid;
}