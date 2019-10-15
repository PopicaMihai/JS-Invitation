//Am creat o "aplicatie" care creeaza o agenda sub forma de o lista.

// Programul poate indeplini urm. cerinte:
// 1.Adauga o persoana la apasare unui buton Submit.
// 2.Stergerea lor prin apasarea butonului Remove.
// 3.Confirmarea prezentei printr-un checkbox, care la apasare va lua un style css 
// 4.Editarea numelui daca am introdus numele gresit, si dupa aceea salvarea noi denumiri.
// 5.Crearea unui label cu un checkbox care imi afiseaza persoanele care au confirmat 

console.log("Hello world");

const form = document.getElementById('register');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

function createList(text){
    
    const li = document.createElement('li');   
    const span = document.createElement('span');
    span.textContent = text;  
    li.appendChild(span);

    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    li.appendChild(label);

    const checkbox = document.createElement('input'); 
    checkbox.type = 'checkbox';  
    label.appendChild(checkbox);

    const edit = document.createElement('button'); 
    edit.textContent = 'Edit';  
    li.appendChild(edit);

    const remove = document.createElement('button'); 
    remove.textContent = 'Remove';  
    li.appendChild(remove);

    return li;

}  
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const text = input.value; 
    input.value = '';
    if (text === '') {
        alert('Please enter a name');
    }
    const li = createList(text);
    ul.appendChild(li);  

});

ul.addEventListener('change', (e) => {
    console.log(e.target.checked);
    const checkbox = event.target; 
    const checked = checkbox.checked; 
    const listItem = checkbox.parentNode.parentNode; 

    if (checked){
        listItem.className = 'responded';
    } else {
        listItem.className = '';
    }
});

ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        if(button.textContent === 'Remove'){
            ul.removeChild(li);

        } else  if (button.textContent === 'Edit'){
            //console.log('edit');
            const span = li.firstElementChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'Save';

        } else  if (button.textContent === 'Save'){
            const input= li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.textContent = 'Edit';
        }
    }
});

filterLabel.textContent = "Hide those who refused this great honor!!!";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div,ul);

filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked) {
        for( let i = 0; i < lis.length; i++){
            let li = lis[i];
            if(li.className === 'responded'){
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        }
    } else {
        for( let i = 0; i < lis.length; i++){
            let li = lis[i];
            li.style.display = '';
        }
    }
})

