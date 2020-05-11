import axios from 'axios';
import requestIp from 'request-ip';
const logger = require('simple-node-logger').createSimpleLogger();


export default {
    getLocation: (req, res) => {
        const clientIp = requestIp.getClientIp(req);
        const url = `http://api.ipstack.com/${clientIp}?access_key=c934a4c422466d14bb4cdcd82fa49547`;
        axios.get(url)
        .then(result => { 
            res.status(200).json(result.data);
            logger.info(clientIp);
        })
        .catch(error => logger.error(error.message));
    }
}
