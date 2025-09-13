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
    Home: undefined;
    "Your Lists": undefined;
    "Shared Lists": undefined;
    List: { id: string };
    'Shared List': { id: string };
    AcceptList: { token: string };
    DeclineList: { token: string };
    Profile: undefined;
    Login: undefined;
    Register: undefined;
};

