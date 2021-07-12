/**
 * A cada adição de environment no arquivo .env
 * é necessário/faz-se parte, da adição do nome
 * das environments neste arquivo de definição.
 *
 * Isto irá facilitar ao pegar as environments
 * quando utilizado.
 */
declare module '@env' {
  export const API_URL: string;
}
