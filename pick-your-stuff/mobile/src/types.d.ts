export interface Item {
    _id: string,
    title: string,
    isCheked: boolean,
    listId: string,
    ownerId: string
}

export interface List {
    _id: string,
    title: string,
    ownerId: string
}

