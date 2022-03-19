import { useParams } from "react-router-dom"
import PostPageView from "./PostPageView"
import postData from './mock-data'

const SearchPage = () => {
    const [searchTerm, setSeachTerm] = useState('')

    return (
        <div className="Search">
            <input type="text" placeholder="Seach..." onChange={event => {setSeachTerm(event.target.value);}} />
            <br></br>
            {postData.filter((val) => {
            if (searchTerm=="") {
            return val
            } else if ((val.content.toLowerCase().includes(searchTerm.toLowerCase())) || (val.author.toLowerCase().includes(searchTerm.toLowerCase()))) {
            return val
            }
        }).map((val, key)=> {
            return (<div className="content" key={key}>{" "} <p>{val.author}</p><p>{val.content}</p><br></br></div>);
          })}
        </div>
    );
}

export default SearchPage