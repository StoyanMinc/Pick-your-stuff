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
// export type RootStackParamList = {
//     Home: undefined;
//     "Your Lists": undefined;
//     "Shared Lists": undefined;
//     List: { id: string };
//     'Shared List': { id: string };
//     AcceptList: { token: string };
//     DeclineList: { token: string };
//     Profile: undefined;
//     Login: undefined;
//     Register: undefined;
// };
export type RootStackParamList = {
    Home: undefined;
    'Your Lists': undefined;         // Tab screen
    'Shared Lists': undefined;       // Tab screen
    // YourListsStack: undefined;       // Nested stack screen for "Your Lists"
    // SharedListsStack: undefined;     // Nested stack screen for "Shared Lists"
    List: { id: string };            // Nested screen inside YourListsStack
    SharedListItem: { id: string, title: string };  // Nested screen inside SharedListsStack
    AcceptList: { token: string };
    DeclineList: { token: string };
    Profile: undefined;
    Login: undefined;
    Register: undefined;
};

