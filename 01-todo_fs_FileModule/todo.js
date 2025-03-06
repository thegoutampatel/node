const fs = require('fs')
const filePath = "./tasks.json"

// It First Create a file which defines on the filePath.
// It converts in .toString and than JSON and return the data.
//Sync => it is use because it says do first this than further.
const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (error) {
        return []
    }
};


//This Save the data which is pushed in that file.
const saveTask = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
    
};


const addTask = (task) =>{
    const tasks = loadTasks()
    tasks.push({task});
    saveTask(tasks)
    console.log("Task Added ", task)
};

const listTasks = () => {
    const tasks = loadTasks()
    // console.log(tasks)
    tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`))
}

const removeTask = (index) =>{
    if(isNaN(index)){
        return console.log("Invalid Index")
    } else{
        const tasks = loadTasks()
        index--;
        console.log(tasks[index], ": Removed")
        tasks.splice(index, index);
        saveTask(tasks)
    }

}

// 1. This Takes the input from user like: Node todo.js Add "Buy me a pen".
const command = process.argv[2]
const argument = process.argv[3]

// 2. Now it checks the command and run the function which defines on that command.
if(command === 'add'){
    addTask(argument)
}else if(command === 'list'){
    listTasks()
}else if(command === 'remove'){
    removeTask(parseInt(argument))
}else{
    console.log("Command not found")
}