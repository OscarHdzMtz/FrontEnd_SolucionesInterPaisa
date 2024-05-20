export interface Ihotspotmikrotiks {
    routers_id: number;
    empresa_id: number;
    nombre: string;
    identity: string | null;
    direccion_ip: string;
    puerto_api: number | 0;
    puerto_apissl: number | 0;
    puerto_ftp: number | 0;
    puerto_ssh: number | 0;
    puerto_telnet: number | 0;
    puerto_winbox: number | 0;
    puerto_www: number | 0;
    puerto_wwwssl: number | 0;
    usuario: string;
    password: string;
    active_status: boolean;
    status: boolean;
    created_at: string;
    updated_at: string;
    adm_empresa: {
        empresa_id: number;
        rol_id: number;
        nombre: string;
        descripcion: string;
        correo: string;
        sitio_web: string;
        direccion: string;
        ciudad: string;
        estado: boolean;
        codigo_postal: string;
        pais: string;
        telefono: string;
        logo: string;
        tipo_moneda: string;
        active_status: boolean;
        created_at: string;
        updated_at: string;
        rol: any; // No se especifica el tipo para rol en el ejemplo dado
    };
}
