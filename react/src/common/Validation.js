const validate = (data, type) => {
  const errors = {};

  const { f_userName, f_Pwd, confirmPassword, firstName, lastName } = data;

  if (type === "login") {
    // UserName validation
    if (!f_userName) {
      errors.f_userName = "Username is required";
    } else if (!/^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}$/.test(f_userName)) {
      errors.f_userName =
        "Invalid username. It should be 3-20 characters long, and can contain letters, numbers, dots, and underscores, but no consecutive dots or underscores.";
    }

    // Password validation
    if (!f_Pwd) {
      errors.f_Pwd = "Password is required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(f_Pwd)
    ) {
      errors.f_Pwd =
        "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
    }
  } else if (type === "signUp") {
    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    // UserName validation
    if (!f_userName) {
      errors.f_userName = "Username is required";
    } else if (!/^(?!.*[_.]{2})[a-zA-Z0-9._]{3,20}$/.test(f_userName)) {
      errors.f_userName =
        "Invalid username. It should be 3-20 characters long, and can contain letters, numbers, dots, and underscores, but no consecutive dots or underscores.";
    }

    // Password validation
    if (!f_Pwd) {
      errors.f_Pwd = "Password is required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(f_Pwd)
    ) {
      errors.f_Pwd =
        "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
    }
  } else if (type === "Employe") {
    // Validate Name
    if (!data.f_Name) {
      errors.f_Name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(data.f_Name)) {
      errors.f_Name = "Invalid name. Only letters and spaces are allowed.";
    }

    // Validate Email
    if (!data.f_Email) {
      errors.f_Email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.f_Email)) {
      errors.f_Email = "Invalid email address";
    }

    // Validate Mobile Number
    if (!data.f_Mobile) {
      errors.f_Mobile = "Mobile number is required";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(data.f_Mobile)) {
      errors.f_Mobile =
        "Invalid mobile number. It should be a valid international phone number.";
    }

    // Validate Designation
    if (!data.f_Designation) {
      errors.f_Designation = "Designation is required";
    } else if (!["HR", "Manager", "Sales"].includes(data.f_Designation)) {
      errors.f_Designation =
        "Invalid designation. Choose between HR, Manager, or Sales.";
    }

    // Validate Gender
    if (!data.f_gender) {
      errors.f_gender = "Gender is required";
    } else if (!["Male", "Female"].includes(data.f_gender)) {
      errors.f_gender = "Invalid gender. Choose between Male or Female.";
    }

    // Validate Course
    if (!data.f_Course || data.f_Course.length === 0) {
      errors.f_Course = "Course is required";
    } else {
      const invalidCourses = data.f_Course.filter(course => !['MCA', 'BCA', 'BSC'].includes(course));
      if (invalidCourses.length > 0) {
        errors.f_Course = "Invalid course selection. Choose between MCA, BCA, or BSC.";
      } else {
        delete errors.f_Course; // Clear any previous error
      }
    }
    

    // // Validate Image
    // if (!data.f_Image) {
    //   errors.f_Image = "Image URL is required";
    // } else if (
    //   !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(data.f_Image)
    // ) {
    //   errors.f_Image =
    //     "Invalid image URL. It should be a valid URL ending with an image extension (jpg, jpeg, png, webp, avif, gif, svg).";
    // }
  }
  return errors;
};

export default validate;
