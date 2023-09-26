function ElectionsValidation(values) {
    let error = {};
    const city_pattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/;
    const pin_pattern = /^\d{13}$/;
    const zip_pattern = /^\d{1,6}$/;

    if (values.City === "") {
        error.City = "Please enter your City";
    } else if (!city_pattern.test(values.City)) {
        error.City = "The City must contain only letters";
    } else {
        error.City = "";
    }

    if (values.PersonalIdentNumber === "") {
        error.PersonalIdentNumber = "Please enter your PIN";
    } else if (!pin_pattern.test(values.PersonalIdentNumber)) {
        error.PersonalIdentNumber = "PIN must contain exactly 13 digits";
    } else {
        error.PersonalIdentNumber = "";
    }

    if (values.Zip === "") {
        error.Zip = "Please enter your Zip Code";
    } else if (!zip_pattern.test(values.Zip)) {
        error.Zip = "The Zip Code can only contain digits with max length of 6";
    } else {
        error.Zip = "";
    }
    
    return error;
        
}
export default ElectionsValidation
