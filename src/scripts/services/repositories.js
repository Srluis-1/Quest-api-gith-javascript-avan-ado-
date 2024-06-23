import { baseUrl, respositoriesQauntity } from "../variables.js"
async function getRepositories(userName){
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${respositoriesQauntity}`)
    return await response.json()
}

export{getRepositories}