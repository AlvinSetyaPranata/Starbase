const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateRandom(length) {
    let res = '';

    for (let i=0; i<length; i++) {
        res += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return res
}