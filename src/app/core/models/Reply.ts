import { User } from "./User";

export interface Reply{
    id: number,
    content: string,
    createdAt: string,
    score: number,
    replyingTo: string,
    user: User,
    isVoted?: boolean
}
