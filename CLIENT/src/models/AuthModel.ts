export type AuthProperties = {
    userId: string;
    token: string;
}

export type AuthState = Readonly<{
    userId: string;
    token: string;
}>