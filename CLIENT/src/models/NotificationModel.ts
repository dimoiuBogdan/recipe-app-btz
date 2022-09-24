export enum NotificationTypes {
    Success = "Success",
    Error = "Error",
    Warning = "Warning"
}

export type NotificationState = Readonly<{
    content: string
    type: NotificationTypes | null
    isOpened: boolean,
    life: number
}>