const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = 
        `<div class="info">
            <img src="${user.avatarUrl}" alt="Foto do perfil do usuario"/>
            <div class="data">
                 <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                 <p>${user.bio ?? 'Não possui bio cadastrado 😥'}</p>
                 <h3>👥 ${user.followers} seguidores</h3>
                 <h3>👥${user.following} seguindo</h3>
            </div>
        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `
            <li>
               <a href="${repo.html_url}" target="_blank" >
                 ${repo.name}
                    <ul>
                         <li>🍴 ${repo.forks}</li>
                         <li>⭐ ${repo.stargazers_count}</li>
                         <li>👀 ${repo.watchers}</li>
                         <li>💻 ${repo.language}</li>
                     </ul>
                 </a>
            </li>
            `)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += 
            `<div class="repositories section"> 
               <h2>Respositorios</h2> 
               <ul>${repositoriesItens}</ul>
            </div>`
        }

        let eventsInfo = ''
        user.events.forEach(event => {
            let type = event.type
            let commits = event.payload.commits

            if (type === 'pushuEvent') {
                eventsInfo += `<li class="event">
                <p>${event.repo.name}</p>
                <span>${commits[0].message}</span>
                </li>`
            } else {
                eventsInfo += `<li class="event">
                <p>${event.repo.name}</p>
                <span>${'evento de criação sem mensagem❌'}</span>
                </li>`
            }
        })
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsInfo}</ul>  
                                            </div>`;
        }

    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não Encontrado</h3>"
    }
}

export { screen }