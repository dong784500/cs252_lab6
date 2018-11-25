module.exports = {
    genCookie: (arr) => {
        return arr.map(item => {
            return `${item.name}=${item.value}`
        }).join(';') + ';'
    }
}