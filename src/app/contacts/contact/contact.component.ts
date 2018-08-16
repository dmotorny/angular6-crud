import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from '../common/contact.service';

import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    constructor(
        public contactService: ContactService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        
        // Gets data from DB
        this.contactService.getData();
        
        // Resets form
        this.resetForm();
    }

    /**
     * On submit 
     *
     *@method onSubmit
     *@param contactForm { NgForm }
     *@returns void
     */
    public onSubmit(contactForm: NgForm): void {
      
        if (contactForm.value.$key == null) {
            this.contactService.insertContact(contactForm.value);
            this.toastr.success('Saved successfully', 'Contact added');
        } else {
            this.contactService.updateContact(contactForm.value);
            this.toastr.success('Saved successfully', 'Contact updated');
        }
      
        this.resetForm(contactForm);
    }
    
    /**
     * Resetting form 
     *
     *@method resetForm
     *@param contactForm { NgForm }
     *@returns void
     */
    resetForm(contactForm?: NgForm): void {
        if (contactForm != null) {
            contactForm.reset();
        }
      
        this.contactService.selectedContact = {
            $key: null,
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
        };
    }
}
