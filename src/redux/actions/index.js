import axios from "axios"
import { about } from "../reducers/aboutReducer"
import { footer } from "../reducers/footerReducer"
import { header } from "../reducers/headerReducer"
import { news } from "../reducers/newsReducer"
import { questions } from "../reducers/questionsReducer"

const API = 'https://628b6c0d667aea3a3e2ef5f3.mockapi.io/api/'
const answer = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. Ut cras ut rhoncus fermentum pharetra a sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. '
const newsObj = {
    title:'Lorem ipsum dolor sit amet',
    text:'Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis scelerisque congu econgu econgu econguecongu econguecon guecon guecon guecong ueconguecong uec ongue. Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque  Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis '
}
export const getAll = ()=> {
    return async(dispatch)=>{
    const res = await axios.get(API+'general')
    dispatch(footer(res.data[0].footer))
    dispatch(header(res.data[0].header))
    const arr = res.data[0].questions.map(e => ({...e, answer:answer}))
    dispatch(questions(arr))
    const newsArr = res.data[0].news.map(e=>({...e, title:newsObj.title, text: newsObj.text}))
    dispatch(news(newsArr))
    dispatch(about(res.data[0].about))
    console.log(res.data[0])
}}

