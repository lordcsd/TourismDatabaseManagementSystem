import {Paper, TextField} from '@material-ui/core';

export default function Login({styles}){
    return(
        <div>
            <form>
                <Paper padding={3}>
                    <TextField placeholder='jsjknsjf' variant='filled'/>
                    <TextField placeholder='jsjknsjf' variant='filled'/>
                    <TextField placeholder='jsjknsjf' variant='filled'/>
                </Paper>
            </form>
        </div>
    )
}