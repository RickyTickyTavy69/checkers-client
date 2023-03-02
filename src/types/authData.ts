export type authUserDS = {
    username: string
}

export type authUserEmail = {
    username: string,
    email: string,
    password: string
}

//data about user, sent from the back-end
export type authUserData = {
    data: {
        username: string,
    },
    accessToken: string,
}

