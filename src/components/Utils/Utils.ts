import numeral from "numeral";

const Humanize = (value:any): string => {
    return(
        numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')
    );
};


export default  Humanize;