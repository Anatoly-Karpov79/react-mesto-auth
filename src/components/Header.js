import { Route, Switch, Link } from "react-router-dom";

function Header() {
    return (
      
      <header className="header">
        <div className="header__logo" /> 
        <Switch>
          <Route path='/sign-in'>
            <Link to='sign-up' className="header__link">Регистрация</Link>
          </Route>

          <Route path='/sign-up'>
            <Link to='sign-in' className="header__link">Войти</Link>
          </Route>

        </Switch>

      </header>
    )
}

export default Header;
