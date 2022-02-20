const input = document.querySelector('#file-inner')
const content = document.querySelector('#content')
const buttonEditForOffer = document.querySelector('#edit')
content.value = `dsfsd <a bebra="bebra" href=""></a> fsdfsf
dsfsd <a href></a> fsdfsf
<a></a>
<link href="">`
const radio = document.querySelectorAll('.teg__radio')
class Content {
    constructor(content) {
        this.content = content
    }

    pushContent(newContent) {
        this.content.value = newContent
    }

    getContent() {
        return this.content.value
    }
}

class InputFile extends Content {
    constructor(input) {
        super(content)
        this.input = input
        this.reader = new FileReader()
        this.input.addEventListener('change', (e) => {
            this.file = e.target.files[0]
            this.readFile(this.reader, this.file)
        })
    }

    readFile(render, file) {
        render.addEventListener('load', (e) => {
            this.pushContent(render.result)
        })

        let text = render.readAsText(file)
    }
}

class ContentEditOffer extends Content {
    constructor(EditOfferButton) {
        super(content)
        EditOfferButton.addEventListener('click', () => {
            this.editForOffer()
        })
    }

    editForOffer() {
        let newString = this.offerReplace()
        this.pushContent(newString)
        let deleteHref = this.getContent().replace(/<a>/ig, `<a href="{offer}">`)
        this.pushContent(deleteHref)
    }

    testHref(search) {
        let tegStart = search.match(/<a\s/)
        let resultNotHasHref = search.substring(0, tegStart[0].length) + `href="{offer}" ` + search.substring(tegStart[0].length,)
        return resultNotHasHref
    }

    offerReplace() {
        let newString = this.getContent().replace(/<a\s[^>]*>/ig, (search, index, input) => {
            let href = search.match(/href=("|')([^"']*)("|')/)
            if (href === null) {
                return this.testHref(search)
            }
            let resultReplace = search.substring(0, href.index) + `href="{offer}"` + search.substring(href.index + href[0].length, input.length)
            return resultReplace
        })
        return newString
    }
}

class getInfo extends Content {
    constructor(content, tegInner, atributeInner, replaceInner) {
        super(content)
        this.tegInner = tegInner
        this.atributeInner = atributeInner
        this.replaceAtribute = replaceInner
        this.radio = radio
        this.radio.forEach((elem) => {
            elem.addEventListener('change', () => {
                if (this.getActiveRadio() === "replace") {
                    document.querySelector('.teg__block-replece').classList.add('active')
                } else {
                    document.querySelector('.teg__block-replece').classList.remove('active')
                }
            })
        })
    }

    getTeg() {
        return this.tegInner.value
    }

    getAtribute() {
        return this.atributeInner.value
    }

    getReplace() {
        return this.replaceAtribute.value
    }

    getActiveRadio() {
        let activeRadio
        this.radio.forEach((elem) => {
            if (elem.checked) {
                activeRadio = elem.value
            }
        })
        return activeRadio
    }
}

class EditHtml extends getInfo {
    constructor(content, tegInner, atributeInner, replaceInner) {
        super(content, tegInner, atributeInner, replaceInner)
    }

    EditAtribute() {
        if (this.getTeg() === "" && this.getAtribute() !== "") {
            let regex = new RegExp(`${this.getAtribute()}([\\s>]|=("|')([^"']*)("|'))`, 'gm')
            let newString = this.getContent().replace(regex, (search, index, input) => {
                return this.testSearch(search)
            })
            this.pushContent(newString)
        } else if (this.getTeg() !== "" && this.getAtribute() !== "") {
            let regex = new RegExp(`<${this.getTeg()}\\s[^>]*>`, 'gm')
            let newString = this.getContent().replace(regex, (search, index, input) => {
                let regexAtribute = new RegExp(`${this.getAtribute()}([\\s>]|=("|')([^"']*)("|'))`, '')
                let returnString = search.replace(regexAtribute, (search) => {
                    return this.testSearch(search)
                })
                return returnString
            })
            this.pushContent(newString)
        }
    }

    replaceA() {
        if (this.getReplace() !== "" && this.getTeg() === "") {
            let regex = RegExp(`${this.getAtribute()}([\\s>]|=("|')([^"']*)("|'))`, 'gm')
            let newString = this.getContent().replace(regex, (search, index, input) => {
                let contentAtrib = search.match(/("|')([^"']*)("|')/)
                if (contentAtrib === null) {
                    return `${this.getAtribute()}="${this.getReplace()}"`
                } else {
                    return search.substring(0, contentAtrib.index) + `"` + this.getReplace() + `"`
                }
            })
            this.pushContent(newString)
        } else if (this.getReplace() !== "" && this.getTeg() !== "") {
            let regex = new RegExp(`<${this.getTeg()}\\s[^>]*>`, 'gm')
            let newString = this.getContent().replace(regex, (search, index, input) => {
                let regexAtribute = new RegExp(`${this.getAtribute()}([\\s>]|=("|')([^"']*)("|'))`, '')
                let result = search.replace(regexAtribute, (search) => {
                    console.log(search)
                    return this.getAtribute() + `="${this.getReplace()}"` + this.testSearch(search)
                })

                return result
            })
            this.pushContent(newString)
        }
    }
    testSearch(search) {
        if (search[search.length - 1] === ">") {
            return '>'
        } else if (search[search.length - 1] === " ") {
            return ' '
        } else {
            return ''
        }
    }
}

class EditAtrubute extends EditHtml {
    constructor(tegInner, atributeInner, replaceInner, buttonForEdit) {
        super(content, tegInner, atributeInner, replaceInner)
        buttonForEdit.addEventListener('click', () => {
            if (this.getActiveRadio() === "delete") {
                this.EditAtribute()
            } else if (this.getActiveRadio() === "replace") {
                this.replaceA()
            }
        })
    }
}

new InputFile(input)
new ContentEditOffer(buttonEditForOffer)
const atribute = document.querySelector('#atribute')
const teg = document.querySelector("#teg")
const replace = document.querySelector("#replace")
const EditAtrubuteButton = document.querySelector('#remove-atribute')
new EditAtrubute(teg, atribute, replace, EditAtrubuteButton)


let test = new RegExp(' \\s', 'g')
console.log(test)