export const getSubmitButtonLabel = (isSubmitting: boolean, trueLabel: string, falseLabel: string) => {
    return isSubmitting ? trueLabel : falseLabel
}