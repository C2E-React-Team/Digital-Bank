import React from 'react'

class AddCar extends React.Component{
    constructor(props)
{
    super(props);

this.state = { 
   
}
    
}

    render(){
        return(
            <div>
                <h3>Add a new car</h3>
               <form>
                   Enter Car Name :<input type="text" name="text" />
                   
               </form>
            </div>
        );
    }
}



export default AddCar;
