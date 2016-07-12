import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import { Link } from 'react-router';
import Menu from '../Menu/Menu';
import { Button } from 'components/ui';
import './About.scss';

class About extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    const controls = (
      <div>
        <Link to="/edycja">
          <Button>
            Przejdź do Twoich projektów
          </Button>
        </Link>
      </div>
    );

    return (
      <Menu controls={controls} title="O programie">
        <div className="about">
          <h1>Witaj w <strong>Szydełku</strong>.</h1>

          <div>
            <div className="description">
              Aplikacja pozwala na tworzenie schematów szydełkowania techniką siatkową.
            </div>

            <div className="description">
              Jeżeli korzystasz z aplikacji po raz pierwszy, przeczytaj uważnie poniższy tekst.
            </div>

            <ul>
              <li>
                możesz <strong>tworzyć</strong>, <strong>edytować</strong> i <strong>przeglądać</strong> swoje projekty
              </li>
              <li>
                możesz umieszczać na kanwie każdy z <strong>10</strong> wbudowanych wzorów
              </li>
              <li>
                <strong>kliknij</strong> myszką na komórkę kanwy aby umieścić wybrany wzór
              </li>
              <li>
                <strong>kliknij</strong> na kanwie i <strong>przeciągnij</strong> myszkę aby ciągle&nbsp;
                umieszczać wybrany wzór
              </li>
              <li>
                wszystkie Twoje zmiany są zapisywane <strong>automatycznie</strong>, co <strong>5 sekund</strong>
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
                możesz powiększyć obszar kanwy swojego projektu korzystając z narzędzi&nbsp;
                <strong>Dodaj wiersz</strong> i <strong>Dodaj kolumnę</strong>
              </li>
              <li>
                wiersze i kolumny mogą zostać usunięte tylko narzędziem <strong>Cofnij</strong>
              </li>
              <li>
                możesz dowolnie zmieniać rozmiar komórek kanwy swojego projektu korzystając z narzędzia&nbsp;
                <strong>Rozmiar komórki</strong> (zmiana wpłynie również na <strong>wygląd wydruku</strong>)
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
                aby <strong>importować</strong> go na innym komputerze, albo&nbsp;
                w celu utworzenia kopii zapasowej
              </li>
              <li className="danger">
                <strong>uwaga</strong>: szybkość działania aplikacji jest&nbsp;
                odwrotnie proporcjonalna do rozmiaru kanwy Twojego projektu&nbsp;
                (<strong>dobra rada</strong>: ogranicz swoje projekty do 5-6 tysięcy komórek)
              </li>
              <li className="danger">
                <strong>uwaga</strong>: czyszczenie historii przeglądarki internetowej, tryb prywatny,&nbsp;
                resetowanie, usunięcie i reinstalacja przeglądarki internetowej, a także reinstalacja&nbsp;
                systemu operacyjnego mogą spowodować utratę wszystkich projektów&nbsp;
                (<strong>dobra rada</strong>: eksportuj swoje projekty!)
              </li>
              <li>
                zawsze możesz przeczytać powyższy tekst ponownie klikając na napis&nbsp;
                <strong>Szydełko</strong> w lewym, górnym rogu ekranu
              </li>
            </ul>
          </div>

          <div className="cheers">
            Miłej zabawy!
          </div>

          <div className="author">
            © 2016 Kamil Mielnik<br/>
            kamil.adam.mielnik@gmail.com
          </div>

          <div className="button-container">
            <Link to="/edycja">
              <Button type="secondary">
                Przejdź do Twoich projektów
              </Button>
            </Link>
          </div>
        </div>
      </Menu>
    );
  }
}

export default bindActionsAndConnect(About, () => ({}));
