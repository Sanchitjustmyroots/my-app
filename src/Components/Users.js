import { Typography ,Grid  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import axios from 'axios';



const Users = () => {
 const[user,setUser] =useState([]);

 const onSubmit =()=>{
    axios.put(`http://43.205.31.129:4040/api/admin/user/update`,{


    })

 } 



    useEffect(()=>{ 
     axios.get(`http://43.205.31.129:4040/api/customer?perPage=50&pageNo=1&phoneNumber=91&firstName=&lastName=&email=`).then(result=>{
     console.log(result.data.data.users)  
     setUser(result.data.data.users)

     })

    },[])
  return (
    <>
        <p>It is a user page module </p> 

        {
        user.map((data,index)=>{
          return (<Card sx={{ minWidth: 275 }}> <CardContent><Typography  sx={{ fontSize: 18}} color="text.secondary" key={index}>FirstName:{data.firstName} </Typography>  
          <Typography  sx={{ fontSize: 18 }} color="text.secondary" key={index}>LastName: {data.lastName}</Typography>
          <Typography  sx={{ fontSize: 14 }} color="text.secondary" key={index}>Username: {data.userName}</Typography> 
          <Typography  sx={{ fontSize: 14 }} color="text.secondary" key={index}>PhoneNumber: {data.phoneNumber}</Typography> 
          <Typography  sx={{ fontSize: 14 }} color="text.secondary" key={index}>DateofBirth: {data.dob}</Typography> 
          <Typography  sx={{ fontSize: 14 }} color="text.secondary" key={index}>Email: {data.email}</Typography> 
          <Typography  sx={{ fontSize: 14 }} color="text.secondary" key={index}>ReferCode: {data.referCode}</Typography> 
          <Button onClick={onSubmit} size='small' variant="contained">Edit</Button>

              
          </CardContent> 
           </Card>
        
                   
          
          
          
           )

        })
        }
    
      {/* <Grid  item xs={2} >  */}

    
      
      {/* <Card  sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        {/* <Typography variant="h5" component="div">
       
        </Typography> 
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card></Grid> */}





        
    </>
  
    

    
      
      
      
      
     

  )
}

export default Users




