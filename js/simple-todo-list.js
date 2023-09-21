const todo = {
    action(e) {
        const target = e.target;
        if (target.classList.contains('todo__action')) {
            const action = target.dataset.todoAction;
            const elemItem = target.closest('.todo__item');
            if (action === 'deleted'/*  && elemItem.dataset.todoState === 'deleted' */) {
                elemItem.remove();
            } /* else {
                elemItem.dataset.todoState = action;
                const lexicon = {
                    active: 'восстановлено',
                    completed: 'завершено',
                    deleted: 'удалено'
                };
                const elTodoDate = elemItem.querySelector('.todo__date');
                const html = `<span>${lexicon[action]}: ${new Date().toLocaleString().slice(0, -3)}</span>`;
                elTodoDate.insertAdjacentHTML('beforeend', html);
            } */
            this.save();
        } else if (target.classList.contains('todo__add')) {
            this.add();
            this.save();
        }
    },
    add() {
        const elemText = document.querySelector('.todo__text');
        if (elemText.disabled || !elemText.value.length) {
            return;
        }
        document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemText.value));
        elemText.value = '';
    },
    create(text) {
        const date = JSON.stringify({ add: new Date().toLocaleString().slice(0, -3) });
        return `<li class="todo__item" data-todo-state="active">
        <span class="todo__task">
          ${text}
          <span class="todo__date" data-todo-date="${date}">
            <span>добавлено: ${new Date().toLocaleString().slice(0, -3)}</span>
          </span>
        </span>
        <span class="todo__action todo__action_restore" data-todo-action="active"></span>
        <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
        <span class="todo__action todo__action_delete" data-todo-action="deleted"></span></li>`;
    },
    init() {
        const fromStorage = localStorage.getItem('todo');
        if (fromStorage) {
            document.querySelector('.todo__items').innerHTML = fromStorage;
        }
        document.querySelector('.todo__options').addEventListener('change', this.update);
        document.addEventListener('click', this.action.bind(this));
    },
    update() {
        const option = document.querySelector('.todo__options').value;
        document.querySelector('.todo__items').dataset.todoOption = option;
        document.querySelector('.todo__text').disabled = option !== 'active';
    },
    save() {
        localStorage.setItem('todo', document.querySelector('.todo__items').innerHTML);
    }

};

const highlightEvenButton = document.getElementById('highlight_even_els');
highlightEvenButton.addEventListener('click', () => {
    const evenElem = document.querySelectorAll('li:nth-child(even)');
    evenElem.forEach(elem => elem.style.backgroundColor = '#CCFFCC');
    /* todo.save(); */
})

const highlightOddButton = document.getElementById('highlight_odd_els');
highlightOddButton.addEventListener('click', () => {
    const oddElem = document.querySelectorAll('li:nth-child(odd)');
    oddElem.forEach(elem => elem.style.backgroundColor = '#CCFFFF');
    /*  todo.save(); */
})

const delLastElButton = document.getElementById('del_last_el');
delLastElButton.addEventListener('click', () => {
    const lastElem = document.querySelectorAll('li:last-child');
    lastElem.forEach(elem => elem.remove());
    todo.save();
})

const delFirstElButton = document.getElementById('del_first_el');
delFirstElButton.addEventListener('click', () => {
    const firstElem = document.querySelectorAll('li:first-child');
    firstElem.forEach(elem => elem.remove());
    todo.save();
})

todo.init();

const completeEls = document.querySelectorAll('.todo__action_complete');
completeEls.forEach(elem => elem.addEventListener('click', function (e) {
    const completeEl = e.target.parentElement;
    e.target.remove();
    completeEl.remove();
    document.querySelector('.todo__items').append(completeEl);
    todo.save();
}));


