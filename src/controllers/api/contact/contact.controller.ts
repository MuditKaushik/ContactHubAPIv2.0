import { Router } from 'express'
import { GetContact } from '../../../api_access/contacts/get_contact.controller'
import { PostContact } from '../../../api_access/contacts/post_contact.controller'
import { PutContact } from '../../../api_access/contacts/put_contact.controller'
import { RemoveContact } from '../../../api_access/contacts/remove_contact.controller'


module Contact {
    export class ContactController {
        constructor(route: Router) {
            new GetContact.Controller(route);
            new PostContact.Controller(route);
            new PutContact.Controller(route);
            new RemoveContact.Controller(route);
        }
    }
}
module.exports = Contact.ContactController;