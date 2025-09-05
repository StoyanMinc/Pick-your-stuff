import { Item, List } from './types';

export const listItems: Item[] = [
   { _id: '1', title: 'Buy groceries', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '2', title: 'Finish React Native project', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '3', title: 'Call mom', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '4', title: 'Read a book', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '5', title: 'Clean the kitchen', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '6', title: 'Do laundry', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '7', title: 'Pay electricity bill', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '8', title: 'Plan weekend trip', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '9', title: 'Take out trash', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '10', title: 'Exercise 30 minutes', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '11', title: 'Meditate in the morning', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '12', title: 'Cook dinner', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '13', title: 'Water plants', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '14', title: 'Walk the dog', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '15', title: 'Organize desk', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '16', title: 'Sort clothes', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '17', title: 'Call a friend', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '18', title: 'Journal for 10 minutes', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '19', title: 'Plan monthly budget', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '20', title: 'Schedule doctor appointment', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '21', title: 'Review goals', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '22', title: 'Meal prep for week', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '23', title: 'Update calendar', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '24', title: 'Practice guitar', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '25', title: 'Try new recipe', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '26', title: 'Read tech blog', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '27', title: 'Organize bookshelf', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '28', title: 'Listen to podcast', isCheked: false, listId: 'list-1', ownerId: 'user-1' },
  { _id: '29', title: 'Declutter closet', isCheked: true, listId: 'list-1', ownerId: 'user-1' },
  { _id: '30', title: 'Plan family dinner', isCheked: false, listId: 'list-1', ownerId: 'user-1' },

    { _id: '9', title: 'Reply to emails', isCheked: false, listId: 'list-2', ownerId: 'user-1' },
    { _id: '10', title: 'Prepare presentation', isCheked: true, listId: 'list-2', ownerId: 'user-3' },
    { _id: '11', title: 'Fix production bug', isCheked: false, listId: 'list-2', ownerId: 'user-2' },
    { _id: '12', title: 'Code review PR #42', isCheked: true, listId: 'list-2', ownerId: 'user-1' },
    { _id: '13', title: 'Write meeting notes', isCheked: false, listId: 'list-2', ownerId: 'user-2' },
    { _id: '14', title: 'Update documentation', isCheked: false, listId: 'list-2', ownerId: 'user-1' },
    { _id: '15', title: 'Deploy new version', isCheked: true, listId: 'list-2', ownerId: 'user-3' },
    { _id: '16', title: 'Team sync-up call', isCheked: false, listId: 'list-2', ownerId: 'user-2' },

    { _id: '17', title: 'Buy milk', isCheked: false, listId: 'list-3', ownerId: 'user-1' },
    { _id: '18', title: 'Get bread', isCheked: false, listId: 'list-3', ownerId: 'user-2' },
    { _id: '19', title: 'Pick up vegetables', isCheked: true, listId: 'list-3', ownerId: 'user-3' },
    { _id: '20', title: 'Grab some fruits', isCheked: false, listId: 'list-3', ownerId: 'user-1' },
    { _id: '21', title: 'Purchase coffee beans', isCheked: true, listId: 'list-3', ownerId: 'user-2' },
    { _id: '22', title: 'Refill shampoo', isCheked: false, listId: 'list-3', ownerId: 'user-3' },
    { _id: '23', title: 'Stock up rice', isCheked: false, listId: 'list-3', ownerId: 'user-1' },
    { _id: '24', title: 'Get pasta sauce', isCheked: true, listId: 'list-3', ownerId: 'user-2' },

    { _id: '25', title: 'Finish novel', isCheked: false, listId: 'list-4', ownerId: 'user-1' },
    { _id: '26', title: 'Read React docs', isCheked: true, listId: 'list-4', ownerId: 'user-3' },
    { _id: '27', title: 'Study TypeScript', isCheked: false, listId: 'list-4', ownerId: 'user-2' },
    { _id: '28', title: 'Watch tutorial', isCheked: false, listId: 'list-4', ownerId: 'user-1' },
    { _id: '29', title: 'Practice coding', isCheked: true, listId: 'list-4', ownerId: 'user-2' },
    { _id: '30', title: 'Learn new algorithm', isCheked: false, listId: 'list-4', ownerId: 'user-3' },
    { _id: '31', title: 'Review notes', isCheked: true, listId: 'list-4', ownerId: 'user-1' },
    { _id: '32', title: 'Write summary', isCheked: false, listId: 'list-4', ownerId: 'user-2' },
    { _id: '33', title: 'Meditate 10 minutes', isCheked: true, listId: 'list-4', ownerId: 'user-1' },
    { _id: '34', title: 'Evening walk', isCheked: false, listId: 'list-4', ownerId: 'user-2' },
    { _id: '35', title: 'Plan next week goals', isCheked: false, listId: 'list-4', ownerId: 'user-3' },
    { _id: '36', title: 'Organize bookshelf', isCheked: true, listId: 'list-4', ownerId: 'user-2' },
];


export const lists: List[] = [
    {
        _id: 'list-1',
        title: 'Personal',
        ownerId: '1'
    },
    {
        _id: 'list-2',
        title: 'Work',
        ownerId: '1'

    },
    {
        _id: 'list-3',
        title: 'Shopping',
        ownerId: '1'

    },
    {
        _id: 'list-4',
        title: 'Reading',
        ownerId: '1'
    },
];