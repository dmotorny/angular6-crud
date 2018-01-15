import { Component, OnInit } from '@angular/core';
import { ContactService } from '../common/contact.service';
import { Contact } from '../common/contact.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[];
  constructor(private contactService: ContactService,
    private toastr: ToastrService) { }

  ngOnInit() {
    const x = this.contactService.getData();
    x.snapshotChanges().subscribe(item => {
      this.contactList = [];
      item.forEach(elem => {
        const y = elem.payload.toJSON();
        y['$key'] = elem.key;
        this.contactList.push(y as Contact);
      });
    });
  }

  onUpdate(cont: Contact) {
    this.contactService.selectedContact = Object.assign({}, cont);
  }

  onRemove(key: string) {
    if (confirm('Your are by removing a contact! Are you sure?') === true) {
      this.contactService.removeContact(key);
      this.toastr.warning('Removed successfully', 'Contact removed');
    }
  }

}
