export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('users')
        if (serializedState === null) {
            return { users: [] }
        }
        return JSON.parse(serializedState)
    } catch (err) {
        console.error(err)
        return {}
    }
}

export const saveState = (users) => {
    try {
        const serializedState = JSON.stringify(users)
        localStorage.setItem('users', serializedState)
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
    }
}
