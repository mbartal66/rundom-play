export default class UserCredentials{
    // Possible username options
    public static readonly STANDARD_USER = 'standard_user';
    public static readonly LOCKED_OUT_USER = 'locked_out_user';
    public static readonly PROBLEM_USER = 'problem_user';
    public static readonly PERFORMANCE_GLITCH_USER = 'performance_glitch_user';

    // Possible password options
    public static readonly CORECT_PASSWORD = 'secret_sauce';
    public static readonly WRONG_PASSWORD = 'wrong_password';

}