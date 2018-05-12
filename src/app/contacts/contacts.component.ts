import { Component, OnInit } from '@angular/core';

import { ContactService } from './common/contact.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    providers: [ContactService]
})
export class ContactsComponent implements OnInit {

    constructor(private contactService: ContactService) { }

    ngOnInit() {
    }
}
