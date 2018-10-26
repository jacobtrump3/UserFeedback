export const GetDeviceType = (agent) =>{
    return agent.substring(13, agent.indexOf(")"));
}