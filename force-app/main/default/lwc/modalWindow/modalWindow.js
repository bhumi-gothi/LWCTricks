import { LightningElement, api, track } from 'lwc';
// import { importCommonStyles } from 'c/shared';

const validModalSizes = ['small', 'medium', 'large'];

export default class ModalWindow extends LightningElement {

    @api modalsize;
    @api modaltitle;
    @api modalsubtitle;
    @api contentoverflow;
    @api contentcontainer;

    @track modalOpen = false;

    @track showModalFooter = true;

    get sectionClass() {
        const baseClass = 'slds-modal modal-section-close';
        let result = [baseClass];
        const openModalClass = 'slds-fade-in-open';
        if (this.modalOpen) {
            result.push(openModalClass);
        }
        if (validModalSizes.includes(this.modalsize)) {
            const modalSizeClass = `slds-modal_${this.modalsize}`;
            result.push(modalSizeClass);
        }
        if (this.contentoverflow) {
            result.push('show-overflow');
        }
        return result.join(' ');
    }

    get backdropClass() {
        const baseClass = 'slds-backdrop';
        let result = [baseClass];
        const openClass = 'slds-backdrop_open';
        if (this.modalOpen) {
            result.push(openClass);
        }
        return result.join(' ');
    }

    get contentClass() {
        let result = [
            'slds-modal__content',
            'min-height-15',
            'slds-p-left_medium',
            'slds-p-right_medium',
            'slds-p-bottom_medium'
        ];
        if (this.contentcontainer) {
            result.push('modal-content');
        }
        return result.join(' ');
    }

    get modalSubtitleContentClass() {
        let result = this.contentClass;
        result += ' slds-p-left_medium slds-p-right_medium';
        return result;
    }

    slotExists(template) {
        return template && template.assignedNodes().length !== 0;
    }

    // connectedCallback() {
    //     importCommonStyles(this);
    // }

    renderedCallback() {
        const footer = this.template.querySelector("slot[name='footer']");
        this.showMoadlFooter = this.slotExists(footer);
    }

    @api open() {
        this.modalOpen = true;
        this.statuschangeevent();
    }

    @api close() {
        this.modalOpen = false;
        this.statuschangeevent();
    }

    statuschangeevent() {
        this.dispatchEvent(
            new CustomEvent('statuschange', {
                detail: { modalOpen: this.modalOpen },
            })
        );
    }

    handleModalClick(event) {
        if (event.target.classList.contains('modal-section-close')) {
            this.close();
        }
    }
}
