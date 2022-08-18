let input_data = document.getElementById('entrada_data').addEventListener("change", getData)
let resultado = document.getElementById('resultado')
const Calendar = tui.Calendar
let eventos = []
let container = document.getElementById('calendar')

function getData(){
    let entrada = this.value    
    // estudar promises e/ou settimeout para aplicar aqui: criar calendario acontecerá apenas depois que tiver o retorno da calculodata
    resultado.value = calculoData( new Date(entrada))
    criarCalendario(eventos)
    eventos = []
    
    
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
            dia[diaAtualizado] = 'Trabalha'
            dias_trabalho++
        } else {
            if(dias_folga < 3){
                dia[diaAtualizado] = 'Folga 0/'
                dias_folga++
            } else {
                dia[diaAtualizado] = 'Trabalha'
                dias_folga = 1
                dias_trabalho = 2
            }
        }
        intervalo = intervalo + tempoNumDia
        let stringEvento = dia[diaAtualizado]
        eventos.push(
            {
                id: intervalo,
                calendarId: 'cal1',
                title: dia[diaAtualizado],
                start: `${dia_dinamico.getFullYear()}-${('0'+(dia_dinamico.getMonth()+1)).slice(-2)}-${('0'+(dia_dinamico.getDate())).slice(-2)}T08:00:00`,
                end: `${dia_dinamico.getFullYear()}-${('0'+(dia_dinamico.getMonth()+1)).slice(-2)}-${('0'+(dia_dinamico.getDate())).slice(-2)}T09:00:00`,
                category: 'allday',
                body: '       ',
                state: 'Busy',
                isFocused: true,
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

let calendar = new Calendar(container, options)
function criarCalendario(eventos){
    calendar.clear()
    calendar.createEvents(eventos)
    calendar.render()
    eventos = []
    
    
    
}

const move = (offset) => {
    if (offset === -1) {
      calendar.prev();
    } else if (offset === 1) {
      calendar.next();
    }
  }

//-------fim do calendario