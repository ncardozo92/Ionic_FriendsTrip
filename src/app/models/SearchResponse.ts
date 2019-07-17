export class SearchResponse{
    public Destino: string ;
    public Origen: string;
    public Aerolinea: string;
    public NumeroVuelo: string;
    public InteresActividades: boolean;
    public InteresExcursiones: boolean;
    public InteresTraslados: boolean;
    public InteresAmistades: boolean;
    public InteresAlojamiento: boolean;
    public InteresOtros: boolean;
    public FechaDesde: string;
    public FechaHasta: string;
    public Alojamiento: string;
    public EstadoSeguimiento: string;
    //datos del usuario
    public IdUsuario: number;
    public NombreUsuario: string;
    public Email: string;
    public Edad: number;
    public Calificacion: number;
}