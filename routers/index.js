import {data} from '../controller/get_sentence.js'

module.exports = (app) => {
    app.post ('api/data', data.getData)
}