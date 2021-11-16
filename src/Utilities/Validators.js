export const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  
  export const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  };

  export const trimcontact = contact => {
    let number = contact;
    const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
    for(let i = 0; i < specialChars.length; i++){
      number = contact.replace(new RegExp("\\" + specialChars[i], "gi"),"");
    }
    return number;
    }
  
  
   export const validContact = receiver =>{
      let number = parseInt(trimcontact(receiver));
      if(!isNaN(number) &&  receiver.length > 9){
        //alert(number);
        return true;
      }else{
        return false;
      }
    }