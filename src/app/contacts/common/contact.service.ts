import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Contact } from './contact.model';

@Injectable()
export class ContactService {
    contactList: AngularFireList<any>;
    selectedContact: Contact = new Contact();
    constructor(private firebase: AngularFireDatabase) { }

    /**
     * Gets data
     * @method getData
     * @returns AngularFireList
     */
    public getData(): AngularFireList {
        this.contactList = this.firebase.list('contacts');
        return this.contactList;
    }

    // Inserting data into firebase db
    insertContact(contact: Contact) {
        this.contactList.push({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            email: contact.email
        });
    }

    // Updating data in firebase db
    updateContact(contact: Contact) {
        this.contactList.update(contact.$key, {
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            email: contact.email
        });
    }

    // Removing an item in firebase db
    removeContact($key: string) {
        this.contactList.remove($key);
    }

}
