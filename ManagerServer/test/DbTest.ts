import { UserCredentialsDBAccess } from "../src/Authorization/UserCredentialsDBAccess";
import { UsersDBAccess } from "../src/User/UsersDBAccess";



class DbTest {

    public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    public userDbAccess: UsersDBAccess = new UsersDBAccess();
}

new DbTest().userDbAccess.putUser({
    age: 34,
    email: 'w@gmail.de',
    id: 'afwioj',
    name: 'Hans Abc',
    workingPosition: 3
}); 