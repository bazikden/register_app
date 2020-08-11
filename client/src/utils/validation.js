export const validate = (values,form) => {
    const errors = {}
    if(form === 'first'){
        if(!values.firstName || values.firstName.length < 3) {errors.firstName = 'Name must be more ther 2 symbols'}
        if(!values.lastName || values.lastName.length < 3) {errors.lastName = 'Lastame must be more ther 2 symbols'}
        if(!values.email || values.email.length === 0){errors.email = 'Please enter email'}
    }else{   
        if(!values.companyName || values.companyName.length < 3) {errors.companyName = 'Name of company must be more ther 2 symbols'}
        if(!values.country || values.country.length === 0) {errors.country = 'Enter the country'}
        if(!values.birthday) {errors.birthday = 'Enter the BirthDate'}
        if(!values.positionInCompany || values.positionInCompany.length === 0) {errors.positionInCompany = 'Enter the position'}
        if(values.dateOfArival === ''){errors.dateOfArival = 'Enter start date'}
        if(values.dateOfDeparture === ''){errors.dateOfDeparture = 'Enter end date'}
    }
    let res 
    if(Object.keys(errors).length > 0) {
         res =  errors 
    } else{
        res = null 
    } 
    return res
    
}