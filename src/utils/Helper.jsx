export const getSentenceFromCamelCase = (message) => {
    let pattern = /[A-Za-z]/g;
    let messages = message.match(pattern);
    let errorMessage = "";
    for (let i = 0; i < messages.length; i++) {
      errorMessage +=
        messages[i] === messages[i].toUpperCase()
          ? " " + messages[i].toLowerCase()
          : messages[i];
    }
    return (errorMessage[0].toUpperCase() + errorMessage.slice(1)).trim();
  };
  
  export const getRegExp = (type) => {
    let regex = null;
    switch (type) {
      case "email":
        regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
        break;
      case "number":
        regex = /^\d*$/;
        break;
      case "password":
        regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        break;
      case "name":
        // regex = /^[a-zA-Z ]+$/;
        regex = /^[a-zA-Z0-9][a-zA-Z0-9 ]{2,30}$/;
        break;
      default:
        break;
    }
    return regex;
  };
  
  export const validate = (data, errors, select = []) => {
    let isError = false,
      inValid = false;
    if (Array.isArray(data)) {
      for (let field of data) {
        if (field.regex && !getRegExp(field.regex).test(field.value)) {
          isError = true
          errors[field.name] = field.select
            ? `Please select valid ${getSentenceFromCamelCase(field.name)}.`
            : `Please enter valid ${getSentenceFromCamelCase(field.name)}.`
        } else if (
          field.value === null ||
          field.value === undefined ||
          field.value.length <= 0
        ) {
          isError = true;
          errors[field.name] = field.select
            ? `Please Select ${getSentenceFromCamelCase(field.name)}.`
            : `Please Enter ${getSentenceFromCamelCase(field.name)}.`;
        } else if (errors[field.name] && !inValid) {
          inValid = errors[field.name].value !== "" ? true : false;
        }
      }
    } else {
      Object.keys(data).map((key) => {
        if (
          data[key] === null ||
          data[key] === undefined ||
          data[key].length <= 0
        ) {
          isError = true;
          errors[key] = select.includes(key)
            ? `Please Select ${getSentenceFromCamelCase(key)}.`
            : `Please Enter ${getSentenceFromCamelCase(key)}.`;
        } else if (errors[key] && !inValid) {
          inValid = errors[key].value !== "" ? true : false;
        }
      });
    }
    if (isError) {
      return errors;
    } else if (inValid) {
      return errors;
    }
    return true;
  };
  
  export const getItemFromStorage = (key) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };
  
  export const setItemInStorage = (name, data) => {
    if (localStorage.getItem("form") === null) {
    window.localStorage.setItem(name, JSON.stringify(data));
    }else{
      
    }
  };

  export const removeItemFromStorage = (name) => {
    window.localStorage.removeItem(name);
  };
  