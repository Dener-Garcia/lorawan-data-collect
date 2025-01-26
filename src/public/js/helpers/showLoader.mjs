export const loader = () => {
    loaderContainer.innerHTML = ""
    
        const loader = loaderApex()
    
        loaderContainer.innerHTML = ""
        loaderContainer.innerHTML = `
            ${loader}
            <div class="message-output ${statusClass}">
                <p> ${message} </p>
                <span> ${error} </span>
            </div>
        `
}