/***
 * This component returns a detailed view of the
 * particular country it represents
 ***/
import SimpleBullet from "./SimpleBullet"
const CountryView = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(lang =>
                    <SimpleBullet key={lang.name} name={lang.name}/>
                )}
            </ul>
            <img src={country.flag} alt={'Flag of ' + country.name} width="100" height="100"/>
        </div>
      )
    }
  
export default CountryView