export class Project {
    constructor(name) {
      this.name = name;
    }
  
    // Add methods and functionality specific to the Project class here
  }
  let localStorageNames = [];
  window.addEventListener('DOMContentLoaded',()=>{
    loadProjectsFromStorage();

    });
    
  const inputProjectButton = document.getElementById('inputProjectButton');
  const inputProject = document.getElementById('inputProject');
  const projectsContainer = document.querySelector('.projects'); // Replace with the actual selector
  
  inputProjectButton.addEventListener('click', function() {
    let projectName = inputProject.value;
    if (projectName !== ""){
       const newProject = new Project(projectName);
      localStorageNames.push(newProject.name)
   
       saveProjects();
       createProjectButton(newProject.name)

    }
    else{
    alert('Projects name cannot be empty')
    }
  });
  function saveProjects() {
    localStorage.setItem('projectNames', JSON.stringify(localStorageNames));
  }
function createProjectButton(projectName){
    const newProject = new Project(projectName);

    const newButton = document.createElement('button');
    newButton.className="projectButtons"
    newButton.textContent = newProject.name
    projectsContainer.appendChild(newButton)
}

  

 function loadProjectsFromStorage(){
    const savedProjects = JSON.parse(localStorage.getItem('projectNames')) || [];
    localStorageNames = savedProjects; // Populate the localStorageNames array

    savedProjects.forEach(projectName => {
        createProjectButton(projectName)
    });
}
  