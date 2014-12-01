/**
 * Objeto para valiação dos campos do formulário
 * @param Element form
 */
var BPValidator = function(form) {
    this.inputs                  = form.querySelectorAll(".required");
    this.form                    = form;
    this.invalidElementClassName = "error-message";
    this.invalidElements         = Array();
    this.addEvents();
}
/**
 * Atribui os eventos aos elementos do formulário
 */
BPValidator.prototype.addEvents = function() {
    self = this;
    // Valida o formulário quando o mesmo for enviado
    this.form.addEventListener("submit", function(e) {
        e.preventDefault();
        self.validateElements(self.inputs);
        if (!self.hasInvalidElements()) {
            this.submit();
        }
    });
    // Valida o input quando algum caracter for inserido
    for (var i = 0; i < this.inputs.length; i++) {
        this.inputs[i].addEventListener("keyup", function() {
            self.validateElement(this);
        });
    }
}
/**
 * Verifica se o elementos é válido
 * @param  Element  element
 * @return Boolean
 */
BPValidator.prototype.isValid = function(element) {
    if (element.classList.contains("required")) {
        if (element.value.length === 0) {
            return false;
        }
    }
    return true;
}
/**
 * Valida uma lista de elementos
 * @param  Array elements
 */
BPValidator.prototype.validateElements = function(elements) {
    for (var i = 0; i < elements.length; i++) {
        this.validateElement(elements[i]);
    }
}
/**
 * Valida um elemento
 * @param  Element element
 */
BPValidator.prototype.validateElement = function(element) {
    if (this.isValid(element)) {
        this.valid(element);
    } else {
        this.invalid(element);
    }
}
/**
 * Verifica se o elemento está na lista de elementos inválidos
 * @param Element element
 * @return Boolean
 */
BPValidator.prototype.inInvalidElements = function(element) {
    return this.invalidElements.indexOf(element) !== -1;
}
/**
 * Verifica se o elemento possui formatação inválida
 * @param  Element  element
 * @return Boolean
 */
BPValidator.prototype.hasInvalidFormat = function(element) {
    return element.classList.contains(this.invalidElementClassName);
}
/**
 * Verifica se existe algum elemento inválido
 * @return Boolean
 */
BPValidator.prototype.hasInvalidElements = function() {
    return this.invalidElements.length > 0;
}
/**
 * Formata um elemento como inválido
 * @param  Element element
 */
BPValidator.prototype.invalid = function(element) {
    if (!this.inInvalidElements(element)) {
        this.invalidElements.push(element);
    }
    if (!this.hasInvalidFormat(element)) {
        element.classList.add(this.invalidElementClassName);
    }
}
/**
 * Formata um elemento como válido
 * @param  Element element
 */
BPValidator.prototype.valid = function(element) {
    element.classList.remove(this.invalidElementClassName);
    var index = this.invalidElements.indexOf(element);
    if (index !== -1) {
        this.invalidElements.splice(index, 1);
    }
}
