import { baseUrl, eventsQuantity} from "../variables.js";

async function getEvents(userName){
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`)
    const getEvents= await response.json()
    return getEvents.filter(element => element.type === 'CreateEvent' || element.type === 'PushEvent'.slice(0, eventsQuantity))
}

export { getEvents }
