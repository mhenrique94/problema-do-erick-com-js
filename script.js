let input_data = document.getElementById('entrada_data').addEventListener("change", getData)
let resultado = document.getElementById('resultado')
const Calendar = tui.Calendar
let eventos = []
let container = document.getElementById('calendar')


function getData(){
    eventos = []
    let entrada = this.value

    // estudar promises e/ou settimeout para aplicar aqui: criar calendario acontecerá apenas depois que tiver o retorno da calculodata
    resultado.value = calculoData( new Date(entrada))
    criarCalendario(eventos)
    
    
}

function calculoData(dataEntrada){
    dataEntrada.setDate(dataEntrada.getDate()+1)
    let dataAtual = new Date()
    let difTempo = Math.abs(dataEntrada-dataAtual)
    let tempoNumDia = 1000 * 60 * 60 * 24
    let dias_trabalho = 1
    let dias_folga = 1
    let dia = new Object()
    let intervalo = 0
    let dia_dinamico = new Date(dataAtual)
    
    let dataEntradaFormatada = `${dataEntrada.getDate()}/${dataEntrada.getMonth()+1}/${dataEntrada.getFullYear()}`

    while (intervalo < difTempo) {
        let diaAtualizado = `${dia_dinamico.getDate()}/${dia_dinamico.getMonth()+1}/${dia_dinamico.getFullYear()}`
        
        if (dias_trabalho < 7){
            dia[diaAtualizado] = 'Trabalha? Sim.'
            dias_trabalho++
        } else {
            if(dias_folga < 3){
                dia[diaAtualizado] = 'Folga 0/'
                dias_folga++
            } else {
                dia[diaAtualizado] = 'Trabalha? Sim.'
                dias_folga = 1
                dias_trabalho = 2
            }
        }
        intervalo = intervalo + tempoNumDia
        eventos.push(
            {
                id: intervalo,
                calendarId: 'cal1',
                title: dia[diaAtualizado],
                start: new Date(dia_dinamico),
                end: new Date(dia_dinamico)
            }
            )
            dia_dinamico.setDate(dia_dinamico.getDate() + 1)
    }
    
    return `${dataEntradaFormatada}: ${dia[dataEntradaFormatada]}`
}


//-------inicio do calendario


let options = {
    defaultView: 'month',
    timezone: {
        zones: [
            {
                timezoneName: 'America/Sao_Paulo',
                displayLabel: 'São Paulo',
            },
        ],
    },
    calendars: [
        {
            id: 'cal1',
            name: 'Personal',
            backgroundColor: '#03bd9e',
        },
    ],
};
function criarCalendario(eventos){
    let calendar = new Calendar(container, options)
    calendar.createEvents(eventos)
    calendar.render()
}
//-------fim do calendario