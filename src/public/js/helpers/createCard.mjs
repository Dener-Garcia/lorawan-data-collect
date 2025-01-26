import { convertStatusText } from "./convertStatusText.mjs"

export const createCard = (remoteIo) => {
    const {machine, status, workcenter, remoteName} = remoteIo
    const {DI0, DI1, DI2, DI3} = remoteIo.data.data
    const {datetime} = remoteIo.data.info

    const dateFormated = datetime.slice(11, -1)

    const statusDI0 = convertStatusText(DI0.status.SignalLogic);
    const statusDI1 = convertStatusText(DI1.status.SignalLogic);
    const statusDI2 = convertStatusText(DI2.status.SignalLogic);
    const statusDI3 = convertStatusText(DI3.status.SignalLogic);

    const card = document.createElement("div")

    card.innerHTML =
             `
             <div class="card">
                <div class="content">
                <div class="title">
                    <h3>Modulo <span>${workcenter}</span></h3>
                      <img src="../assets/grinder.svg" alt="icone twi machine" />
                </div>      
                    <div class="infos">
                        <div class="status">
                            <p>Leitura OK</p>
                            <span>${remoteName} ${status}</span>
                        </div>
                        <div class="status">
                            <p>Última atualização</p>
                            <span>${dateDevice}</span>
                        </div>
                        <div class="status">
                            <p>Máquina rodando DI0</p>
                            <span class=${statusClass}>${statusInput0}</span>
                        </div>
                        <div class="status">
                            <p>Máquina standby DI1</p>
                            <span class=${statusClass}>${statusInput1}</span>
                        </div>
                    </div>
                </div>
            </div>    
    `
}