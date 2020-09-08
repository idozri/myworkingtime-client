import { createBrowserHistory, createMemoryHistory } from 'history';
export default typeof document !== 'undefined'
    ? createBrowserHistory()
    : createMemoryHistory();
