const keetTitle = document.querySelector('#keetTitle')
const keepDes = document.querySelector('#keepDes')
const keepAdd = document.querySelector('#keepAdd')
const keepArea = document.querySelector('#keepArea')
const keepNote = document.querySelector('.keepNote')
const close = document.querySelector('.close')

close.addEventListener('click', () => {
    keetTitle.style.display = 'none'
    keepAdd.style.display = 'none'
    close.style.display = 'none'
})

keepNote.addEventListener('dblclick', () => {
    keetTitle.style.display = 'none'
    keepAdd.style.display = 'none'
    close.style.display = 'none'
})

keepDes.addEventListener('click', () => {
    keetTitle.style.display = 'block'
    keepAdd.style.display = 'block'
    close.style.display = 'block'
})

const createKeep = () => {
    const googleKeep = JSON.parse(localStorage.getItem('keeps'))
    let allKeep = ''
    googleKeep.forEach((keep,index) => {
        const setKeep = `
            <div class="keepSingle">
                <h4>${keep.text.title}</h4>
                <p>${keep.text.desc}</p>
                <i class="fas fa-trash-alt delete" data-id=${index}></i>
            </div>
        `
        allKeep += setKeep
    })
    keepArea.innerHTML = allKeep
}

keepArea.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        const index = e.target.getAttribute('data-id')

        const allKeep = JSON.parse(localStorage.getItem('keeps')) ? JSON.parse(localStorage.getItem('keeps')) : []

        allKeep.splice(Number(index),1)

        localStorage.setItem('keeps', JSON.stringify(allKeep))
        createKeep()
    }
})

const getKeep = (text) => {
    if(text){
        let getKeeps = JSON.parse(localStorage.getItem('keeps')) ? JSON.parse(localStorage.getItem('keeps')) : []

        localStorage.setItem('keeps', JSON.stringify([...getKeeps,{text}]))

        keetTitle.value = ''
        keepDes.value = ''
        createKeep()
    }
}

keepAdd.addEventListener('click', () => {
    const text = {
        title : keetTitle.value,
        desc : keepDes.value
    }
    getKeep(text)
})
createKeep()