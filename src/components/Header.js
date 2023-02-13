import { Route, Switch, Link } from "react-router-dom";

function Header() {
    return (
      
      <header className="header">
        <div className="header__logo" /> 
        <Switch>
          <Route path='/signin'>
            <Link to='/signup' className="header__link">Регистрация</Link>
          </Route>
        </Switch>

      </header>
    )
}

export default Header;
