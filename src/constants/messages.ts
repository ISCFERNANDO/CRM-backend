export enum Messages {
    NOT_FOUND_ENDPOINT = 'No se encontró el recurso',
    OPERATION_OK = 'Operación exitosa',
    ADD_ACCESS_OK = 'El acceso se agregó correctamente',
    UPDATE_ACCESS_OK = 'El acceso se actualizó correctamente',
    DELETE_ACCESS_OK = 'El acceso se eliminó correctamente',
    GET_ACCESS_ERROR = 'Ocurrió un error al obtener los accesos',
    ADD_ACCESS_ERROR = 'Ocurrió un error al agregar el acceso',
    ACCESS_NOT_FOUND = 'No se encontró el acceso',
    ACCESS_EXIST = 'Ya existe un acceso con el mismo nombre',
    ACCESS_NOT_REMOVABLE = 'No se puede eliminar un acceso de sistema',
    BAD_REQUEST = 'Error en la petición',
    PARAM_NOT_ARRAY = 'El parámetro debe ser un arreglo',
    GET_ROLLS_ERROR = 'Ocurrió un error al obtener los roles',
    ADD_ROLL_ERROR = 'Ocurrió un error al agregar el rol',
    ADD_ROLL_OK = 'El rol se agregó correctamente',
    UPDATE_ROLL_OK = 'El rol se actualizó correctamente',
    ROLL_NOT_FOUND = 'No se encontró el rol',
    ROLL_EXIST = 'Ya existe un rol con el mismo nombre',
    ROLL_NOT_REMOVABLE = 'No se puede eliminar un rol de sistema',
    DELETE_ROLL_OK = 'El rol se eliminó correctamente',
    UPLOAD_SUCCESS = 'El archivo se subió correctamente',
    UPLOAD_FAILED = 'Ocurrió un error al subir el archivo',
    GET_USERS_ERROR = 'Ocurrió un error al obtener los usuarios',
    ADD_USER_ERROR = 'Ocurrió un error al agregar el usuario',
    ADD_USER_OK = 'El usuario se agregó correctamente',
    UPDATE_USER_OK = 'El usuario se actualizó correctamente',
    USER_EXIST = 'Ya existe un usuario con el mismo nombre',
    USER_NOT_REMOVABLE = 'No se puede eliminar un usuario de sistema',
    USER_NOT_FOUND = 'No se encontró el usuario',
    EMAIL_OR_PASSWORD_NOT_FOUND = 'Correo y/o contraseña incorrecto(s)',
    DELETE_USER_OK = 'El usuario se eliminó correctamente',
    ERROR_LOGIN = 'Ocurrió un error al iniciar sesión'
}
