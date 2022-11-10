import { LightningElement } from 'lwc';

export default class ComponentContainer extends LightningElement {
    buttonLabel = 'Hide Hello';
    showHelloChild = true;

    constructor(){
        //Called when the component is created. This hook flows from parent to child
        super();
        console.log('Parent Constructor');
    }
    connectedCallback(){
       //Called when the element is inserted into a document. This hook flows from parent to child
       console.log('Parent ConnectedCallBack');
    }
    renderedCallback(){
        //Called after every render of the component. This hook flows from child to parent.
        console.log('Parent RenderedCallBack');
    }
    // render(){
    //     //Call this method to update the UI. It may be called before or after connectedCallback()
    //     //Define business logic to decide which template (HTML file) to use. The method must return a valid HTML template
    //     console.log('Render');
    // }
    disconnectedCallback(){
        //Called when the element is removed from a document. This hook flows from parent to child.
        // Use disconnectedCallback() to clean up work done in the connectedCallback(), like purging caches or removing event listeners.
        console.log('Parent DisconnectedCallback');
    }
    errorCallback(error, stack){
        //Called when a descendant component throws an error. The error argument is a JavaScript native error object, and the stack argument is a string
        console.log('Parent ErrorCallBack');
    }
    hideHelloWorld(){
        this.showHelloChild = !this.showHelloChild;
        this.buttonLabel = this.showHelloChild ? 'Hide Hello' : 'Show Hello';
    }
}