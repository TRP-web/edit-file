const input = document.querySelector('#file-inner')
const content = document.querySelector('#content')
const buttonEditForOffer = document.querySelector('#edit')
content.value = `dsfsd <a bebra="bebra" href=""></a> fsdfsf
dsfsd <a href=""></a> fsdfsf
<a></a>`
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
            console.log(this.file)
            this.readFile(this.reader, this.file)
        })
    }

    readFile(render, file) {
        render.addEventListener('load', (e) => {
            console.log(this.file)
            this.pushContent(render.result)
            console.log('load')
        })

        let text = render.readAsText(file)
        console.log(text)
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
    constructor(content, tegInner, atributeInner) {
        super(content)
        this.tegInner = tegInner
        this.atributeInner = atributeInner
    }

    getTeg() {
        return this.tegInner.value
    }

    getAtribute() {
        return this.atributeInner.value
    }

}

class EditAtrubute extends getInfo {
    constructor(tegInner, atributeInner, buttonForEdit) {
        super(content, tegInner, atributeInner)
        console.log(tegInner, atributeInner, buttonForEdit, this.getContent(), this.getTeg())
        buttonForEdit.addEventListener('click', () => {
            this.EditAtrubute()
        })
    }

    EditAtrubute() {
        if (this.getTeg() === "") {
            let regex = new RegExp(`${this.getAtribute()}=("|')([^"']*)("|')`, 'ig')
            console.log(regex)
            let newString = this.getContent().replace(regex, (search, index, input) => {
                return ''
            })
            console.log(newString)
            this.pushContent(newString)
        }
    }
}

new InputFile(input)
new ContentEditOffer(buttonEditForOffer)
const atribute = document.querySelector('#atribute')
const teg = document.querySelector("#teg")
const EditAtrubuteButton = document.querySelector('#remove-atribute')
new EditAtrubute(teg, atribute, EditAtrubuteButton)