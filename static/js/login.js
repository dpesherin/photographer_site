document.addEventListener("DOMContentLoaded", ()=>{
    const submit = document.getElementById("submit")
    submit.addEventListener('click', async(e)=>{
        e.preventDefault()
        let login = document.getElementById("login").value
        let pass = document.getElementById("pass").value

        let userData = {
            login: login,
            pass: pass
        };

        let response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData)
        })  

        let result = await response.json();
        if(result.status == "err"){
            let wr = document.getElementById("login-wrapper")
            let notification = createNotification("Ошибка", result.err)
            wr.append(notification)
            setTimeout(()=>{
                notification.remove()
            }, 2500)
        }else{
            window.location.href = "/admin"
        }
    })
})

const createNotification = (header, content)=>{
    let notify = document.createElement("div")
    notify.classList.add("notification")
    let h = document.createElement("span")
    h.classList.add("notify-header")
    h.innerText = header
    notify.append(h)
    let c = document.createElement("p")
    c.classList.add("notify-text")
    c.innerText = content
    notify.append(c)
    return notify
}