const calculate = () => {
    
    const inputRaio = document.getElementById("raio")
    const inputDiametro = document.getElementById("diametro")
    const inputArea = document.getElementById("area")

    let raio = parseFloat(inputRaio.value)

    let diametro = (2*Math.PI*raio).toFixed(2)
    let area = (Math.PI*(raio*raio)).toFixed(2)

    inputDiametro.value = diametro
    inputArea.value = area


}
