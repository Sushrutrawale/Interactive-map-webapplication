import { AssistantDirectionTwoTone, DeleteTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Card } from "react-bootstrap";


export function CardComponent({profile,onDelete,onSelect}){
    return(
        <Card className="seprate-card">
            <Card.Img variant="top" src={profile.image} width="100%" height="250"/>
            <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>{profile.description}</Card.Text>
                <Button variant="contained" color="primary" onClick={()=> onSelect(profile)} className="show-map-btn">
                    <AssistantDirectionTwoTone className="show-icon"/> <span className="show-text">Show on Map</span>
                </Button>
                <Button variant="contained" color="error" onClick={()=> onDelete(profile.id)} className="delete-btn">
                    <DeleteTwoTone className="delete-icon"/> <span className="delete-text">Delete</span>
                </Button>
            </Card.Body>
        </Card>
    )
}