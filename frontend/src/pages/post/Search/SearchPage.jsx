import { useParams } from "react-router-dom"
import postData from '../mock-data'
import { useState } from 'react';
import TextField from '@mui/material/InputBase';

const SearchPage = () => {
    const [searchTerm, setSeachTerm] = useState('')

    return (
        <div className="Search">
            <TextField id="standard-basic" label="Standard" variant="standard" size="normal" placeholder="Seach..." onChange={event => {setSeachTerm(event.target.value);}} />
            <br></br>
            {postData.filter((val) => {
            if (searchTerm=="") {
            return val
            } else if ((val.content.toLowerCase().includes(searchTerm.toLowerCase())) || (val.author.toLowerCase().includes(searchTerm.toLowerCase()))) {
            return val
            }
        }).map((val, key)=> {
            return (<div className="content" key={key}>{" "} <p><Post key={key} data={val}/></p><br></br></div>);
          })}
        </div>
    );
}

export default SearchPage