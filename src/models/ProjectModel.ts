export interface ProjectModel {
    _id : string
    ownerId : string 
    info : {
        name : string 
        description : string 
        tecnologies : string[]
        cost: number
        linkDev : string
        linkProd : string
        dateAdded : Date
        updateFromProjectId : string
        banner : string 
    }
    features: ProjectFeatureModel[]
    tasks: ProjectTaskModel[]
    status: string
    operators: string[]
    category: string

}


export interface  ProjectFeatureModel {
    name: string
    description: string
    dateAdded: Date
}

export interface ProjectTaskModel {
    taskId: string
    projectId: string
    name: string
    description: string
    dateAdded: Date
    dueDate: Date
    assigned: string[]
    status: string
}