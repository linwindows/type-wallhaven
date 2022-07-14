'use strict';
import $axios from "./utils/axios";
const ALL_CATEGORIES = ['general', 'anime', 'people']
const ALL_PURITY = ['sfw', 'sketchy', 'nsfw']

const formatCategory = () => {
    return ALL_CATEGORIES.map(cat => {
        return String(Number(this.customParams.category.indexOf(cat) > -1))
    }).join('')
};
const formatPurity = () =>  {
    return ALL_PURITY.map(cat => {
        return String(Number(this.customParams.purity.indexOf(cat) > -1))
    }).join('')
}

export const getData = (params) => {
    return new Promise(resolve => {
        let str = [];
        Object.keys(params).map(r => {
            str.push(r+"="+params[r])
        });
        $axios.get("search?"+str.join("&")).then(r => {
            resolve(r);
        }).catch(err => {
            resolve(err);
        })
    })

}
