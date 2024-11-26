
const RefinedRes = (phish_result) => {
    const refine_phish_obj = phish_result

    if ( phish_result?.creation_date && phish_result?.expiration_date ) {
        let { creation_date, expiration_date, url } = refine_phish_obj;
        const date_created = new Date(creation_date)
        const date_expires = new Date(expiration_date)
        let year_age = Math.floor((Date.now() - date_created) / (1000*60*60*24*365));
        // let month_age = year_age === 0 ? Math.floor((date_created - date_expires) / (1000*60*60*24*30)) : 0
        // const age_desc = year_age === 1 ? `${year_age} Year` : year_age > 1 ? `${year_age} Years` : year_age === 0 && month_age > 1 ? `${month_age} Months` : `${month_age} Month`;
        
        return {
            url,
            age: year_age,       
            ...phish_result,
            creation_date: creation_date = new Date(creation_date).toLocaleDateString('en-US',{month:'short',year:'numeric'}),
            expiration_date: new Date(expiration_date).toLocaleDateString('en-US',{month:'short',year:'numeric'}),
        }
    }
    else {
        return {
            // url: phish_result.url,
            ...phish_result,
            creation_date: 'n/a',
            expiration_date: 'n/a',
        }
    }
}

export { RefinedRes } 