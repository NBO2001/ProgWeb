
const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
};

const addBool = (positionX, positionY) => {

    const mainTag = document.getElementById("main");
    const childrenMain = mainTag.children;

    if(childrenMain.length > 0){

        let end = childrenMain.length-9;

        for(let i=0; i < end; i++){
            mainTag.removeChild(childrenMain[i]);
        }
        
    }

    let newElement = document.createElement('div');
    newElement.className = "bool";
    newElement.style.left = `${positionX}px`;
    newElement.style.top = `${positionY}px`;
    newElement.style.backgroundColor = getRandomColor()
    
    mainTag.appendChild(newElement);

}

window.addEventListener('mousemove', (e) => {

    addBool(e.pageX, e.pageY);
})