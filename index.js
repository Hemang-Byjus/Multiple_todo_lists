
  const allLists = document.querySelector(".allLists");
  const addListButton = document.querySelector(".addListButton");
  const listName = document.querySelector(".listName");
  let cnt=1;
  

addListButton.addEventListener("click", (e) => {
    e.preventDefault();
    const listValue = listName.value;
    if (!listValue) {
      alert("List name Cannot be empty");
      return;
    }

    const newlist = document.createElement("div");
    newlist.className = "list";
    newlist.id=`list`;

    const listHeading = document.createElement("h1");
    listHeading.className = "listHeading";
    listHeading.innerHTML = listName.value;

    const addTaskButton = document.createElement("button");
    addTaskButton.className = "addTaskButton";  
    addTaskButton.innerHTML = "Add Task";
    addTaskButton.id=`addTaskButton`;


    newlist.appendChild(listHeading);
    newlist.appendChild(addTaskButton); 
    allLists.append(newlist);
    listName.value = "";
  
    
    addTaskButton.addEventListener("click", (event) => {
        
        const tasks=document.createElement('div');
        tasks.className='tasks';
        tasks.classList.add('bgActive')

        const modal=document.createElement('div');
        modal.className='modal';

        const modalHeading=document.createElement('h1');
        modalHeading.className='enterName';
        modalHeading.innerHTML='Please Enter name and description of your task';

        const cancelButton=document.createElement('button');
        cancelButton.className='cross';
        cancelButton.innerHTML='Cancel';

        const description=document.createElement('label');
        description.className='description';
        description.textContent='Description'

        const descriptionInput=document.createElement('input');
        descriptionInput.id='description';
        descriptionInput.placeholder='Enter the Description..';

        const addTaskLabel=document.createElement('label');
        addTaskLabel.className='addTask';
        addTaskLabel.textContent='Task';

        const addTaskInput=document.createElement('textarea');
        addTaskInput.id='addTask';
        addTaskInput.rows='7';
        addTaskInput.cols='30';
        addTaskInput.placeholder='Enter the task..'
        
        const saveButton=document.createElement('button');
        saveButton.className='save';
        saveButton.innerHTML='Save';

        modal.appendChild(modalHeading);
        modal.appendChild(cancelButton);
        modal.appendChild(description);
        modal.appendChild(descriptionInput);
        modal.appendChild(addTaskLabel);
        modal.appendChild(addTaskInput);
        modal.appendChild(addTaskInput);
        modal.appendChild(saveButton);
        tasks.appendChild(modal);
       

        document.body.appendChild(tasks);
       
        saveButton.addEventListener('click',()=>{
          // console.log('save');

            const taskDescription = document.querySelector("#description");
            const mainTask = document.querySelector("#addTask");
  
            if (!taskDescription.value) {
                alert("Description cannot be empty");
                return;
            }
            if (!mainTask.value) {
                alert("Task Cannot be empty");
                return;
            }
    
            const newTask = document.createElement("div");
            newTask.className = "newTask";
            newTask.draggable = "true";

            const newTaskHeading = document.createElement("h1");
            newTaskHeading.innerHTML = taskDescription.value;
            newTaskHeading.className = "newTaskHeading";

            const newTaskText = document.createElement("p");
            newTaskText.innerHTML = mainTask.value;
            newTaskText.className = "newTaskText";

            const deleteTaskButton = document.createElement("button");
            deleteTaskButton.innerHTML = "Delete";
            deleteTaskButton.className = "deleteTaskButton";
            

            newTask.appendChild(newTaskHeading);
            newTask.appendChild(newTaskText);
            newTask.appendChild(deleteTaskButton);
            newlist.appendChild(newTask);

            document.body.removeChild(tasks);
            taskDescription.value = "";
            mainTask.value = "";

            deleteTaskButton.addEventListener("click", () => {
              newlist.removeChild(newTask);
            });

            const draggables = document.querySelectorAll(".newTask");
            const containers = document.querySelectorAll(".list");
            const list=document.querySelector(".list");
            draggables.forEach(draggable=>{
                draggable.addEventListener('dragstart',()=>{
                  // console.log('dragstart');
                draggable.classList.add('dragging');
                });
                draggable.addEventListener('dragend',()=>{
                  // console.log('dragend');
                draggable.classList.remove('dragging');
                });
            });

          containers.forEach(container=>{
            container.addEventListener('dragover',(e)=>{
              e.preventDefault();
              const draggable=document.querySelector('.dragging');
              const afterElement=getDragAfterElement(container,e.clientY);
              if(afterElement==null)
              {
                container.appendChild(draggable);
              }
              else{
                container.insertBefore(draggable,afterElement);
              }
            });
          });

          function getDragAfterElement(container,y){
          const draggableElements=[...container.querySelectorAll('.newTask:not(.dragging)')];
          return draggableElements.reduce((closest,child)=>{
            const box=child.getBoundingClientRect();
            const offset=y-box.top-box.height/2;
            if(offset<0 && offset>closest.offset)
            {
              return {offset:offset,element:child};
            }
            else{
              return closest;
            }
          },{offset:Number.NEGATIVE_INFINITY}).element;
          }

        });
        cancelButton.addEventListener('click',()=>{
          // console.log('cancel');
          document.body.removeChild(tasks);
        })

        

    });    
});

