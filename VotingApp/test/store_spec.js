import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', ()=> {
	it('is a redux store with a correct reducer', ()=> {
		const store = makeStore();
		expect(store.getState()).to.equal(Map());

		store.dispatch({
			type: 'SET_ENTRIES',
			entries: ['Trainspotting', '28 Days']
		});

		expect(store.getState()).to.equal(fromJS({
			entries: ['Trainspotting', '28 Days']
		}));
	});
});