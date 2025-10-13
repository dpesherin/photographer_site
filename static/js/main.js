document.addEventListener("DOMContentLoaded", ()=>{
    let content = document.querySelector("div.global-wrapper")
    let cards = document.querySelectorAll("div.gallery-card")
    cards.forEach((card)=>{
        card.addEventListener("click", (e)=>{
            let path = e.target.getAttribute("src")
            let bc = document.createElement("div")
            bc.classList.add("bc")
            bc.addEventListener('click', (e)=>{
                e.target.remove()
            })
            let giWrapper = document.createElement("div")
            giWrapper.classList.add("gi-wrapper")
            let gi = document.createElement("img")
            gi.addEventListener("click", (e)=>{
                bc.remove()
            })
            gi.classList.add("gi")
            gi.setAttribute("src", path)
            gi.setAttribute("alt", "")
            giWrapper.append(gi)
            bc.append(giWrapper)
            content.append(bc)
        })
    })
})