import numeral from "numeral";

export const Humanize = (value:any): string => {
    return(
        numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')
    );
};





export const Transform =(formData:any):any => {
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            if (Array.isArray(formData[key]) && formData[key].length > 0) {
                formData[key]=formData[key][0].value;
            }
            if (Array.isArray(formData[key]) && formData[key].length === 0) {
                formData[key]='';
            }
        }
    }
    return(formData)
}
