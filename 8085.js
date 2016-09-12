
var parsedJSON = require('./opcode.json');
var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);


function findOpcode(mnemonic) {
	mnemonic = mnemonic.trim().toUpperCase();

	for(i=0; i<parsedJSON.length; i++)
		if(parsedJSON[i]['mnemonic'] === mnemonic)
			return(parsedJSON[i]['opcode']);
			
		
	

	mnemonic = mnemonic.split(" ");
	//if(mnemonic.match(/\d+/)) //not needed, hex notation has letters also
	for(i=0; i<parsedJSON.length; i++)
	{
		if(parsedJSON[i]['mnemonic'].split(" ")[0] === mnemonic[0]
		&& parsedJSON[i]['bytes']>1)
		{
			if(parsedJSON[i]['mnemonic'].split(" ")[0] === 'MVI') {
					if(parsedJSON[i]['mnemonic'].split(" ")[1]===mnemonic[1]) {
						if(mnemonic[2].length==2) 
							return(`${parsedJSON[i]['opcode']} ${mnemonic[2]}`); 
						
						else 
							return("Data is invalid. Length is not equal to 2 bytes");
					}
			else continue; 
		}	

			if(parsedJSON[i]['bytes']===3) {
				if(!mnemonic[1])
					return("No data is given to perform the operation");
					
				else if(mnemonic[1].length === 4) 
					return(`${parsedJSON[i]['opcode']} ${mnemonic[1].slice(-2)} ${mnemonic[1].slice(0, 2)}`);
				
				else 
					return("Data is invalid. Length is not equal to 4 bytes");
			}
			
			

			if(parsedJSON[i]['bytes']===2) {
				if(!mnemonic[1]) 
					return("No data is given to perform the operation");
					
				else if(mnemonic[1].length === 2) 
					return(`${parsedJSON[i]['opcode']} ${mnemonic[1]}`);
				
				else 
					return("Data is invalid. It's length is not equal to 2 bytes");
			}
		}	
	}		
	return('INVALID OPCODE');
}


rl.question("opcode please? ", function(answer) {

	console.log(findOpcode(answer));


	rl.setPrompt('opcode? ');
	rl.prompt();


	rl.on('line', (answer) => {
		if(answer.toLowerCase().trim() === 'exit') 
			rl.close();
		else {
			if(answer != '') 
				console.log(findOpcode(answer));

			rl.setPrompt('opcode? ');
			rl.prompt();
		}
	});

	rl.on('close', () => {
		console.log("\n\n---Application has successfully terminated---\n");

		process.exit();
	})
})







