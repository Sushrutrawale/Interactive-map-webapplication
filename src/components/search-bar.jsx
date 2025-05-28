import { SearchTwoTone } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export function SearchBar({searchQuery,setSearchQuery}){
    return(
        <form className="mb-4">
            <TextField className='form-control' type="text" placeholder="Search profiles by name..." 
            value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} 
            slotProps={{
                input:{
                    startAdornment:(
                        <InputAdornment position="start">
                            <SearchTwoTone/>
                        </InputAdornment>
                    )
                }
            }}
            />
        </form>
    )
}