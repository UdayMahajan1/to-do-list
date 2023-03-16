// This is the date module. It can now be used in different js files by requiring it. 
// the exports keyword is an object which exports the getDate method when required by other file. 

exports.getDate = function () {

    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    const today  = new Date(); 

// toLocaleDateString function gives us the date in a formatted version which is 
// specified by the options js object

    return today.toLocaleDateString("en-US", options) ; 

}