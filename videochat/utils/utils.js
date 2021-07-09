var calls = []
const dd = console.log;
module.exports.calls = calls

function findObject(calls,el1,el2){
    var output = [];
    var counter = 0;
    for(var index=0;index<calls.length;index++){
        if((calls[index]["hostid"] == el1 && calls[index]["guestid"] == el2) || ( calls[index]["guestid"] == el1 && calls[index]["hostid"] == el2 )){
            counter++;
            output.push(calls[index]);
        }
    }
    return [counter,output];
}
const updateObject = (calls,field1, field2, updatefield) => {
    for(var index=0;index<calls.length;index++){
        if((calls[index]['hostid'] == field1 && calls[index]['guestid'] == field2) || (calls[index]['hostid'] == field2 && calls[index]["guestid"] == field1)){
            if(calls[index]['hostpeer'] == null) calls[index]['hostpeer'] = updatefield
            else if(calls[index]['guestpeer'] == null && calls[index]['hostpeer'] !== updatefield) calls[index]['guestpeer'] = updatefield
            else{
                console.log("Room Full")
            }
        }
    }
    return calls;
}

function deleteObject(calls,el1,el2){
    var output = [];
   for(var index=0;index<calls.length;index++){
       if((calls[index]["hostid"] == el1 && calls[index]["guestid"] == el2) || ( calls[index]["guestid"] == el1 && calls[index]["hostid"] == el2 )){
            dd("excuted2")
       }else{
            dd("excute32")
        output.push(calls[index]);
       }
    }
   return output;
}

module.exports.findObject = findObject
module.exports.updateObject = updateObject
module.exports.deleteObject = deleteObject