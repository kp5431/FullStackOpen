/***
 * This component returns 4 different views.
 * 1. No countries found
 * 2. > 10 countries found
 * 3. 1 country found (detailed view)
 * 4. [2 -> 10] countries found (bulleted view with expand buttons)
 ***/
import ComplexBullet from "./ComplexBullet"
import CountryView from "./CountryView"
const BottomOfPage = ({countries, searchStr, buttonHandler, detailedCountries}) => {

    if (searchStr.length && countries.length){ //ensure there's a search string and country data
        const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchStr.toLowerCase()))
        if(countriesToShow.length < 11 && countriesToShow.length > 1){ //view 4
            return (
                <div>
                    <ul>
                        {countriesToShow.map(country => //return countriesToShow.length - 1 ComplexBullets
                           <ComplexBullet key={country.name} singleCountry={country} handler={buttonHandler} 
                             detailedCountries={detailedCountries}/>
                        )}
                    </ul>
                </div>
            )
        }
        else if(countriesToShow.length > 10){ //view 2
            return (
                <div>
                    <p>Too many matches, specify a more specific filter</p>
                </div>
            )
        }
        else if(countriesToShow.length === 1) { //view 3
            const singleCountry = countriesToShow[0]
            return (
                <CountryView country={singleCountry} /> //this is the detailed view of the country
            )
        }
    }
    return ( //view 1
        <div>
            <p>No countries found with this search criteria.</p>
        </div>
    )
}
export default BottomOfPage  