import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { screen } from "./objects/screen.js"
import { user } from "./objects/users.js"
import { getEvents } from "./services/events.js"

document.getElementById('btn-search').addEventListener('click',() => {
    const userName = document.getElementById('input-search').value
    if (validateEmpytInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup',(e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPreassed = key === 13
    
    if(isEnterKeyPreassed){
        if (validateEmpytInput(userName)) return
        getUserData(userName)
    }
    
})

function validateEmpytInput(userName){
        if(userName.length === 0) {
            alert('Preencha o campo com o nome do usuário do GitHub')
            return true
        }
}

async function getUserData(userName){

    const userResponse = await getUser(userName)
    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }
    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    screen.renderUser(user)
    
}

