/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    this.element.update;
    Account.create(data, (err, resp) => {
        if (resp && resp.success) {
            this.element.reset();
            App.getModal('createAccount').close();  
            App.update();
        } else {          
          App.getModal('createAccount').close();  
        }
    });
  }
}