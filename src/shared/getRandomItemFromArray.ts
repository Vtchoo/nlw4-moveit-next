const getRandomItemFromArray = <T>(array: T[]): T => {

    const index = Math.floor(array.length * Math.random())

    return array[index];
}

export default getRandomItemFromArray