export default function SetLiquorTypes(list) {
    let type = []
    for(let i = 0; i < list.length; i++) {

        if(list[i].liquorTypes.includes('1')) {
            type.push('Brandy')
        }
        if(list[i].liquorTypes.includes('2')) {
            type.push('Gin')
        }
        if(list[i].liquorTypes.includes('3')) {
            type.push('Rum')
        }
        if(list[i].liquorTypes.includes('4')) {
            type.push('Tequila')
        }
        if(list[i].liquorTypes.includes('5')) {
            type.push('Vodka')
        }
        if(list[i].liquorTypes.includes('6')) {
            type.push('Whiskey')
        }
        if(list[i].liquorTypes.includes('7')) {
            type.push('Beer')
        }
        if(list[i].liquorTypes.includes('8')) {
            type.push('Wine')
        }
        if(list[i].liquorTypes.includes('9')) {
            type.push('Champagne')
        }
    }

    let filteredType = []
    type.forEach(item => {
        if(! filteredType.includes(item)) {
            filteredType.push(item)
        }
    });
    filteredType.sort()
    return filteredType
}