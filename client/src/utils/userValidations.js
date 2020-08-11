export const userAddValidation = (data, type) => {
    const errors = {}

    if (data.firstName.length < 3) { errors.firstName = "Name must be more then 2 symbols" }
    if (data.lastName.length < 3) { errors.lastName = "Last Name must be more then 2 symbols" }
    if (!data.email || data.email.length < 3) { errors.email = "Enter email" }
    if (!data.password || data.password.length < 5) { errors.password = "Password must be more than 4" }

    if (type) {
        if (!data.oldPassword || data.oldPassword.length < 5) { errors.oldPassword = "Password must be more than 4" }
        if (!data.newPassword || data.newPassword.length < 5) { errors.newPassword = "Password must be more than 4" }
        if (!data.confirmNewPassword || data.confirmNewPassword.length < 5) { errors.confirmNewPassword = "Password must be more than 4" }
        if (data.newPassword !== data.confirmNewPassword) { errors.confirmNewPassword = "Passwords not same" }
    }

    if (Object.keys(errors).length > 0) {
        return errors
    } else {
        return null
    }
} 