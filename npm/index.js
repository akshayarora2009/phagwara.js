var fs  = require("fs");

if(process.argv.length != 4)
{
    throw new ReferenceError("AukhaKinna: Bad number of arguments.");
}

var fileName = process.argv[2].split('.');

if(fileName[fileName.length -1] != 'khapp')
{
    throw new ReferenceError("AukhaKinna: Invalid file extension. Tusi khapp nai paande?");
}



fs.stat(process.argv[3], function(err,stat){
    if(err == null)
    {
        console.log('Warning: File already exists. Will be over-written');
        fs.truncateSync(process.argv[3],0);

        mainTask();

    }
    else if(err.code == 'ENOENT')
    {
        mainTask();
    }
    else
    {
        console.log('Something went wrong: ' + err);
    }
});




function mainTask(){
    fs.appendFileSync(process.argv[3],'officialJeha(');

    var contents = fs.readFileSync(process.argv[2]).toString().split('\n');

    contents.forEach(function (line,index) {
        //console.log(line);
        var size = line.toString().length;
        if(index != contents.length -1 )
            fs.appendFileSync(process.argv[3], '"' + line.toString().substring(0,size-1) + ',",\n');
        else
            fs.appendFileSync(process.argv[3], '"' + line.toString().substring(0,size) + '"');

    });

    fs.appendFileSync(process.argv[3],');');

}