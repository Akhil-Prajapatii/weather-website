

const form = document.querySelector('form');
const search = document.querySelector('input');
const mesg1 = document.querySelector('#message-1');
const mesg2 = document.querySelector('#message-2');

form.addEventListener('submit',(e) => {
        e.preventDefault();
        mesg1.textContent = 'Loading...';
        mesg2.textContent = '';

        const location = search.value;
        url = `/weather?location=${location}`;

        fetch(url).
        then((res) => {
            res.json().then((data) => {
                if(data.error){
                    mesg1.textContent = data.error
                    mesg2.textContent = '';
                }else{
                    mesg1.textContent = data.temperature + `\xB0C`;
                    mesg2.textContent = data.location         
                }
            })
        })

})