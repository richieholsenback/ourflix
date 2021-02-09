import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { addGroupUser, getGroups, GetOneGroup, getUsers } from "../../modules/APICalls";

export const GroupForm = () => {

    const [groupUserItem, setGroupUserItem] = useState({});
    const [userArray, setUserArray] = useState([]);
    const { groupId } = useParams()
    const history = useHistory();

    const handleInputChange = (event) => {
        const newGroupUserObj = { ...groupUserItem };
        newGroupUserObj[event.target.id] = event.target.value;
        setGroupUserItem(newGroupUserObj)
    }

    const handleAddGroupUser = (userId) => {
            const newGroupUserObj = { ...groupUserItem }
            newGroupUserObj.userId = groupId
            newGroupUserObj.GroupId = userId
            addGroupUser(newGroupUserObj)
    }

    const getAllUsers = () => {
        
        getUsers()
            .then(data => {
                let arrayWithFBID = Object.keys(data).map((key, index) => {
                    data[key].fbid = key;
                    return data[key];
                })

                //and sort with most recent date first
                arrayWithFBID.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
                setUserArray(arrayWithFBID)
            })
    }

    const [group, setGroup] = useState({})

    useEffect(() => {
        getGroups(groupId)
            .then(response => {
                const result = Object.keys(response)
                GetOneGroup(groupId)
                    .then(response => {
                        setGroup(response)
                    })
            })
    }, [])

    useEffect(() => {		
        getAllUsers()
	}, [])

    return (
        <>
        <Container >
            <Link to={`/group/details/${groupId}`}>Back</Link>
          <h2>Add friends to the {group.name}</h2>
      {
        userArray.map(user => {
          return (
            <Row>
            <Col xs={1}>
                    <Image src={user.photoURL} alt="user pic" id="user-pic" />
            </Col>
            <Col xs={4}>
                    <h2>{user.displayName}</h2>
            </Col>
            <Col>
                <Button
                    type="submit"
                    onClick={() => {
                        handleAddGroupUser(`${user.uid}`)
                    }}
                >
                    Add User
        </Button>
            </Col>
        </Row>
          )
        })
      }
    </Container>
        </>
      )
}