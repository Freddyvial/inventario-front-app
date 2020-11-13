import login from "../page_model/login";
import menu from "../page_model/menu";
import medical from "../page_model/medical";
const pagelogin = new login();
const selecmenu = new menu();
const pagemedical=new medical()



fixture`Ejemplo page Object Model`
    .page`http://localhost:9000/`;
test('Ejemplo Garantizar TestCafe', async t => {
    await t
        .click(selecmenu.displayMenu) // Ingresar al Menu 
        .click(selecmenu.clickLogin) // Ingresar al  login        
        .typeText(pagelogin.userName, 'admin@admin') // Ingresar Usuario
        .wait(10)
        .typeText(pagelogin.password, 'admin') // Ingresar contraseña
        .wait(10)
        .click(pagelogin.submit) // click en Submit
        .wait(10)
        .click(pagemedical.clickButtonNew)//Click button new
        .typeText(pagemedical.sendNumberMedical, '999999')// Send Name

    // .expect(flightdetails.passengers.value).eql('1'); // Comprobar resultado
});
