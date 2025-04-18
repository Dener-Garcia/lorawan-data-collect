export const convertStatusText = (signal) => {
    console.log(signal)
    if(signal == 0){
        return {text: "Desligado", className: "status-error"}
    }else{
        return {text: "Ligado", className: "status-success"}
    }

}