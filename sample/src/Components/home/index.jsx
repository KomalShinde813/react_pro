import { useContext } from 'react';
import AppContext from '../../App/AppContext';
let Home = props => {
    const { portalSettings } = useContext(AppContext);
    const bn = require('./' + (portalSettings.bannerImage || 'home-page-center-banner.jpg')).default;
    console.log(bn);
    return <div>
        <h1>Sparshatt Truck & Van</h1>
        <h1>eWIP</h1>
        <img src={bn} />
    </div>
}
export default Home;