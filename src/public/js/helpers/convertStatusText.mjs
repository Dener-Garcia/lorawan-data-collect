export const convertStatusText = (signal) => {
    if(signal === 0){
        return {text: "Desligado", className: "status-error"}
    }else{
        return {text: "Ligado", className: "status-success"}
    }

}