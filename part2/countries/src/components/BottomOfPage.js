import SimpleBullet from "./SimpleBullet"
const BottomOfPage = ({countries, searchStr}) => {
    if (searchStr.length && countries.length){
        const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchStr.toLowerCase()))
        if(countriesToShow.length < 11 && countriesToShow.length > 1){ //if there are 2-10 countries, show only their name
            return (
                <div>
                    <ul>
                        {countriesToShow.map(country =>
                           <SimpleBullet key={country.name} name={country.name}/>
                        )}
                    </ul>
                </div>
            )
        }
        else if(countriesToShow.length > 10){
            return (
                <div>
                    Too many matches, specify a more specific filter
                </div>
            )
        }
        else if(countriesToShow.length === 1) {
            const country = countriesToShow[0]
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
    }
    return (
        <div>
            <p>No countries found with this search criteria.</p>
        </div>
    )
}
export default BottomOfPage  