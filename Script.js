 document.getElementById('hamburger').addEventListener('click', function() {
    const menuOptions = document.getElementById('menuOptions');
    menuOptions.classList.toggle('hidden');
});

let contacts = [];
let contactIdCounter = 0;
function renderContacts() {
    const contactListElement = document.getElementById('contact-list');
    contactListElement.innerHTML = '';

    const familyCount = document.getElementById('familyCount');
    const friendsCount = document.getElementById('friendsCount');
    function addLabel() {
        const formContainer = document.getElementById('form-container');
        formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    }
    const groupedContacts = {
        'Famille': contacts.filter(contact => contact.type === 'Famille'),
        'Amis': contacts.filter(contact => contact.type === 'Amis')
    };

    familyCount.innerText = `(${groupedContacts['Famille'].length})`;
    friendsCount.innerText = `(${groupedContacts['Amis'].length})`;

    for (const [type, group] of Object.entries(groupedContacts)) {
        const groupTitle = document.createElement('h3');
        groupTitle.innerText = type;
        groupTitle.className = 'font-semibold text-lg mt-4';
        contactListElement.appendChild(groupTitle);

        group.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.className = 'flex justify-between mb-2';

            contactElement.innerHTML = `
                <span>${contact.title}</span>
                <span>${contact.email}</span>
                <span>${contact.phone}</span>
                <span>${contact.job}</span>
                <span>${contact.label}</span>
                <span>
                    <button onclick="editContact(${contact.id})">✏️</button>
                    <button onclick="deleteContact(${contact.id})">🗑️</button>
                </span>
            `;

            contactListElement.appendChild(contactElement);
        });
    }

    updateContactCount();
}
function updateContactCount() {
    const contactCount = contacts.length;
    const contactButton = document.querySelector('button[onclick="toggleContactForm()"]');
    contactButton.innerHTML = `Contact (${contactCount})`;
}
function handleContactFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const job = document.getElementById('job').value;
    const label = document.getElementById('label').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    contacts.push({
        id: contactIdCounter++,
        title,
        email,
        phone,
        job,
        label,
        type
    });
    renderContacts();

    document.getElementById('form').reset();
    toggleContactForm();
}
function editContact(id) {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        document.getElementById('title').value = contact.title;
        document.getElementById('email').value = contact.email;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('job').value = contact.job;
        document.getElementById('label').value = contact.label;
        document.querySelector(`input[name="type"][value="${contact.type}"]`).checked = true;

        toggleContactForm();
        deleteContact(id); 
    }
}
function deleteContact(id) {
    contacts = contacts.filter(c => c.id !== id);
    renderContacts();
}
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.title.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.phone.toLowerCase().includes(searchTerm)
    );
    const contactListElement = document.getElementById('contact-list');
    contactListElement.innerHTML = '';

    filteredContacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'flex justify-between mb-2';

        contactElement.innerHTML = `
            <span>${contact.title}</span>
            <span>${contact.email}</span>
            <span>${contact.phone}</span>
            <span>${contact.job}</span>
            <span>${contact.label}</span>
            <span>
                <button onclick="editContact(${contact.id})">✏️</button>
                <button onclick="deleteContact(${contact.id})">🗑️</button>
            </span>
        `;

        contactListElement.appendChild(contactElement);
    });
});
function addLabel() {
    prompt(" ajouter un libellé.");
}
function toggleContactForm() {
    const form = document.getElementById('contactForm');
    form.classList.toggle('hidden');
}

/*const btn =document.getElementById("bouton");
const li =document.getElementById("liste");
const texte =document.getElementById("texte");
function addTask(ajouter){
    const taskli=document.createElement("li");
    taskli.className="task";
    taskli.innerHTML="tasktext";
    taskli.appendChild("taskli");
}
btn.addEventListener("click",function(){
    const texte=texte.value;
    if(texte.trim()!== "")
    addTask(texte)
})
*/

