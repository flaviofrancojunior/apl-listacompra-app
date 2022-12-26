export type CalendarioTipo = 'dia-mes-ano' | 'mes-ano';

/** Modelo de configuração do calendário
 * @param dataInicial Data inicial
 * @param dataMinima Data mínima
 * @param dataMaxima Data máxima
 * @param tipoCalendario Tipo do calendário
 * @param mostrarBotaoLimpar Exibe o botão [Limpar]
 * @param mostrarBotaoHoje Exibe o botão [Hoje]
 * @param fecharAoClicarFora Define o comportamento de fechamento
 * @param preFluxo Fluxo ou tela anterior antes de abrir o calendário
 */
export class CalendarioConfiguracao {
    dataInicial: Date;
    dataMinima?: Date;
    dataMaxima?: Date;
    tipoCalendario: CalendarioTipo;
    mostrarBotaoLimpar?: boolean;
    mostrarBotaoHoje?: boolean;
    fecharAoClicarFora?: boolean;
}
