import "./locationshare.css";
import LocationCityIcon from '@material-ui/icons/LocationCity';

const LocationShare = ( props ) => {
    console.log(props.lattitude, props.longitude)
    return (
        <li className={!props.theme? "locationShareItemDark" : "locationShareItem"} >
            <span className="locationShareItemSpanLeft">
                <LocationCityIcon className="locationShareItemsIcon"/>
                {props.cityName}
            </span>
            <span className="locationShareItemSpanRight">{`Lat: ${props.lattitude}, Long: ${props.longitude}}`}</span>
        </li>
    )
}

export default LocationShare;
