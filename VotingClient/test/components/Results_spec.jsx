import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', ()=>{

	it('renders entries with vote counts or 0', ()=>{
		const pair = List.of('Trainspotting', '28 Days Later');
		const score = Map({'Trainspotting': 5});
		const component = renderIntoDocument(
			<Results pair={pair} score={score} />
		);

		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [train, days] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(train).to.contain('Trainspotting');
		expect(train).to.contain('5');
		expect(days).to.contain('28 Days Later');
		expect(days).to.contain('0');
	});

	it('invokes next callback when button clicked', ()=>{
		let nextInvoked = false;
		const next = () => nextInvoked = true;

		const pair = List.of('Trainspotting', '28 Days Later');
		const component = renderIntoDocument(
			<Results pair={pair} score={Map()} next={next} />
		);		

		Simulate.click(ReactDOM.findDOMNode(component.refs.next));

		expect(nextInvoked).to.equal(true);

	});

	it('renders winner if there is one', ()=> {
		const pair = List.of('Trainspotting', '28 Days Later');
		const component = renderIntoDocument(
			<Results winner='Trainspotting' pair={pair} score={Map()}/>
		);		

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});
});