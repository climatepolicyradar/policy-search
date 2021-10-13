import { combineReducers } from 'redux';
import { Status } from '../model/status';
import { SearchResult } from '../model/searchResult';
import { Geography } from '../model/geography';
import searchResultReducer from './searchResult';
import { geographiesReducer, geographyFiltersReducer } from './geographies';
import policyPageReducer from './policyPage';
import statusReducer from './status';
import { Filters } from '../model/filters';
import { PolicyPage } from '../model/policyPage';
import { Policy } from '../model/policy';
import { policyReducer } from './policies';
import { Sector } from '../model/sector';
import { Instrument } from '../model/instrument';
import { sectorsReducer } from './sectors';
import { instrumentsReducer } from './instruments';

// interface of entire redux store
export interface StoreState {
  status: Status,
  searchResult: SearchResult;
  geographies: Geography[];
  sectors: Sector[];
  instruments: Instrument[];
  filters: Filters,
  policyPage: PolicyPage;
  policy: Policy;
}
export default combineReducers<StoreState>({
  status: statusReducer,
  searchResult: searchResultReducer,
  geographies: geographiesReducer,
  sectors: sectorsReducer,
  instruments: instrumentsReducer,
  filters: geographyFiltersReducer,
  policyPage: policyPageReducer,
  policy: policyReducer,
});