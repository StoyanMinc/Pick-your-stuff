export interface ListItem {
    _id: string,
    title: string,
    isChecked: boolean,
    listId: string,
    ownerId: string
}

export interface List {
    _id: string,
    title: string,
    ownerId: string
}

export interface userData {
    _id: string,
    username: string,
    email: string,
    accessToken: string
    refreshToken: string
}
// navigation/types.ts
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    List: { id: string; title: string };
    Profile: undefined;
};

