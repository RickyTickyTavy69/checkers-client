export interface Iuser{
    id: 1;
    username: string;
    password: string;
    email: string;
    accesstoken: string;
    refreshtoken: string;
    checkerscolor: null | string;
    salt: string;
}

export type UsersListData = Array<Iuser>;