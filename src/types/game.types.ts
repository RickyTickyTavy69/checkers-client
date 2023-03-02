export interface iInvitation{
    inviterUserId: string,
    inviterUsername: string,
    method: "invite",
    invitedUsername: string,
}

export interface iAcceptInvitation{
    inviterUserId: string,
    inviterUsername: string,
    method: "accept",
    invitedUsername: string,
}