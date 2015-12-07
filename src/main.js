
function skipSpace(string){

    // Match the first non-whitespace
    var firstNonSpace = string.search(/\S/);

    // Everything is a whitespace
    if(firstNonSpace == -1)
        return "";

    return string.slice(firstNonSpace);
}



function parseExpression(program){

    program = skipSpace(program);

    var match,expr;

    // match a string
    if(match = /^"([^"]*)"/.exec(program))
        expr = {type:"value", value: match[1]};

    // match a digit
    else if(match = /^\d+\b/.exec(program))
        expr = {type: "value", value: Number(match[0])};

    else if(match = /^[^\s(),"]+/.exec(program))
        expr = {type: "word", name: match[0]};

    else
        throw new SyntaxError("Unexpected syntax for the program");

    return parseApply(expr, program.slice(match[0].length));

}


// Takes the expression detected and the remaining program as its input and checks if the expr is of the type apply

function parseApply(expr, program){

    program = skipSpace(program);


    // Check if expression is of the compound type apply
    if(program[0] != "(")
        return {expr:expr, rest: program};

    program = skipSpace(program.slice(1));
    expr = {type:"apply", operator:expr,args:[]};

    while(program[0] != ")") {
        var arg = parseExpression(program);
        expr.args.push(arg.expr);

        program = skipSpace(arg.rest);

        if (program[0] == ",")
            program = skipSpace(program.slice(1));
        else if (program[0] != ")")
            throw new SyntaxError("Expected ',' or ')' ");

    }



    // Repeated call to parseApply ensures constructs like multiply(2)(3) with two pairs of paranthesis
    return parseApply(expr,program.slice(1));

}

function parse(program){
    var result = parseExpression(program);
    if(skipSpace(result.rest).length > 0)
        throw new SyntaxError("Unexpected text!");

    return result.expr;
}

// Evaluator part begins here

//console.log(parse("+(abc,10)"));

var specialForms = Object.create(null);

function evaluate(expr,env)
{
    switch(expr.type)
    {
        case "value":
            return expr.value;

        case "word":
            if(expr.name in env)
                return env[expr.name];
            else
                throw new ReferenceError("Undefined variable: " + expr.name);

        case "apply":
            if(expr.operator.type == "word" && expr.operator.name in specialForms)
            {
                return specialForms[expr.operator.name](expr.args,env);
            }

            var op = evaluate(expr.operator,env);
            if(typeof op != "function")
            {
                throw new TypeError("Applying a non-function");

            }
            return op.apply(null,expr.args.map(function(arg){ return evaluate(arg,env);}));
    }
}

// Defining the special forms


// The if construct
specialForms["kiKhapp"] = function(args,env){
    if(args.length != 3)
        throw new SyntaxError("Jyada e arguments va");
    if(evaluate(args[0],env) !== false)
        return evaluate(args[1],env);
    else
        return evaluate(args[2],env);

};

// The while construct
specialForms["jadoTak"] = function(args,env) {

    if (args.length != 2) {
        throw new SyntaxError("Bad no. of args to korKor");
    }

    while (evaluate(args[0], env) !== false)
        evaluate(args[1], env);


    return false;

};


// The basic do construct - that executes statements in the order they are appearing

specialForms["korKor"] = function(args,env){

    var value;

    args.forEach(function(arg){
        value = evaluate(arg,env);
    });

    return value;
};

specialForms["dindaa"] = function(args,env){

    if(args.length != 2 || args[0].type != "word")
    {
        throw new SyntaxError("Aukha kinna: dindaa galt vaa");
    }
    var value = evaluate(args[1],env);
    env[args[0].name] = value;
    return value;
};


// The top most environment variable
var topEnv = {};

// boolean true
topEnv["aaho"] = true;

// boolean false
topEnv["naLgdaNi"] = false;

// define the operators

["+","-","*","/","==",">","<"].forEach(function(abc){

    topEnv[abc] = new Function("a,b","return a" + abc + "b;");

});


// define the print function, that prints value to the console

topEnv["dasdaa"] = function(value){

    console.log(value);
    return value;
};

// The run method - entry point
function officialJeha(){

    var env = Object.create(topEnv);

    var program = Array.prototype.slice.call(arguments,0).join('\n');

    console.log(program);


    return evaluate(parse(program),env);

}

officialJeha("korKor(dindaa(total,0),",
    "dindaa(count,1),",
    "jadoTak(<(count,11),",
    "korKor(dindaa(total,+(total,count)),",

    "dindaa(count, +(count,1)))),",
    "dasdaa(total))"
);
