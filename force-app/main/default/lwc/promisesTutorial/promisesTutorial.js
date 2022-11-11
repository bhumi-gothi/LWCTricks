import { LightningElement } from 'lwc';
import createAccountContact from '@salesforce/apex/LWCTricks.createAccountContact';

export default class PromisesTutorial extends LightningElement {

    accountCount = 0;
    contactCount = 0;
    handleCountChange(event){
        
        if(event.target.name == 'account'){
            this.accountCount = event.detail.value;
        } else if(event.target.name == 'contact'){
            this.contactCount = event.detail.value;
        }
        console.log(this.accountCount);
        console.log(this.contactCount)
    }
    
    async handleSubmit(event){
        console.log(this.accountCount);
        console.log(this.contactCount);
        let accounts = [];
        for(let i=0 ; i<this.accountCount; i++){
            console.log(this.accountCount);
            let contacts = [];
            for(let j=0; j<this.contactCount; j++){
                let contact = {
                    LastName: 'Saleforce Contact ' +i +j,
                    Email: 'sales'+i+j+'@example.com'
                }
                contacts.push(contact);
            }
            let account = {
                name: 'Salesforce ' + i,
                contacts: contacts
            }
            accounts.push(account);
        }
        // console.log(JSON.stringify(accounts));
        // accounts.forEach(element => {
        //     console.log(JSON.stringify(element));
        //     console.log('1');
        //     createAccountContact({accW: element}).then(result => {
        //         console.log(result);
        //     }).catch(error => {
        //         console.log('loadTemplate-Error',error);
        //     })
        // });
        let createAccountContacts = [];

        accounts.forEach(async element =>{
            console.log(JSON.stringify(element));
            console.log('1');
            createAccountContacts.push(createAccountContact({accW: element}));
        });

        await (Promise.all(createAccountContacts)
            .then((data) => {
                console.log('data');
                console.log(data);
            }).catch((err) => {
                console.log('err');
                console.log(err);
            })
        );
    }
}