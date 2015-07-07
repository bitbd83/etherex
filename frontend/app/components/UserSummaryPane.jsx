var React = require("react");
var ReactIntl = require("react-intl");
var IntlMixin = ReactIntl.IntlMixin;
var FormattedNumber = ReactIntl.FormattedNumber;
var FormattedMessage = ReactIntl.FormattedMessage;

var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var MenuItem = require('react-bootstrap/lib/MenuItem');

var UserSummaryPane = React.createClass({
  mixins: [IntlMixin],

  handleChange: function(address) {
    this.props.flux.actions.user.switchAddress({
      address: address
    });
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <FormattedMessage message={this.getIntlMessage('user.summary')} />
          </h3>
        </div>
        <div className="panel-body">
          <table className="table table-condensed table-striped">
            <tbody>
              <tr>
                <td><FormattedMessage message={this.getIntlMessage('user.address')} /></td>
                <td>
                  <samp>
                    {this.props.user.user.id != "loading..." ?
                      this.props.user.user.id.substr(2) :
                      <FormattedMessage message={this.getIntlMessage('loading')} />}
                  </samp>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="btn row">
                    <FormattedMessage message={this.getIntlMessage('user.summary')} />
                  </div>
                </td>
                <td>
                  <DropdownButton ref="switchaddress"
                    onSelect={this.handleChange}
                    key={'switchaddress'}
                    title={this.props.user.user.id} pullLeft className="row">
                      {this.props.user.user.addresses ?
                        this.props.user.user.addresses.map(function(address) {
                          return <MenuItem key={address} eventKey={address}>{address}</MenuItem>;
                        }.bind(this)) :
                      ""}
                  </DropdownButton>
                </td>
              </tr>
              <tr>
                <td><FormattedMessage message={this.getIntlMessage('balance')} /></td>
                <td>
                  { this.props.user.user.balanceFormatted }<br />
                  { this.props.user.user.balance &&
                      this.formatMessage(
                        this.getIntlMessage('user.balance'), {
                          currency: "wei",
                          balance: this.props.user.user.balance_raw,
                          pending: this.props.user.user.balance_pending
                        })
                  }
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage
                    message={this.getIntlMessage('user.sub')}
                    currency={this.props.market.name} />
                </td>
                <td>
                  { this.formatMessage(
                      this.getIntlMessage('user.balance'), {
                        currency: this.props.market.name,
                        balance: this.props.user.user.balance_sub,
                        pending: this.props.user.user.balance_sub_pending
                      })
                  }
                </td>
              </tr>
              <tr>
                <td><FormattedMessage message={this.getIntlMessage('trades')} /></td>
                <td>
                  { this.props.trades ?
                    <FormattedNumber value={(this.props.trades.tradeBuys.length + this.props.trades.tradeSells.length)} /> :
                      0
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = UserSummaryPane;
