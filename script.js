let input_data = document.getElementById('entrada_data').addEventListener("change", getData)
let resultado = document.getElementById('resultado')

function getData(){
    //debbuger
    var entrada = this.value
    resultado.value = calculoData( new Date(entrada))
}

function calculoData(dataEntrada){
    dataEntrada.setDate(dataEntrada.getDate()+1)
    let dataAtual = new Date()
    let difTempo = Math.abs(dataEntrada-dataAtual)
    let tempoNumDia = 1000 * 60 * 60 * 24
    let dias_trabalho = 1
    let dias_folga = 1
    var dia = new Object()
    let intervalo = 0
    let dia_dinamico = new Date(dataAtual)

    var dataEntradaFormatada = `${dataEntrada.getDate()}/${dataEntrada.getMonth()+1}/${dataEntrada.getFullYear()}`

    while (intervalo < difTempo) {
        let diaAtualizado = `${dia_dinamico.getDate()}/${dia_dinamico.getMonth()+1}/${dia_dinamico.getFullYear()}`

        if (dias_trabalho < 7){
            dia[diaAtualizado] = 'Trabalha? Sim.'
            dias_trabalho++
        } else {
            if(dias_folga < 3){
                dia[diaAtualizado] = 'Trabalha? Não. Folga 0/'
                dias_folga++
            } else {
                dia[diaAtualizado] = 'Trabalha? Sim.'
                dias_folga = 1
                dias_trabalho = 2
            }
        }
        intervalo = intervalo + tempoNumDia
        dia_dinamico.setDate(dia_dinamico.getDate() + 1)
    }
    return `${dataEntradaFormatada}: ${dia[dataEntradaFormatada]}`
}