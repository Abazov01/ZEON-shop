import axios from "axios"
import { about } from "../redux/reducers/aboutReducer"
import { collect } from "../redux/reducers/collectionsReducer"
import { footer } from "../redux/reducers/footerReducer"
import { header } from "../redux/reducers/headerReducer"
import { news } from "../redux/reducers/newsReducer"
import { questions } from "../redux/reducers/questionsReducer"
import { homeCollections } from '../redux/reducers/collectionsReducer';

const API = 'https://628b6c0d667aea3a3e2ef5f3.mockapi.io/api/'
const answer = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. Ut cras ut rhoncus fermentum pharetra a sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet laoreet a, neque, gravida urna libero iaculis lacus. Pellentesque pellentesque massa ornare sit pellentesque elit nulla. Id est tellus maecenas ornare velit. '
const newsObj = {
    title:'Lorem ipsum dolor sit amet',
    text:'Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis scelerisque congu econgu econgu econguecongu econguecon guecon guecon guecong ueconguecong uec ongue. Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque  Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis '
}
export const getAll = () => async(dispatch)=>{
    const res = await axios.get(API+'general')
    dispatch(footer(res.data[0].footer))
    dispatch(header(res.data[0].header))
    const arr = res.data[0].questions.map(e => ({...e, answer:answer}))
    dispatch(questions(arr))
    const newsArr = res.data[0].news.map(e=>({...e, title:newsObj.title, text: newsObj.text}))
    dispatch(news(newsArr))
    dispatch(about(res.data[0].about))
}


export const collections = (page = 1, limit, boolean = false) => async(dispatch) =>{
    console.log('ge');
    const res = await axios.get(`http://localhost:5000/collections?_limit=${limit}&_page=${page}`)
    if(boolean){
        dispatch(collect({data:res.data, total: res.headers['x-total-count'], limit}))
    }else{
        dispatch(homeCollections(res.data))
    }
}


export const statuses = (status, limit = 4, page) => async(dispatch) => {
    const res = await axios.get(`http://localhost:5000/products?status=${status}&_page=${page}&_limit=${limit}`)
    dispatch({type: status, payload: res.data})
    console.log('fn')
}

