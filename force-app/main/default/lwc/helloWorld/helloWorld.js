import { LightningElement } from 'lwc';
import SaffronTemplate from './helloSaffron.html';
import WhiteTemplate from './helloWhite.html';
import GreenTemplate from './helloGreen.html';
import HelloWorldTemplate from './helloWorld.html';

export default class HelloWorld extends LightningElement {

    name;
    textcolor;
    cardColor;
    handleChange(event){
        this.name = event.target.value;
    }

    handleClick(event){
        this.textcolor = event.target.label;
    }
    get dynamicStyle() {
		return "color: "+ this.textcolor + ";";
    }
    constructor(){
        //Called when the component is created. This hook flows from parent to child
        super();
        console.log('Child Constructor');
    }
    connectedCallback(){
       //Called when the element is inserted into a document. This hook flows from parent to child
       console.log('Child ConnectedCallBack');
    }
    renderedCallback(){
        //Called after every render of the component. This hook flows from child to parent.
        console.log('Child RenderedCallBack');
    }
    render(){
        //Call this method to update the UI. It may be called before or after connectedCallback()
        //Define business logic to decide which template (HTML file) to use. The method must return a valid HTML template
        switch(this.cardColor){
            case 'Saffron':
                return SaffronTemplate;
                break;
            case 'White':
                return WhiteTemplate;
                break;
            case 'Green':
                return GreenTemplate;
                break;
            default:
                return HelloWorldTemplate;
                break;
        }
    }
    handleTemplateChange(event){
        this.cardColor = event.target.label;
        console.log(this.cardColor);
    }
    disconnectedCallback(){
        //Called when the element is removed from a document. This hook flows from parent to child.
        // Use disconnectedCallback() to clean up work done in the connectedCallback(), like purging caches or removing event listeners.
        console.log('Child DisconnectedCallback');
    }
    errorCallback(error, stack){
        //Called when a descendant component throws an error. The error argument is a JavaScript native error object, and the stack argument is a string
        console.log('ErrorCallBack');
    }
}