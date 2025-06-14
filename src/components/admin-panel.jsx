import { AccountCircle, DescriptionTwoTone, ImageTwoTone, PersonAddTwoTone } from "@mui/icons-material";
import { Alert, Button, Slide, Snackbar } from "@mui/material";
import { useState } from "react"
import { Form, InputGroup } from "react-bootstrap";

function SlideSnackbar(props){
    return <Slide {...props} direction="left"/>
}

export function AdminPanel({onAddProfile}){
    const [alert,SetAlert] = useState({open:false, message:'', severity:'info'});
    const [formData,setFormData] = useState({
        name:'',
        description:'',
        image:'',
        lat:'',
        lng:''
    });

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        setTimeout(()=>{
            const newProfile = {
            id: Date.now(),
            name: formData.name,
            description: formData.description,
            image: formData.image,
            position:{
                lat: parseFloat(formData.lat),
                lng: parseFloat(formData.lng)
            }
        };
        onAddProfile(newProfile);
        setFormData({name:'',description:'',image:'',lat:'',lng:''});
        },1000);
        SetAlert({open:true, message:'Profile added successfuly...', severity:'success'});
    }

    return(
        <div className="mb-4">
            <h4><PersonAddTwoTone/> Add New Profile</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-2">
                    <InputGroup>
                        <InputGroup.Text><AccountCircle/></InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formDescription" className="mb-2">
                    <InputGroup>
                        <InputGroup.Text><DescriptionTwoTone/></InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formImage" className="mb-2">
                    <InputGroup>
                        <InputGroup.Text><ImageTwoTone/></InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formLat" className="mb-2">
                    <InputGroup>
                        <InputGroup.Text><span className="bi bi-globe"></span></InputGroup.Text>
                        <Form.Control
                            type="number"
                            name="lat"
                            placeholder="Latitude"
                            value={formData.lat}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formLng" className="mb-2">
                    <InputGroup>
                        <InputGroup.Text><span className="bi bi-globe2"></span></InputGroup.Text>
                            <Form.Control
                            type="number"
                            name="lng"
                            placeholder="Longitude"
                            value={formData.lng}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Button variant="contained" color="success" type="submit" className="rounded rounded-4">
                    Add Profile
                </Button>
            </Form>
            <Snackbar open={alert.open} autoHideDuration={1000} onClose={()=>SetAlert({...alert, open:false})}
                anchorOrigin={{vertical:'top',horizontal:'right'}} TransitionComponent={SlideSnackbar}>
                    <Alert severity={alert.severity} variant="filled" onClose={()=> SetAlert({...alert, open:false})}>
                        {alert.message}
                    </Alert>
            </Snackbar>
        </div>
    )
}