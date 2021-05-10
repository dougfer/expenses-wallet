import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PropTypes from 'prop-types';
import Styles from '../styles/components/Header.module.css';

class Header extends React.Component {
  handleTotal() {
    const { despesas } = this.props;
    const convertedTotalValue = despesas.map((expenses) => {
      const currency = Number(
        expenses.exchangeRates[expenses.currency].ask,
      );
      return Number(expenses.value) * currency;
    });

    const totalValue = convertedTotalValue.reduce((acc, cur) => {
      acc += cur;
      return acc;
    }, 0);
    return totalValue.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className={Styles.header}>
        <h3 data-testid="email-field">{ email }</h3>
        <div className={Styles.moneyContent}>
          <p data-testid="total-field">{`R$${this.handleTotal()}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
