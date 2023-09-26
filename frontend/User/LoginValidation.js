function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}/

    if (values.email === "") {
        error.email = "Insert a valid e-mail";
    } else if (!email_pattern.test(values.email)) {
        error.email = "E-mail doesn't match";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Please insert a password";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password doesn't match";
    } else {
        error.password = "";
    }
    return error;

}
export default Validation;
