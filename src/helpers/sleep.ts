export const sleep = (miliseconds: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, miliseconds)
    })
}
