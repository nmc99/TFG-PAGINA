interface Summoners {
    servidor: string,
    username: string
}

export interface User {
    _id: string,
    username: string,
    email: string,
    password: string,
    summoners: Array<Summoners>,
}
