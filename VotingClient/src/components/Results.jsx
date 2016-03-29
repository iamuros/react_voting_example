import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Score from './Score';
import * as actionCreators from '../action_creators';

export const Results = React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  render: function() {
    return this.props.winner ? 
    		<Winner ref="winner" winner={this.props.winner} /> 
    		:
		    <div className="results">
			    <div className="score">
			      {this.getPair().map(entry =>
			        <div key={entry} className="entry">
			          <h1>{entry}</h1>
			          <Score scoreEntry={entry} entryScore={this.props.score} />
			        </div>
			      )}
			     </div>
			     <div className="menagment">
			     	<button ref="next"
			     			className="next"
			     			onClick={this.props.next}>
			     		Next
			     	</button>
			     </div>
		    </div>;
  }
});

function mapStateToProps(state){
	return {
		pair: state.getIn(['vote', 'pair']),
		score: state.getIn(['vote', 'score']),
		winner: state.get('winner')
	}
}

export const ResultsContainer = connect(
	mapStateToProps,
	actionCreators
)(Results);