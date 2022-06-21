import reducer from "./reducer";
import * as actions from "./actions";
import * as selectors from "./selectors";

const store = { actions, reducer, selectors };

export { actions, reducer, selectors };
export type { State } from "./reducer";
export default store;
