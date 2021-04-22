export enum HttpStatus {
    /**Solicitud exitosa */
    OK = 200,
    /**Nuevo recurso creado */
    CREATED = 201,
    /**Solicitud inválida */
    BAD_REQUEST = 400,
    /**Usuario no autenticado */
    UNAUTHORIZED = 401,
    /**No hay permisos necesarios para la operación */
    FORBIDDEN = 403,
    /**El servidor no puede encontrar el recurso solicitado */
    NOT_FOUND = 404,
    /**Conflicto con el estado actual del servidor */
    CONFLICT = 409,
    /**El servidor  ha encontrado una situación que no sabe como manejarla*/
    INTERNAL_SERVER_ERROR = 500,
    /**El servidor obtuvo una respuesta inválida mientras trabaja como puerta de enlace */
    BAD_GATEWAY = 502
}
