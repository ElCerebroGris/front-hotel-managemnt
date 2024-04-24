export class GeneralConstants {
  static BASE_URL_GRELHA = 'https://uqualidadegrelha.df.co.ao/';
  //static BASE_URL_GRELHA = 'http://10.11.1.68:9802/';
  //static BASE_URL_GRELHA = 'http://localhost:4201/';
  static BASE_URL = 'https://uqualidade.df.co.ao/';
  //static BASE_URL = 'http://10.11.1.68:9801/';

  static ESTADO = {
    ATIVADO: { code: 1, info: 'Activo' },
    DESATIVADO: { code: 2, info: 'Desativado' },
    toArray: () => {
      return [
        GeneralConstants.ESTADO.ATIVADO,
        GeneralConstants.ESTADO.DESATIVADO,
      ];
    },
    getInfo: (code: number) => {
      return GeneralConstants.ESTADO.toArray()
        .filter((p) => p.code == code)
        .pop()!.info;
    },
  };

  static NIVEL_USUARIO = {
    ADMINISTRADOR: { code: 1, info: 'Administrador' },
    AUDITOR: { code: 2, info: 'AUDITOR' },
    GESTOR_CLIENTE: { code: 3, info: 'OPERADOR' },
    SUPERVISOR: { code: 4, info: 'SUPERVISOR' },
    FORMADOR: { code: 5, info: 'formador' },
    toArray: () => {
      return [
        GeneralConstants.NIVEL_USUARIO.ADMINISTRADOR,
        GeneralConstants.NIVEL_USUARIO.AUDITOR,
        GeneralConstants.NIVEL_USUARIO.GESTOR_CLIENTE,
        GeneralConstants.NIVEL_USUARIO.SUPERVISOR,
        GeneralConstants.NIVEL_USUARIO.FORMADOR,
      ];
    },
    getInfo: (code: number) => {
      return GeneralConstants.NIVEL_USUARIO.toArray()
        .filter((p) => p.code == code)
        .pop()!.info;
    },
  };

  static AREAS = {
    RH: { code: 1, info: 'RH' },
    DTI: { code: 2, info: 'DTI' },
    ADMINISTRACAO: { code: 3, info: 'ADMINISTRAÇÃO' },
    toArray: () => {
      return [
        GeneralConstants.AREAS.RH,
        GeneralConstants.AREAS.DTI,
        GeneralConstants.AREAS.ADMINISTRACAO,
      ];
    },
    getInfo: (code: number) => {
      const area = GeneralConstants.AREAS.toArray()
        .filter((p) => p.code == code)
        .pop();
      return area != null ? area.info : '';
    },
  };

  static USER_AUTH = {
    TOKEN_KEY: 'ombala_token',
    API_TOKEN_KEY: 'api_ombala_token',
    SMS_KEY: 'ombala_sms',
    ROLE_KEY: 'ombala_role',
    USERID_KEY: 'intra_user_id',
    USERNAME_KEY: 'intra_user_nome',
    USEREMAIL_KEY: 'intra_user_email',
    TIPOUSER_KEY: 'intra_tipo_user',
    AREAUSER_KEY: 'intra_area_user'
  };
}
