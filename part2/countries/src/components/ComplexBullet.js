/***
 * This component returns 2 different views depending 
 * on if the country name is in the detailedCountries 
 * state.
 * 1. Detailed country view (country name is in detailedCountries)
 * 2. simple button with country name (country name is not in detailedCountries)
 * Both views contain a button to swap back and forth between views
 ***/
import CountryView from "./CountryView"
const ComplexBullet = ({singleCountry, handler, detailedCountries}) => { //the handler here is showButtonHandler() in App.js
    if (detailedCountries.includes(singleCountry.name)){ //view 1
        return(
            <div>
                <li>
                    <button onClick={handler} country={singleCountry.name}>hide details for {singleCountry.name}</button>
                    <CountryView country={singleCountry}/>
                </li>
            </div>
        )
    }
    return ( //view 2
        <div>
            <li>
                <button onClick={handler} country={singleCountry.name}>show details for {singleCountry.name}</button>
            </li>
        </div>
      )
    }
export default ComplexBullet