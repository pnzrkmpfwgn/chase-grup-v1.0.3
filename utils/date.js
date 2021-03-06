import { formatWithOptions } from 'date-fns/fp'
import enUS from 'date-fns/locale/en-US'
import tr from 'date-fns/locale/tr'


const date=(dateText,lang)=>{
    let newDate=[]
    for(let i = 0; i < dateText.length;i++){
        if(dateText[i] ==="T"){
        newDate = dateText.slice(0,i).split("-");
        }
    }
    const date = [new Date(parseInt(newDate[0]),parseInt(newDate[1]-1),parseInt(newDate[2]))]
    let dateToString=""
    if(lang==="tr"){
        dateToString = formatWithOptions({locale:tr},'d MMMM yyyy')
    }else if(lang==="en"){
        dateToString = formatWithOptions({locale:enUS},"d MMMM yyyy")
    }else{
        return;
    }

    return date.map(dateToString);
}


export default date;