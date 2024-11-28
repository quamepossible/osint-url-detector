
const RefinedRes = (phish_result) => {
    const refine_phish_obj = phish_result

    if ( phish_result?.creation_date && phish_result?.expiration_date ) {
        let { creation_date, expiration_date, url } = refine_phish_obj;
        const date_created = new Date(creation_date)
        const date_expires = new Date(expiration_date)
        let year_age = Math.floor((Date.now() - date_created) / (1000*60*60*24*365));
        let isMonth;
        let isNew;
        if (year_age === 0) { 
            isMonth = Math.floor((Date.now() - date_created) / (1000*60*60*24*30));
        }
        if (isMonth === 0) {
            isNew = '*New'
        }
        return {
            url,
            age: year_age > 0 ? `${year_age} years` : isMonth > 0 ? `${isMonth} months` : isNew,       
            ...phish_result,
            creation_date: creation_date = new Date(creation_date).toLocaleDateString('en-US',{month:'short',year:'numeric'}),
            expiration_date: new Date(expiration_date).toLocaleDateString('en-US',{month:'short',year:'numeric'}),
        }
    }
    else {
        return {
            ...phish_result,
            creation_date: 'n/a',
            expiration_date: 'n/a',
        }
    }
}

export { RefinedRes } 