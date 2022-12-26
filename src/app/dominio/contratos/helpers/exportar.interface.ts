export abstract class IExportarHelper {
    abstract exportarXLS(arquivoNome: string, dados: any[]): void;
    abstract exportarXLSX(arquivoNome: string, dados: any[]): void;
    abstract exportarCSV(arquivoNome: string, dados: any[]): void;
}
