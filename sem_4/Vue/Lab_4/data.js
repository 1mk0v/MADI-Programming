const data = [
    {id: 'a', text: 'Artem'},
    {id: 'b', text: 'big'}, 
    {id: 'c', text: 'cat'},
    {id: 'd', text: 'dog'},
    {id: 'e', text: 'eat'},
    {id: 'f', text: 'food'},
    {id: 'g', text: 'good'}
]

function getData() {
    let mySelected = {}
    for (let object of data) {
        mySelected[object['id']] = false
    }
    return mySelected
}

let boolData = getData()
console.log(boolData)

export {data, boolData}