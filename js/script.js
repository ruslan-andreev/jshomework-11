class User {
    //передаем св-ва в виде обьекта
    constructor(data){
        this.data = data;
    }
    //изменяет указанные свойства в data
    edit(data){
        for (let key in data) {
            if (this.data[key] != undefined) this.data[key] = data[key];
        }
    }
    //возвращает св-ва User
    get(){
        return this.data;
    }
}

class ContactsList {
    constructor(){
        this.data = [];
    }
    // add "data" передается в new User "data"
    add(data){

        const user = new User(data);

        if (data.id == undefined) data.id = 0;
        let maxId = 0;

        this.data.forEach(user => {
            if (user.data.id != undefined) {
                if (maxId == undefined) maxId = +user.data.id;
                else if (maxId < +user.data.id) maxId = +user.data.id;
            }
        });

        maxId++;
        // вызываем метов edit у user  добавляем св Id строка 6
        user.edit({id: maxId});
        //добавляем user в массив data класса ContactsList
        this.data.push(user);

    }

    edit(id,data){
        let user = this.data.filter(user => {
            return +user.data.id == +id;
        });

        if (user.length == 0) return;
        // filter возвращает массив user будет под индексом 0
        user = user[0];
        user.edit(data);

    }
    remove(id){
        this.data = this.data.filter(user => {
            return +user.data.id != +id; //вернет в data все id которые не совпадают
        });

    }
    get(){
        return this.data;
    }

}

class ContactsApp extends ContactsList {
    constructor(){
        super();
        this.init();
    }
    init(){
        const contactsApp = document.createElement('div');
        contactsApp.classList.add('contact__app');
        document.body.appendChild(contactsApp);

        const titleApp = document.createElement('h1');
        titleApp.classList.add('title__app');
        titleApp.innerHTML = 'Contacts Book';
        contactsApp.appendChild(titleApp);
        
        const contactsForm = document.createElement('div');
        contactsForm.classList.add('form');
        contactsApp.appendChild(contactsForm);

        this.inputName = document.createElement('input');
        this.inputName.setAttribute('type', 'text');
        this.inputName.setAttribute('name', 'Имя');
        this.inputName.setAttribute('placeholder', 'Введите имя');
        contactsForm.appendChild(this.inputName);

        this.inputCity = document.createElement('input');
        this.inputCity.setAttribute('type', 'text'); 
        this.inputCity.setAttribute('name', 'Город');
        this.inputCity.setAttribute('placeholder', 'Введите город');
        contactsForm.appendChild(this.inputCity);

        this.inputEmail = document.createElement('input');
        this.inputEmail.setAttribute('type','email');
        this.inputEmail.setAttribute('name', 'E-mail');
        this.inputEmail.setAttribute('placeholder', 'Введите email');
        contactsForm.appendChild(this.inputEmail);

        this.inputPhone = document.createElement('input');
        this.inputPhone.setAttribute('type','tel');
        this.inputPhone.setAttribute('name','Телефон');
        this.inputPhone.setAttribute('placeholder', 'Введите телефон');
        contactsForm.appendChild(this.inputPhone);

        const addBtn = document.createElement('button');
        addBtn.classList.add('add__btn');
        addBtn.innerHTML = 'Add contact';
        contactsForm.appendChild(addBtn);

        addBtn.addEventListener('click', event =>{
            this.onAdd(event);
        })

        this.contactsList = document.createElement('div');
        this.contactsList.classList.add('contact__list');
        contactsApp.appendChild(this.contactsList);
    }
    updateList(){
        this.contactsList.innerHTML = '';
        this.data.forEach(user => {
            const contact = document.createElement('div');
            contact.classList.add('contact__item');
            this.contactsList.appendChild(contact);

            const pName = document.createElement('p');
            pName.innerHTML = user.data.name || '';
            const pCity = document.createElement('p');
            pCity.innerHTML = user.data.city || '';
            const pEmail = document.createElement('p');
            pEmail.innerHTML = user.data.email || '';
            const pPhone = document.createElement('p');
            pPhone.innerHTML = user.data.phone || '';

            //contactsList.appendChild(contact);
            contact.appendChild(pName);
            contact.appendChild(pCity);
            contact.appendChild(pEmail);
            contact.appendChild(pPhone);


            const btnEdit = document.createElement('button');
            btnEdit.innerHTML = 'Edit';
            
            const btnDelete = document.createElement('button');
            btnDelete.innerHTML = 'Delete';

            contact.appendChild(btnEdit);
            contact.appendChild(btnDelete);

            btnEdit.addEventListener('click', event =>{
                this.onEdit(event);
                
            });

            btnDelete.addEventListener('click', event =>{
                this.onRemove(event);
            });

        });

    }

    onAdd(event){
        //if(event.type == 'keyup' && (event.ctrlKey != true || event.key != 'Enter')) return;
        if (event.type !='click') return;


        const data = {
            name:(this.inputName && this.inputName.value.length > 0) ? this.inputName.value : '',
            city:(this.inputCity && this.inputCity.value.length > 0) ? this.inputCity.value : '',
            email:(this.inputEmail && this.inputEmail.value.length > 0) ? this.inputEmail.value : '',
            //phone:(this.inputPhone && this.inputPhone.value.length > 0) ? this.notesPhone.value : ''
        }

        if (!this.inputName.dataset.action || !this.inputName.dataset.id){
            this.add(data)
        }else{
            this.edit(this.inputName.dataset.id, data);
            this.inputName.dataset.action = '';
            this.inputName.dataset.id = '';
        }

        console.log(data);
        console.log(this.data);

        this.updateList();
        this.inputName.value = '';
        this.inputCity.value = '';
        this.inputEmail.value = '';
        this.inputPhone.value = '';
    }
    onRemove(event){
        
        const parent = event.target.closest('.contact__item');
        const id = parent.dataset.id;
        
        
        if(!id) return;

        this.remove(id);
        this.updateList();
    }
    onEdit(event){
        const parent = event.target.closest('.contact__item');
        const id = parent.dataset.id;
        
        if(!id) return;

        const user = this.data.find(user =>{
            return user.data.id == id;
        });

        this.inputName.value = user.data.name;
        this.inputCity.value = user.data.city;
        this.inputEmail.value = user.data.email;
        this.inputPhone.value = user.data.phone;

        // Что к чему???
        this.inputName.dataset.action = 'edit';
        this.inputName.dataset.id = 'id';

    }
}



new ContactsApp();