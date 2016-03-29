import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
  	getVotes: function(entry){
  		if(this.props.entryScore && this.props.entryScore.has(entry)){
  			return this.props.entryScore.get(entry);
  		}
  		return 0;
  	},
	render: function(){
		return <div className="scoreEntry">
			{this.getVotes(this.props.scoreEntry)}
		</div>
	}
});
