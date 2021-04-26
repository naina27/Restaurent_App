import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Modal,Form, Button,Table } from "react-bootstrap";
import "./Cform";

const Menulist=()=>{
  const [posts,setPosts]=useState([])
  const [show,setShow]=useState(false)
  const [fieldname,setFieldName]=useState("")
  const [dishname,setDishName]=useState("")
  
  useEffect(() => {
    getPosts()
      }, [fieldname,dishname]);  

  const getPosts=() =>{
    axios.get(`http://localhost:1000/menulist`)
      .then(res => {
        const posts = res.data;
        setPosts(posts)
      })
  }
  
  const deleteRow=(_id, e)=>{
    axios.delete(`http://localhost:1000/delete/${_id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
  
        const posts = posts.filter(item => item._id !== _id);
        
      })
  
  }

  const handleClose = () => setShow(false);

  const edit=(_id,e)=>{
    setShow(true);
  axios.get(`http://localhost:1000/edit/${_id}`)
  .then(res=>{
  const posts=res.data;
  console.log(posts)
  setFieldName(posts[0].fieldname)
  setDishName(posts[0].dishname)
  
  })
  }
  
  
 
  const update=(_id,e)=>{
 setShow(false);
    e.preventDefault()
    const payload={
       dishname:dishname,
        fieldname:fieldname,
       
    }
   console.log('Payload data',payload);
   const res= axios.put(`http://localhost:1000/update/${_id}`,payload)
   .then((res)=> 
   {console.log(res)},
   (error)=>{
       console.log(error);
   }
   );
}  
   

    return (
      <div>
        <h1>Restaurent Menulist</h1>

        
  <div class="maindiv">

  <Table striped bordered hover size="sm">
  <thead>
    <tr>
    <th>ID</th>
                  <th>Fieldname</th>
                  <th>Dishname</th>
                  <th>Images</th>
                  <th>Delete</th>
                  <th>Edit</th>
    </tr>
  </thead>
  <tbody>
  {posts && posts.map((post) => (
                <tr>
                  <td>{post._id}</td>
                  <td>{post.fieldname}</td>
                  <td>{post.dishname}</td>
                  <td>{post.images}</td>
                  <td>
                    <button  onClick={(e) => deleteRow(post._id, e)} >Delete</button>
                  </td>
                    <td>
                    <Button  onClick={(e) =>edit(post._id, e)} >Edit</Button>
                   

                    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Field Name</Form.Label>
    <Form.Control type="text" name="fieldname"  value={fieldname} onChange={(e)=>setFieldName(e.target.value)} placeholder="Enter field"  />
    <Form.Text className="text-muted">
     
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Dish Name</Form.Label>
    <Form.Control type="text" name="dishname"  onChange={(e)=>setDishName(e.target.value)} value={dishname}placeholder="enter dish" />
  </Form.Group>
 
  
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => update(post._id, e)} >Update</Button>
        </Modal.Footer>
      </Modal>    
                  </td>

                </tr>
              ))}
  </tbody>
</Table>
  
        {/* <table>
            <thead>
              <tr>
                  <th>ID</th>
                  <th>Fieldname</th>
                  <th>Dishname</th>
                  <th>Images</th>
                  <th>Delete</th>
                  <th>Edit</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.posts.map((post) => (
                <tr>
                  <td>{post._id}</td>
                  <td>{post.fieldname}</td>
                  <td>{post.dishname}</td>
                  <td>{post.images}</td>
                  <td>
                    <button  onClick={(e) => this.deleteRow(post._id, e)} >Delete</button>
                  </td>
                    <td>
                    <button  onClick={(e) => this.edit(post._id, e)} >Edit</button>
                    <Modal
        show={this.handleShow}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>    
                  </td>

                </tr>
              ))}
            </tbody>
  
        </table> */}
        </div>

        </div>
        
         )

}
export default Menulist