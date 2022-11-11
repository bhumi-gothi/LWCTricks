import { LightningElement } from 'lwc';
import createAccountContact from '@salesforce/apex/LWCTricks.createAccountContact';
import createAccountOpp from '@salesforce/apex/LWCTricks.createAccountOpp';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PromisesTutorial extends LightningElement {

    accountCount = 0;
    contactCount = 0;
    oppCount = 0;
    handleCountChange(event){
        
        if(event.target.name == 'account'){
            this.accountCount = event.detail.value;
        } else if(event.target.name == 'contact'){
            this.contactCount = event.detail.value;
        }else if(event.target.name == 'opp'){
            this.oppCount = event.detail.value;
        }
        console.log(this.accountCount);
        console.log(this.contactCount);
        console.log(this.oppCount);
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
        // accounts.forEach((element , index) => {
        //     console.log(JSON.stringify(element));
        //     createAccountContact({accW: element}).then(result => {
        //         console.log(result);
        //         let opp = {
        //             Name: 'Saleforce Opportunity ' +index,
        //             AccountId: result,
        //             StageName: 'Prospecting',
        //             CloseDate: new Date()
        //         }
        //         createAccountOpp({oppW: opp}).then(response => {
        //             console.log('Opportunity Response');
        //             console.log(response);
        //             const evnt = new ShowToastEvent({
        //                 "title": "Success!",
        //                 "message": 'Opp created successfully',
        //                 "variant": 'success',
        //             });
        //             this.dispatchEvent(evnt);
        //         });
        //     }).catch(error => {
        //         console.log('loadTemplate-Error',error);
        //     })
        // });
        // console.log('Test after forEach');
        let createAccountContacts = [];

        accounts.forEach(async element =>{
            console.log(JSON.stringify(element));
            console.log('1');
            createAccountContacts.push(createAccountContact({accW: element}));
        });
        let createAccountOpps = [];
        await (Promise.all(createAccountContacts)
            .then((data) => {
                console.log('data');
                console.log(data);
                data.forEach((element,index)=>{
                    console.log('element');
                    console.log(element);
                    let opp = {
                        Name: 'Saleforce Opportunity ' +index,
                        AccountId: element,
                        StageName: 'Prospecting',
                        CloseDate: new Date()
                    }
                    createAccountOpps.push(createAccountOpp({oppW: opp}));
                })
            }).catch((err) => {
                console.log('err');
                console.log(err);
            })
        );
        await (Promise.all(createAccountOpps)
            .then((data) => {
                console.log('data');
                console.log(data);
            }).catch((err) => {
                console.log('err');
                console.log(err);
            })
        );
        console.log('Test after Promise');
    }
}