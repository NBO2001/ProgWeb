
const addSpans = (qnt) => {

    const graph = document.getElementById("graph")
    
    while (graph.firstChild) {
        graph.removeChild(graph.firstChild);
    }

    for(let i=0; i < qnt; i++){
        let newElement = document.createElement("span")
        newElement.className = "bar"
        graph.append(newElement)
    }
}

const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };
  

const drawingGraph = () => {

    let tamBar = document.getElementById("axis-tam").value
    const inputs = document.querySelectorAll(".conteinner-axis input")
    const graph = document.getElementById("graph")
    const children = graph.children

    addSpans(5)
    let maxTam = graph.offsetHeight

    let mxInput = 0

    inputs.forEach(element => {
        if(parseInt(element.value) > mxInput){
            mxInput = parseInt(element.value)
        }
    })
    
    for(let i=0; i < children.length; i++){
        let val = parseInt((parseInt(inputs[i].value)/mxInput)*maxTam)

        children[i].style.height = `${val}px`
        children[i].style.width = `${tamBar}px`
        children[i].style.backgroundColor = getRandomColor()
    }

}