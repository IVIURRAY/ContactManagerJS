window.onload = init;

let cm; // ContactManager

function init() {
    cm = new ContactManager();
    cm.addTestData();
    cm.printContactsToConsole();

    cm.displayContactAsTable("contacts");
}

function formSubmitted() {
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");

    let newContact = new Contact(name.value, email.value);
    cm.add(newContact);

    name.value = "";
    email.value = "";

    cm.displayContactAsTable("contacts");
    return false;
}

function emptyList() {
	cm.empty();
  	cm.displayContactAsTable("contacts");
}

function loadList() {
	cm.load();
  	cm.displayContactAsTable("contacts");
}


class Contact {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class ContactManager {
    constructor() {
        this.listOfContacts = [];
    }

    add(contact) {
        this.listOfContacts.push(contact);
    } 

    remove(contact) {
        for(let i = 0; i < this.listOfContacts.length; i++) {
            var c = this.listOfContacts[i];

            if (c.email === contact.email) {
                this.listOfContacts.splice(i, i);
                break;
            }
        };
    }
    
    save() {
        localStorage.contacts = JSON.stringify(this.listOfContacts);
    }

    load() {
        if (localStorage.contacts !== undefined)
            this.listOfContacts = JSON.parse(localStorage.contacts);
    }

    sort() {
        this.listOfContacts.sort(ContactManager.compareByName);
    }

    empty() {
        this.listOfContacts = [];
    }

    static compareByName(c1, c2) {
        if (c1.name < c2.name)
            return -1;
        
        if (c1.name > c2.name)
            return 1;
        
        return 0;
    }

    displayContactAsTable(containerId) {
        let container = document.querySelector('#' + containerId);
        container.innerHTML = "";

        if (this.listOfContacts.length === 0) {
            container.innerHTML = "<p>No contacts</p>";
            return;
        }

        let table = document.createElement("table");
        this.listOfContacts.forEach(function(currentContact) {
            let row = table.insertRow();
            row.innerHTML = "<td>" + currentContact.name + "</td><td>" + currentContact.email + "</td>";
        })

        container.appendChild(table);

    }

    printContactsToConsole() {
        this.listOfContacts.forEach(function(c) {
            console.log(c.name);
        })
    }

    addTestData() {
		let c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
  		let c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
  		let c3 = new Contact("Angus Young", "angus@acdc.com");
  		let c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Let's sort the list of contacts by Name
		this.sort();
	}

}

