import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Edit extends React.Component{

constructor(props){
super(props);
this.state = {
  fieldname: '' ,
  dishname: '',
  images: '',
  redirect: false
}
this.onChangeFieldname = this.onChangeFieldname.bind(this);
this.onChangeDishname = this.onChangeDishname.bind(this);
this.onChangeImages = this.onChangeImages.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount(){
axios.get('http://localhost:1000/edit/${_id}')
.then(response => {
  this.setState({
    fieldname: response.data.fieldname,
    dishname: response.data.dishname,
    images: response.data.images
  });
})
.catch(function(error){
  console.log(error);
})
}

onChangeFieldname(e){
this.setState({
  fieldname: e.target.value
})
}
onChangeDishname(e){
this.setState({
  dishname: e.target.value
})
}
onChangeImages(e){
this.setState({
  images: e.target.value
})
}
 handleSubmit = async(e) => {
    e.preventDefault()
    const payload={
       dishname:this.dishname,
        fieldname:this.fieldname,
        images:this.images
    }
   console.log('Payload data',payload);
   const res=await axios.put('http://localhost:1000/update/:_id',payload)
   .then((res)=> 
   {console.log(res)},
   (error)=>{
       console.log(error);
   }
   );
}

render(){

return(  
  <div class="maindiv">
  <h3>Edit page</h3>
  <form onSubmit={this.onSubmit}>
    <div>
      <label>Fieldname Name</label>
      <input type="text" defaultValue={this.state.fieldname} onChange={this.onChangeFieldname}  />
    </div>
    <div>
      <label>Dishname Name</label>
      <input type="text" defaultValue={this.state.dishname} onChange={this.onChangeDishname} />
    </div>
    <div>
      <label>Images:</label>
          <input type="file" name="images" onChange={this.onChangeImages} defaultValue={this.state.images}/>
          
    </div>
    <div>
      <input type="submit" value="Update User" />
    </div>

  </form>
  </div>
)
}
}
