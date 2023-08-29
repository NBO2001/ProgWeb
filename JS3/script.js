
class IntergerSet{

    constructor(intMaximun){
        this.maximInt = intMaximun;
        this.arrayNumbers = new Array(intMaximun+1).fill(false);
    }

    add(element){
        if(element >= 0 && element <= this.maximInt){
            this.arrayNumbers[element] = true
        }
    }

    remove(element){
        if(element >= 0 && element <= this.maximInt){
            this.arrayNumbers[element] = false
        }

    }

    union(other){

        let mxInt = (other.maximInt > this.maximInt) ? other.maximInt : this.maximInt
        
        let newConjunt = new IntergerSet(mxInt)

        let i = 0
        while(i <= this.maximInt && i < other.maximInt){
            newConjunt.arrayNumbers[i] = this.arrayNumbers[i] || other.arrayNumbers[i]    
            i++;
        }

        while(i <= this.maximInt){
            newConjunt.arrayNumbers[i] = this.arrayNumbers[i]
            i++;
        }

        while(i <= other.maximInt){
            newConjunt.arrayNumbers[i] = other.arrayNumbers[i]
            i++;
        }

        return newConjunt

    }


    intersection(other){

        let mxInt = (other.maximInt > this.maximInt) ? other.maximInt : this.maximInt
        
        let newConjunt = new IntergerSet(mxInt)

        let i = 0
        while(i <= this.maximInt && i < other.maximInt){
            newConjunt.arrayNumbers[i] = this.arrayNumbers[i] && other.arrayNumbers[i]    
            i++;
        }

        while(i <= this.maximInt){
            newConjunt.arrayNumbers[i] = this.arrayNumbers[i]
            i++;
        }

        while(i <= other.maximInt){
            newConjunt.arrayNumbers[i] = other.arrayNumbers[i]
            i++;
        }

        return newConjunt

    }


    diff(other){

        let mxInt = (other.maximInt > this.maximInt) ? other.maximInt : this.maximInt
        
        let newConjunt = new IntergerSet(mxInt)

        let i = 0
        while(i <= this.maximInt && i < other.maximInt){
            newConjunt.arrayNumbers[i] = this.arrayNumbers[i] ^ other.arrayNumbers[i]    
            i++;
        }

        while(i <= this.maximInt){
            newConjunt.arrayNumbers[i] = this.arrayNumbers[i]
            i++;
        }

        while(i <= other.maximInt){
            newConjunt.arrayNumbers[i] = other.arrayNumbers[i]
            i++;
        }

        return newConjunt

    }

    toString(){

        let string = "{ "
        let i = 0
        for( ; i < this.maximInt; i++){
            if(this.arrayNumbers[i]){
                string += i + ", "
            }
        }

        if(this.arrayNumbers[i]){
            string += i
        }

        string += " }"

        return string
    }

}


let myClass = new IntergerSet(6)

myClass.add(3);
myClass.add(6);
myClass.add(5);

let myClass02 = new IntergerSet(3)
myClass02.add(1)

let numbers02 = myClass.intersection(myClass02)


console.log(numbers02.toString())
