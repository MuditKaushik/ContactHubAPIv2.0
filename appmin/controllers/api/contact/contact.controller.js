"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var get_contact_controller_1=require("../../../api_access/contacts/get_contact.controller"),post_contact_controller_1=require("../../../api_access/contacts/post_contact.controller"),put_contact_controller_1=require("../../../api_access/contacts/put_contact.controller"),remove_contact_controller_1=require("../../../api_access/contacts/remove_contact.controller"),Contact;!function(t){var o=function(){return function(t){new get_contact_controller_1.GetContact.Controller(t),new post_contact_controller_1.PostContact.Controller(t),new put_contact_controller_1.PutContact.Controller(t),new remove_contact_controller_1.RemoveContact.Controller(t)}}();t.ContactController=o}(Contact||(Contact={})),module.exports=Contact.ContactController;