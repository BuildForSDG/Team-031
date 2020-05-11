import axios from 'axios';
const logger = require('simple-node-logger').createSimpleLogger();


export default {
    getLocation: (req, res) => {
        const url = `http://api.ipstack.com/check?access_key=c934a4c422466d14bb4cdcd82fa49547`;
        axios.get(url)
        .then(result => { 
            res.status(200).json(result.data);
        })
        .catch(error => logger.error(error.message));
    }
}
