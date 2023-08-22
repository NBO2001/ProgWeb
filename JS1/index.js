

function createTable(number){

    let string_end = " <table border='1' class='table'><thead><tr><th colspan='2'>Produto de " +  number + "</th></tr></thead><tbody>"

    for(let i=1; i < 11; i++ ){
        string_end = string_end.concat("<tr><td>" + number + "x" + i + "</td><td> " +  i*number + "</td></tr>")
        
    }

    string_end = string_end.concat("</tbody></table>")
    document.write(string_end)
}

function createAllTables(qnt){

    for(let i=0; i < qnt; i++ ){
        createTable(i+1);
    }


}

