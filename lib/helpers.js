/*
*
*this is the helpers module
*/


//Dependencies

// container
let helpers = {};

helpers.generateTokenId = function(strLength){
	let allPossibleCharacters = '0123456789abcdefghijklmnopqrstuvwxyz';
	let tokenData = '';
	for(let i =0; i< strLength; i++){
		tokenData +=allPossibleCharacters.charAt(Math.floor(Math.random()* allPossibleCharacters.length));

	}
	return tokenData;
}


//export module

module.exports = helpers;