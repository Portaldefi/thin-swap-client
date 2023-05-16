const getUser = (users, participant) => {
    let pUser
    users.forEach(person => {
        if (person.username === participant.username) {
            pUser = person
        }
    })
    return pUser
}



export default getUser