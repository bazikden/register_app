export const validate = (data) =>{
    const errors = {}
    if(data.email.length === 0 || !data.email){
        errors.email = 'Please enter the email'
    }
    if(!data.password || data.password.length === 0){
        errors.password = 'Please enter the password'
    }

    if(Object.keys(errors).length !== 0){
        return errors
    }else{
        return null
    }
}