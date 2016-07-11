import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import { Link } from 'react-router';
import { Button } from 'components/ui';
import './Info.scss';

class Info extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="info">
        <h1>Witaj w <strong>Szydełku</strong>.</h1>

        <div>
          Aplikacja pozwala na tworzenie schematów szydełkowania techniką siatkową.

          <ul>
            <li>
              możesz <strong>tworzyć</strong>, <strong>edytować</strong> i <strong>przeglądać</strong> swoje projekty
            </li>
            <li>
              wszystkie Twoje zmiany są zapisywane <strong>automatycznie</strong> i <strong>natychmiast</strong>
            </li>
            <li>
              w razie pomyłki możesz skorzystać z narzędzi <strong>Gumka</strong> i <strong>Cofnij</strong>
            </li>
            <li>
              aplikacja pamięta <strong>30</strong> Twoich ostatnich zmian
            </li>
            <li>
              możesz przekształcić swój projekt korzystając z narzędzi&nbsp;
              <strong>Odbicie lustrzane pion</strong> i <strong>Odbicie lustrzane poziom</strong>
            </li>
            <li>
              możesz powiększyć kanwę swojego projektu korzystając z narzędzi&nbsp;
              <strong>Dodaj wiersz</strong> i <strong>Dodaj kolumnę</strong>
            </li>
            <li>
              Twoje projekty są przechowywane na <strong>Twoim komputerze</strong>,&nbsp;
              w Twojej przeglądarce internetowej
            </li>
            <li>
              możesz zapisać swój projekt jako obrazek w formacie <strong>PNG</strong> (do druku)
            </li>
            <li>
              możesz <strong>eksportować</strong> swój projekt do pliku,&nbsp;
              aby <strong>importować</strong> go na innym komputerze
            </li>
            <li>
              <strong>uwaga</strong>: szybkość działania aplikacji jest&nbsp;
              odwrotnie proporcjonalna do rozmiaru kanwy Twojego projektu
            </li>
          </ul>
        </div>

        <div className="cheers">
          Miłej zabawy!
        </div>

        <div className="author">
          © 2016 Kamil Mielnik
        </div>

        <div className="button-container">
          <Link to="/edycja">
            <Button>
              Przejdź do Twoich projektów
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default bindActionsAndConnect(Info, () => ({}));
