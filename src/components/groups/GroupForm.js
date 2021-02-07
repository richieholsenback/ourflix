import { Button } from "bootstrap";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom"
import { addGroup } from "../../modules/APICalls";

export const GroupForm = () => {

    const [groupItem, setGroupItem] = useState({});
    const history = useHistory();

    const handleInputChange = (event) => {
        const newGroupObj = { ...groupItem };
        newGroupObj[event.target.id] = event.target.value;
        setGroupItem(newGroupObj)
    }

    const handleAddGroup = () => {
        if (!groupItem.name) {
            alert("Name your group")
        } else {
            const newGroupObj = { ...groupItem }
            addGroup(newGroupObj)
                .then(response => history.push("/groups"))
        }
    }

    return (
        <>
        <Container fluid="xl">
        <Row>
          <Col className="m-2" md={6}>
            <h4>New Group</h4>
            <Form onChange={handleInputChange}>
              <Form.Group controlId="name" className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control type="text" placeholder="Name your group..."/>
            </Form.Group>
              <Button onClick={handleAddGroup}>Add To List</Button>
            </Form>
          </Col>
          </Row>
          </Container>
        </>
      )
}